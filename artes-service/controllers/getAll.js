const pool = require("../db/db");

async function getAll(req, res) {
  try {
    const { project, name, type, date, fromDate, toDate } = req.query;

    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const offset = (page - 1) * size;

    let baseQuery = `FROM reports WHERE 1=1`;
    const values = [];
    let i = 1;

    if (project) {
      baseQuery += ` AND project ILIKE $${i++}`;
      values.push(`%${project}%`);
    }

    if (name) {
      baseQuery += ` AND name ILIKE $${i++}`;
      values.push(`%${name}%`);
    }

    if (type) {
      baseQuery += ` AND type = $${i++}`;
      values.push(type);
    }

    if (date) {
      baseQuery += ` AND DATE(upload_date) = $${i++}`;
      values.push(date);
    }

    if (fromDate) {
      baseQuery += ` AND upload_date >= $${i++}`;
      values.push(fromDate);
    }

    if (toDate) {
      baseQuery += ` AND upload_date <= $${i++}`;
      values.push(toDate);
    }

    const count = await pool.query(`SELECT COUNT(*) ${baseQuery}`, values);

    const total = Number(count.rows[0].count);

    const data = await pool.query(
      `
      SELECT *
      ${baseQuery}
      ORDER BY upload_date DESC
      LIMIT $${i} OFFSET $${i + 1}
      `,
      [...values, size, offset],
    );

    res.json({
      page,
      size,
      total,
      totalPages: Math.ceil(total / size),
      reports: data.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

module.exports = { getAll };
