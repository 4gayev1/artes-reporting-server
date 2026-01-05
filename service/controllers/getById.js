const pool = require("../db/db");
const axios = require("axios");
const AdmZip = require("adm-zip");
const path = require("path");
const fs = require("fs");

async function getById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM reports WHERE id = $1", [
      id,
    ]);

    if (!result.rows.length) {
      return res.status(404).send("Report not found");
    }

    const report = result.rows[0];

    const response = await axios.get(report.file_url, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data);
    const filename = report.file_url.split("/").pop().toLowerCase();

    const reportDir = path.join(__dirname, "../temp", `report-${id}`);

    fs.rmSync(reportDir, { recursive: true, force: true });
    fs.mkdirSync(reportDir, { recursive: true });

    if (filename.endsWith(".zip")) {
      const zip = new AdmZip(buffer);
      zip.extractAllTo(reportDir, true);

      const url = `${req.protocol}://${req.get("host")}/api/preview/report-${id}/report/index.html`;

      return res.json({ 
        url: url
      });

    }

    if (filename.endsWith(".html")) {
      fs.writeFileSync(path.join(reportDir, "index.html"), buffer);

      const url = `${req.protocol}://${req.get("host")}/api/preview/report-${id}/report/index.html`;

      return res.json({ 
        url: url
      });    }

    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

module.exports = { getById };
