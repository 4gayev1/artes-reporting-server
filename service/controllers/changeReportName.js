const pool = require("../db/db");

async function changeReportName(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  try {
    const result = await pool.query(
      `UPDATE reports
       SET name = $1
       WHERE id = $2
       RETURNING *;`,
      [name, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ message: "Report name updated", report: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update report" });
  }
}

module.exports = { changeReportName };
