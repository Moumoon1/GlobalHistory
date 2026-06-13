PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS areas (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'macro-region'
);

CREATE TABLE IF NOT EXISTS history_events (
  id TEXT PRIMARY KEY,
  time_label TEXT NOT NULL,
  start_year INTEGER,
  end_year INTEGER,
  area_id TEXT NOT NULL REFERENCES areas(id) ON DELETE CASCADE,
  historical_status TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  importance TEXT NOT NULL CHECK (importance IN ('S', 'A', 'B', 'C')),
  description TEXT NOT NULL DEFAULT '',
  frontend_use TEXT NOT NULL DEFAULT '',
  source_note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_people (
  event_id TEXT NOT NULL REFERENCES history_events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (event_id, name)
);

CREATE TABLE IF NOT EXISTS event_sources (
  event_id TEXT NOT NULL REFERENCES history_events(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  source_type TEXT NOT NULL DEFAULT 'reference',
  PRIMARY KEY (event_id, url)
);

CREATE INDEX IF NOT EXISTS idx_history_events_time
  ON history_events (start_year, end_year);

CREATE INDEX IF NOT EXISTS idx_history_events_area
  ON history_events (area_id);

CREATE INDEX IF NOT EXISTS idx_history_events_category
  ON history_events (category);

CREATE INDEX IF NOT EXISTS idx_history_events_importance
  ON history_events (importance);

CREATE TABLE IF NOT EXISTS learning_cards (
  id TEXT PRIMARY KEY,
  source_book_title TEXT NOT NULL,
  source_chapter TEXT NOT NULL,
  source_sections_json TEXT NOT NULL DEFAULT '[]',
  source_file TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL,
  time_precision TEXT NOT NULL DEFAULT 'period',
  start_year INTEGER,
  end_year INTEGER,
  area TEXT NOT NULL,
  modern_country_hints_json TEXT NOT NULL DEFAULT '[]',
  historical_status TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  importance TEXT NOT NULL CHECK (importance IN ('S', 'A', 'B', 'C')),
  summary TEXT NOT NULL,
  background TEXT NOT NULL DEFAULT '',
  process TEXT NOT NULL DEFAULT '',
  impact TEXT NOT NULL DEFAULT '',
  map_note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_card_people (
  card_id TEXT NOT NULL REFERENCES learning_cards(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (card_id, name)
);

CREATE TABLE IF NOT EXISTS learning_card_source_mentions (
  card_id TEXT NOT NULL REFERENCES learning_cards(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (card_id, name)
);

CREATE TABLE IF NOT EXISTS learning_card_concepts (
  card_id TEXT NOT NULL REFERENCES learning_cards(id) ON DELETE CASCADE,
  concept TEXT NOT NULL,
  PRIMARY KEY (card_id, concept)
);

CREATE INDEX IF NOT EXISTS idx_learning_cards_time
  ON learning_cards (start_year, end_year);

CREATE INDEX IF NOT EXISTS idx_learning_cards_category
  ON learning_cards (category);

CREATE INDEX IF NOT EXISTS idx_learning_cards_importance
  ON learning_cards (importance);
