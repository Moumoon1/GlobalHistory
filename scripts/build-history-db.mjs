import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";

const defaultDbOutput = "data/generated/history.sqlite";

const dbOutputPath = resolve(process.argv[2] ?? defaultDbOutput);
const schemaPath = resolve("database/schema.sql");

if (!existsSync(schemaPath)) {
  throw new Error(`Schema file not found: ${schemaPath}`);
}

mkdirSync(dirname(dbOutputPath), { recursive: true });

if (existsSync(dbOutputPath)) {
  rmSync(dbOutputPath);
}

const schemaSql = readFileSync(schemaPath, "utf8");
const sqliteResult = spawnSync("sqlite3", [dbOutputPath], {
  input: schemaSql,
  encoding: "utf8"
});

if (sqliteResult.status !== 0) {
  throw new Error(sqliteResult.stderr || "sqlite3 failed.");
}

console.log("Initialized empty history database.");
console.log(`SQLite: ${dbOutputPath}`);
