const pool = require("../db/db");

async function getTypes(req, res) {
  try {
    const { rows } = await pool.query(`SELECT DISTINCT type FROM reports`);

    const result = rows.map((row, index) => ({
      [index + 1]: row.type,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get types" });
  }
}

module.exports = { getTypes };
