import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { MeshBasicMaterial } from "three";
import type { HistoricalRegion } from "../../types/history";
import { getCountryDisplayName, getMapCountryName } from "../../data/mapCountries";
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

type MapHtmlLabel = CountryLabel & {
  variant: "country" | "hover";
};

type ScreenMapLabel = MapHtmlLabel & {
  visible: boolean;
  x: number;
  y: number;
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

function getLabelFontSize(labelRank: number): number {
  if (labelRank <= 2) return 10;
  if (labelRank <= 4) return 9;
  return 8;
}

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

function isCoordinateOnVisibleHemisphere(
  label: Pick<MapHtmlLabel, "lat" | "lng">,
  pointOfView: { lat?: number; lng?: number }
) {
  const centerLat = degreesToRadians(pointOfView.lat ?? 0);
  const centerLng = degreesToRadians(pointOfView.lng ?? 0);
  const labelLat = degreesToRadians(label.lat);
  const labelLng = degreesToRadians(label.lng);

  const cosineDistance =
    Math.sin(centerLat) * Math.sin(labelLat) +
    Math.cos(centerLat) * Math.cos(labelLat) * Math.cos(labelLng - centerLng);

  return cosineDistance > 0.04;
}

function areScreenLabelsEqual(left: ScreenMapLabel[], right: ScreenMapLabel[]) {
  if (left.length !== right.length) return false;

  return left.every((leftLabel, index) => {
    const rightLabel = right[index];
    return (
      rightLabel &&
      leftLabel.id === rightLabel.id &&
      leftLabel.visible === rightLabel.visible &&
      Math.abs(leftLabel.x - rightLabel.x) < 0.5 &&
      Math.abs(leftLabel.y - rightLabel.y) < 0.5
    );
  });
}

function GlobeLabelLayer({
  dimensions,
  globeRef,
  labels
}: {
  dimensions: { height: number; width: number };
  globeRef: { current: any };
  labels: MapHtmlLabel[];
}) {
  const [screenLabels, setScreenLabels] = useState<ScreenMapLabel[]>([]);

  useEffect(() => {
    let animationFrame = 0;
    let lastUpdateAt = 0;

    const updateScreenLabels = () => {
      const now = Date.now();
      if (now - lastUpdateAt < 50) {
        animationFrame = requestAnimationFrame(updateScreenLabels);
        return;
      }
      lastUpdateAt = now;

      const globe = globeRef.current;

      if (!globe || dimensions.width === 0 || dimensions.height === 0) {
        setScreenLabels([]);
        animationFrame = requestAnimationFrame(updateScreenLabels);
        return;
      }

      const pointOfView = globe.pointOfView() as { lat?: number; lng?: number };
      const nextLabels = labels
        .map((label) => {
          const coords = globe.getScreenCoords(label.lat, label.lng, 0.02) as
            | { x?: number; y?: number }
            | undefined;

          return {
            ...label,
            visible:
              Boolean(coords) &&
              Number.isFinite(coords?.x) &&
              Number.isFinite(coords?.y) &&
              isCoordinateOnVisibleHemisphere(label, pointOfView),
            x: coords?.x ?? 0,
            y: coords?.y ?? 0
          };
        })
        .filter(
          (label) =>
            label.variant === "hover" ||
            (label.x > -60 &&
              label.x < dimensions.width + 60 &&
              label.y > -40 &&
              label.y < dimensions.height + 40)
        );

      setScreenLabels((currentLabels) =>
        areScreenLabelsEqual(currentLabels, nextLabels) ? currentLabels : nextLabels
      );

      animationFrame = requestAnimationFrame(updateScreenLabels);
    };

    animationFrame = requestAnimationFrame(updateScreenLabels);
    return () => cancelAnimationFrame(animationFrame);
  }, [dimensions.height, dimensions.width, globeRef, labels]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {screenLabels.map((label) => (
        <span
          key={label.id}
          className={
            label.variant === "hover"
              ? "globe-map-label globe-map-label-hover"
              : "globe-map-label"
          }
          style={{
            fontSize: `${getLabelFontSize(label.labelRank)}px`,
            opacity: label.visible ? 1 : 0,
            transform: `translate3d(${label.x}px, ${label.y}px, 0) translate(-50%, -50%)`
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);
  const hoveredSelectableRegionRef = useRef<HistoricalRegion | null>(null);
  const [landPolygons, setLandPolygons] = useState<LandPolygon[]>([]);
  const [labelTier, setLabelTier] = useState(0);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const { hoveredRegionId, setHoveredRegionId, setSelectedRegionId } =
    useHistoryStore();

  const hoveredRegion = useMemo(
    () => regions.find((region) => region.id === hoveredRegionId) ?? null,
    [hoveredRegionId, regions]
  );

  const globeMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: "#cfe4ee"
      }),
    []
  );

  const regionByCountry = useMemo(() => {
    const nextMap = new Map<string, HistoricalRegion>();

    regions.forEach((region) => {
      region.countryNames?.forEach((countryName) => {
        nextMap.set(countryName, region);
        nextMap.set(getMapCountryName(countryName), region);
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
          regionByCountry.has(land.name) &&
          land.labelRank <= maxVisibleLabelRank &&
          Number.isFinite(land.labelPosition.lat) &&
          Number.isFinite(land.labelPosition.lng)
      )
      .map((land) => ({
        id: land.id,
        name: regionByCountry.get(land.name)?.name ?? getCountryDisplayName(land.name),
        labelRank: land.labelRank,
        lat: regionByCountry.get(land.name)?.labelPosition.lat ?? land.labelPosition.lat,
        lng: regionByCountry.get(land.name)?.labelPosition.lng ?? land.labelPosition.lng
      }));
  }, [labelTier, landPolygons, regionByCountry]);

  const mapLabels = useMemo<MapHtmlLabel[]>(() => {
    const labels: MapHtmlLabel[] = countryLabels.map((label) => ({
      ...label,
      variant: "country"
    }));

    if (
      hoveredRegion &&
      !labels.some((label) => label.id === `hover-${hoveredRegion.id}`)
    ) {
      labels.push({
        id: `hover-${hoveredRegion.id}`,
        name: hoveredRegion.name,
        labelRank: 0,
        lat: hoveredRegion.labelPosition.lat,
        lng: hoveredRegion.labelPosition.lng,
        variant: "hover"
      });
    }

    return labels;
  }, [countryLabels, hoveredRegion]);

  const findRegionAtCoordinate = useCallback((lng: number, lat: number) => {
    const land = landPolygons.find((polygon) =>
      geometryContainsPoint(polygon.geometry, lng, lat)
    );

    return land ? regionByCountry.get(land.name) ?? null : null;
  }, [landPolygons, regionByCountry]);

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
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const bounds = container.getBoundingClientRect();
      setDimensions((currentDimensions) => {
        const nextDimensions = {
          height: Math.round(bounds.height),
          width: Math.round(bounds.width)
        };

        if (
          currentDimensions.height === nextDimensions.height &&
          currentDimensions.width === nextDimensions.width
        ) {
          return currentDimensions;
        }

        return nextDimensions;
      });
    };

    updateDimensions();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || dimensions.width === 0 || dimensions.height === 0) return;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;
    globe.controls().enableDamping = true;
    globe.pointOfView({ lat: 25, lng: 40, altitude: 2.25 }, 0);
  }, [dimensions.height, dimensions.width]);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateHoveredRegion = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const globe = globeRef.current;

      if (target?.tagName !== "CANVAS" || !globe) {
        hoveredSelectableRegionRef.current = null;
        setHoveredRegionId(null);
        return;
      }

      const bounds = container.getBoundingClientRect();
      const coords = globe.toGlobeCoords(
        event.clientX - bounds.left,
        event.clientY - bounds.top
      ) as GlobeClickCoords | null;
      const region = coords ? findRegionAtCoordinate(coords.lng, coords.lat) : null;

      hoveredSelectableRegionRef.current = region;
      setHoveredRegionId(region?.id ?? null);
    };

    const clearHoveredRegion = () => {
      hoveredSelectableRegionRef.current = null;
      setHoveredRegionId(null);
    };

    container.addEventListener("mousemove", updateHoveredRegion);
    container.addEventListener("mouseleave", clearHoveredRegion);

    return () => {
      container.removeEventListener("mousemove", updateHoveredRegion);
      container.removeEventListener("mouseleave", clearHoveredRegion);
    };
  }, [findRegionAtCoordinate, setHoveredRegionId]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {dimensions.width > 0 &&
      dimensions.height > 0 &&
      landPolygons.length > 0 ? (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
      animateIn={false}
      waitForGlobeReady={true}
      backgroundColor="rgba(219, 231, 238, 1)"
      globeMaterial={globeMaterial}
      showAtmosphere={false}
      polygonsData={landPolygons}
      polygonGeoJsonGeometry={(polygon: object) =>
        (polygon as LandPolygon).geometry as any
      }
      polygonCapColor={(polygon: object) => {
        const land = polygon as LandPolygon;
        const region = regionByCountry.get(land.name);
        if (!region) return "rgba(242, 242, 242, 0.92)";
        if (selectedRegion?.id === region.id) return "rgba(255, 56, 92, 0.86)";
        if (hoveredRegionId === region.id) return "rgba(255, 56, 92, 0.58)";
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
        if (!region) return "rgba(255, 255, 255, 0.55)";
        if (selectedRegion?.id === region.id || hoveredRegionId === region.id) {
          return "rgba(255, 255, 255, 0.88)";
        }
        return "rgba(255, 255, 255, 0.42)";
      }}
      polygonAltitude={(polygon: object) => {
        const land = polygon as LandPolygon;
        const region = regionByCountry.get(land.name);
        if (!region) return 0.004;
        if (selectedRegion?.id === region.id) return 0.008;
        if (hoveredRegionId === region.id) return 0.006;
        return 0.005;
      }}
      polygonLabel={() => ""}
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
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-ocean text-sm font-semibold text-muted">
          正在加载地图
        </div>
      )}
      <GlobeLabelLayer
        dimensions={dimensions}
        globeRef={globeRef}
        labels={mapLabels}
      />
    </div>
  );
}
