# Data Model

The app currently uses static TypeScript data, but the shape is designed so it can later be moved into JSON, an API, or a relational database.

## Region period profile

A profile represents one modern map area during one time period.

Example: China during 1500-1550.

Recommended database table: `region_period_profiles`

| Field | Meaning |
| --- | --- |
| `id` | Stable profile id, such as `china-1500-1550`. |
| `periodId` | Time period id, such as `1500-1550`. |
| `modernName` | User-facing modern map area name. |
| `type` | `modern-area` or `macro-region`. |
| `countryNames` | Modern Natural Earth country names mapped to this profile. |
| `labelPosition` | Approximate map camera focus point. |
| `color` | Display color for the mapped countries. |
| `themes` | Major themes used for filtering. |
| `importance` | Region-level importance for this period: `S`, `A`, `B`, or `C`. |
| `summary` | Short learning summary. |

## Historical statuses

A profile can have multiple historical statuses because a modern area may have belonged to several polities or cultural zones during the same period.

Recommended database table: `historical_statuses`

| Field | Meaning |
| --- | --- |
| `profileId` | Parent region period profile id. |
| `name` | Historical polity, culture, or sphere of influence. |
| `type` | Polity, civilization zone, colonial force, regional force, or coexistence. |
| `territoryNote` | Human-readable explanation of what part of the modern area it covered. |
| `startYear` / `endYear` | Optional date bounds inside the period. |

## Events

Events are attached to a region profile and can be filtered by category and importance.

Recommended database table: `history_events`

| Field | Meaning |
| --- | --- |
| `profileId` | Parent region period profile id. |
| `year` | Event year. |
| `title` | Event title. |
| `category` | Politics, war, culture, technology, religion, trade, or colonization. |
| `importance` | Event importance: `S`, `A`, `B`, or `C`. |
| `description` | Short explanation in original wording. |

## Connections

Connections explain why this area matters beyond itself during the selected period.

Recommended database table: `global_connections`

| Field | Meaning |
| --- | --- |
| `profileId` | Parent region period profile id. |
| `title` | Connection title. |
| `description` | Explanation of cross-region relevance. |

## Sources and media

Sources and images are currently attached directly to each profile. Later they can be normalized into `sources`, `profile_sources`, and `profile_images` tables.
