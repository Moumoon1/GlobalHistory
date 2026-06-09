import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { MeshBasicMaterial } from "three";
import type { HistoricalRegion } from "../../types/history";
import { useHistoryStore } from "../../stores/useHistoryStore";

type HistoryGlobeProps = {
  regions: HistoricalRegion[];
  selectedRegion: HistoricalRegion | null;
};

type LandPolygon = {
  id: string;
  kind: "land";
  name: string;
  geometry: unknown;
  labelRank: number;
  labelPosition: {
    lat: number;
    lng: number;
  };
};

type GlobeClickCoords = {
  lat: number;
  lng: number;
};

type CountryLabel = {
  id: string;
  name: string;
  labelRank: number;
  lat: number;
  lng: number;
};

function getLabelTier(altitude: number): number {
  if (altitude > 2) return 0;
  if (altitude > 1.35) return 1;
  if (altitude > 0.9) return 2;
  return 3;
}

function getMaxVisibleLabelRank(labelTier: number): number {
  if (labelTier === 0) return 2;
  if (labelTier === 1) return 3;
  if (labelTier === 2) return 5;
  return 99;
}

function pointInRing(lng: number, lat: number, ring: number[][]): boolean {
  let inside = false;

  for (
    let index = 0, previousIndex = ring.length - 1;
    index < ring.length;
    previousIndex = index++
  ) {
    const [currentLng, currentLat] = ring[index];
    const [previousLng, previousLat] = ring[previousIndex];
    const intersects =
      currentLat > lat !== previousLat > lat &&
      lng <
        ((previousLng - currentLng) * (lat - currentLat)) /
          (previousLat - currentLat) +
          currentLng;

    if (intersects) inside = !inside;
  }

  return inside;
}

function geometryContainsPoint(geometry: unknown, lng: number, lat: number): boolean {
  const typedGeometry = geometry as {
    type?: string;
    coordinates?: number[][][] | number[][][][];
  };

  if (!typedGeometry.coordinates) return false;

  if (typedGeometry.type === "Polygon") {
    return pointInRing(lng, lat, typedGeometry.coordinates[0] as number[][]);
  }

  if (typedGeometry.type === "MultiPolygon") {
    return (typedGeometry.coordinates as number[][][][]).some((polygon) =>
      pointInRing(lng, lat, polygon[0])
    );
  }

  return false;
}

function collectPositions(geometry: unknown): number[][] {
  const typedGeometry = geometry as {
    type?: string;
    coordinates?: number[][][] | number[][][][];
  };

  if (!typedGeometry.coordinates) return [];

  if (typedGeometry.type === "Polygon") {
    return typedGeometry.coordinates[0] as number[][];
  }

  if (typedGeometry.type === "MultiPolygon") {
    return (typedGeometry.coordinates as number[][][][]).flatMap(
      (polygon) => polygon[0]
    );
  }

  return [];
}

function getApproximateLabelPosition(geometry: unknown): { lat: number; lng: number } {
  const positions = collectPositions(geometry);

  if (positions.length === 0) return { lat: 0, lng: 0 };

  const sum = positions.reduce(
    (total, [lng, lat]) => ({
      lat: total.lat + lat,
      lng: total.lng + lng
    }),
    { lat: 0, lng: 0 }
  );

  return {
    lat: sum.lat / positions.length,
    lng: sum.lng / positions.length
  };
}

export function HistoryGlobe({ regions, selectedRegion }: HistoryGlobeProps) {
  const globeRef = useRef<any>(null);
  const hoveredSelectableRegionRef = useRef<HistoricalRegion | null>(null);
  const [landPolygons, setLandPolygons] = useState<LandPolygon[]>([]);
  const [labelTier, setLabelTier] = useState(0);
  const { hoveredRegionId, setHoveredRegionId, setSelectedRegionId } =
    useHistoryStore();

  const globeMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: "#76cfe8"
      }),
    []
  );

  const regionByCountry = useMemo(() => {
    const nextMap = new Map<string, HistoricalRegion>();

    regions.forEach((region) => {
      region.countryNames?.forEach((countryName) => {
        nextMap.set(countryName, region);
      });
    });

    return nextMap;
  }, [regions]);

  const countryLabels = useMemo<CountryLabel[]>(() => {
    const maxVisibleLabelRank = getMaxVisibleLabelRank(labelTier);

    return landPolygons
      .filter(
        (land) =>
          land.name !== "Antarctica" &&
          land.labelRank <= maxVisibleLabelRank &&
          Number.isFinite(land.labelPosition.lat) &&
          Number.isFinite(land.labelPosition.lng)
      )
      .map((land) => ({
        id: land.id,
        name: land.name,
        labelRank: land.labelRank,
        lat: land.labelPosition.lat,
        lng: land.labelPosition.lng
      }));
  }, [labelTier, landPolygons]);

  const findRegionAtCoordinate = (lng: number, lat: number) => {
    const land = landPolygons.find((polygon) =>
      geometryContainsPoint(polygon.geometry, lng, lat)
    );

    return land ? regionByCountry.get(land.name) ?? null : null;
  };

  useEffect(() => {
    fetch("/data/ne_110m_admin_0_countries.geojson")
      .then((response) => response.json())
      .then((collection) => {
        const features = Array.isArray(collection.features)
          ? collection.features
          : [];

        setLandPolygons(
          features.map(
            (
              feature: {
                geometry: unknown;
                properties?: {
                  ADMIN?: string;
                  LABELRANK?: number;
                  NAME?: string;
                };
              },
              index: number
            ) => ({
              id: `land-${index}`,
              kind: "land" as const,
              name: feature.properties?.ADMIN ?? feature.properties?.NAME ?? "",
              geometry: feature.geometry,
              labelRank: feature.properties?.LABELRANK ?? 99,
              labelPosition: getApproximateLabelPosition(feature.geometry)
            })
          )
        );
      })
      .catch(() => setLandPolygons([]));
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;
    globe.controls().enableDamping = true;
    globe.pointOfView({ lat: 25, lng: 40, altitude: 2.25 }, 0);
  }, []);

  useEffect(() => {
    if (!selectedRegion || !globeRef.current) return;

    globeRef.current.pointOfView(
      {
        lat: selectedRegion.labelPosition.lat,
        lng: selectedRegion.labelPosition.lng,
        altitude: 1.65
      },
      900
    );
  }, [selectedRegion]);

  useEffect(() => {
    const selectHoveredRegion = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName !== "CANVAS") return;

      if (hoveredSelectableRegionRef.current) {
        setSelectedRegionId(hoveredSelectableRegionRef.current.id);
      }
    };

    window.addEventListener("click", selectHoveredRegion, true);
    return () => window.removeEventListener("click", selectHoveredRegion, true);
  }, [setSelectedRegionId]);

  return (
    <Globe
      ref={globeRef}
      width={window.innerWidth - 660}
      height={window.innerHeight}
      backgroundColor="rgba(185, 231, 244, 1)"
      globeMaterial={globeMaterial}
      showAtmosphere={false}
      polygonsData={landPolygons}
      polygonGeoJsonGeometry={(polygon: object) =>
        (polygon as LandPolygon).geometry as any
      }
      polygonCapColor={(polygon: object) => {
        const land = polygon as LandPolygon;
        const region = regionByCountry.get(land.name);
        if (!region) return "rgba(216, 230, 166, 0.82)";
        if (selectedRegion?.id === region.id) return region.color;
        if (hoveredRegionId === region.id) return `${region.color}dd`;
        return `${region.color}b8`;
      }}
      polygonSideColor={(polygon: object) => {
        const land = polygon as LandPolygon;
        const region = regionByCountry.get(land.name);
        return region ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0)";
      }}
      polygonStrokeColor={(polygon: object) => {
        const land = polygon as LandPolygon;
        const region = regionByCountry.get(land.name);
        return region ? "rgba(61, 50, 38, 0.62)" : "rgba(98, 126, 90, 0.35)";
      }}
      polygonAltitude={(polygon: object) => {
        const land = polygon as LandPolygon;
        const region = regionByCountry.get(land.name);
        if (!region) return 0.004;
        if (selectedRegion?.id === region.id) return 0.008;
        if (hoveredRegionId === region.id) return 0.006;
        return 0.005;
      }}
      polygonLabel={(polygon: object) => {
        const land = polygon as LandPolygon;
        const region = regionByCountry.get(land.name);
        if (!region) return "";
        return `<div style="background: rgba(255,255,255,.92); border: 1px solid rgba(70,59,43,.25); border-radius: 8px; padding: 8px 10px; color: #1f2933; font-weight: 700;">${region.name}<div style="font-size: 11px; font-weight: 500; color: #6d604d;">${land.name}</div></div>`;
      }}
      onPolygonHover={(polygon: object | null) => {
        const land = polygon as LandPolygon | null;
        const region = land ? regionByCountry.get(land.name) ?? null : null;
        hoveredSelectableRegionRef.current = region;
        setHoveredRegionId(region?.id ?? null);
      }}
      onPolygonClick={(polygon: object) => {
        const land = polygon as LandPolygon;
        const region = regionByCountry.get(land.name);
        if (region) setSelectedRegionId(region.id);
      }}
      onGlobeClick={(coords: object) => {
        const typedCoords = coords as GlobeClickCoords;
        const region = findRegionAtCoordinate(typedCoords.lng, typedCoords.lat);
        if (region) setSelectedRegionId(region.id);
      }}
      onZoom={(pointOfView: object) => {
        const altitude = (pointOfView as { altitude?: number }).altitude ?? 2.25;
        const nextLabelTier = getLabelTier(altitude);

        setLabelTier((currentLabelTier) =>
          currentLabelTier === nextLabelTier ? currentLabelTier : nextLabelTier
        );
      }}
      labelsData={countryLabels}
      labelLat={(label: object) => (label as CountryLabel).lat}
      labelLng={(label: object) => (label as CountryLabel).lng}
      labelText={(label: object) => (label as CountryLabel).name}
      labelColor={() => "rgba(31, 41, 51, 0.82)"}
      labelAltitude={0.012}
      labelSize={(label: object) => {
        const rank = (label as CountryLabel).labelRank;
        if (rank <= 2) return 0.9;
        if (rank <= 4) return 0.72;
        return 0.58;
      }}
      labelDotRadius={0}
      labelResolution={2}
    />
  );
}
