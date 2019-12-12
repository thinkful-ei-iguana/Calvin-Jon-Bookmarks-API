require("dotenv").config();

module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  connectionString: process.env.DB_URL,
  DB_URL:
    process.env.DB_URL || "postgresql://dunder_mifflin@localhost/bookmarks"
};
