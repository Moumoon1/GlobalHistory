import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const defaultCardsInput = "../../outputs/global-history-learning-cards.json";
const defaultDbPath = "data/generated/history.sqlite";
const defaultJsonOutput = "data/generated/learning-cards.json";

const cardsInputPath = resolve(process.argv[2] ?? defaultCardsInput);
const dbPath = resolve(process.argv[3] ?? defaultDbPath);
const jsonOutputPath = resolve(process.argv[4] ?? defaultJsonOutput);

function sql(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replaceAll("'", "''")}'`;
}

function jsonSql(value) {
  return sql(JSON.stringify(value ?? []));
}

function normalizePeople(people) {
  if (!Array.isArray(people)) return [];

  return people
    .map((person) =>
      typeof person === "string" ? { name: person, role: "" } : person
    )
    .filter((person) => person?.name);
}

function buildCardSql(cards) {
  const statements = [];

  for (const card of cards) {
    const source = card.source ?? {};

    statements.push(`INSERT OR REPLACE INTO learning_cards (
  id,
  source_book_title,
  source_chapter,
  source_sections_json,
  source_file,
  time_label,
  time_precision,
  start_year,
  end_year,
  area,
  modern_country_hints_json,
  historical_status,
  title,
  category,
  importance,
  summary,
  background,
  process,
  impact,
  map_note
) VALUES (
  ${sql(card.id)},
  ${sql(source.bookTitle ?? "")},
  ${sql(source.chapter ?? "")},
  ${jsonSql(source.sections ?? [])},
  ${sql(source.sourceFile ?? "")},
  ${sql(card.timeRange)},
  ${sql(card.timePrecision ?? "period")},
  ${card.startYear ?? "NULL"},
  ${card.endYear ?? "NULL"},
  ${sql(card.area)},
  ${jsonSql(card.modernCountryHints ?? [])},
  ${sql(card.historicalStatus)},
  ${sql(card.title)},
  ${sql(card.category)},
  ${sql(card.importance)},
  ${sql(card.summary)},
  ${sql(card.background ?? "")},
  ${sql(card.process ?? "")},
  ${sql(card.impact ?? "")},
  ${sql(card.mapNote ?? "")}
);`);

    statements.push(
      `DELETE FROM learning_card_people WHERE card_id = ${sql(card.id)};`
    );
    statements.push(
      `DELETE FROM learning_card_source_mentions WHERE card_id = ${sql(card.id)};`
    );
    statements.push(
      `DELETE FROM learning_card_concepts WHERE card_id = ${sql(card.id)};`
    );

    for (const person of normalizePeople(card.people)) {
      statements.push(
        `INSERT INTO learning_card_people (card_id, name, role) VALUES (${sql(
          card.id
        )}, ${sql(person.name)}, ${sql(person.role ?? "")});`
      );
    }

    for (const mention of card.sourceMentions ?? []) {
      statements.push(
        `INSERT INTO learning_card_source_mentions (card_id, name) VALUES (${sql(
          card.id
        )}, ${sql(mention)});`
      );
    }

    for (const concept of card.relatedConcepts ?? []) {
      statements.push(
        `INSERT INTO learning_card_concepts (card_id, concept) VALUES (${sql(
          card.id
        )}, ${sql(concept)});`
      );
    }
  }

  return statements.join("\n");
}

if (!existsSync(cardsInputPath)) {
  throw new Error(`Learning cards file not found: ${cardsInputPath}`);
}

if (!existsSync(dbPath)) {
  throw new Error(`SQLite database not found. Run npm run db:build first: ${dbPath}`);
}

const cards = JSON.parse(readFileSync(cardsInputPath, "utf8"));
const importSql = ["PRAGMA foreign_keys = ON;", "BEGIN;", buildCardSql(cards), "COMMIT;"].join(
  "\n\n"
);

const sqliteResult = spawnSync("sqlite3", [dbPath], {
  input: importSql,
  encoding: "utf8"
});

if (sqliteResult.status !== 0) {
  throw new Error(sqliteResult.stderr || "sqlite3 import failed.");
}

mkdirSync(dirname(jsonOutputPath), { recursive: true });
writeFileSync(jsonOutputPath, `${JSON.stringify(cards, null, 2)}\n`);

console.log(`Imported ${cards.length} learning cards.`);
console.log(`SQLite: ${dbPath}`);
console.log(`JSON:   ${jsonOutputPath}`);
