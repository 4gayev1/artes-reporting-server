const pool = require("../db/db");

async function getProjects(req, res) {
  try {
    const { rows } = await pool.query(`SELECT DISTINCT project FROM reports`);

    const result = rows.map((row, index) => ({
      [index + 1]: row.project,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get projects" });
  }
}

module.exports = { getProjects };
