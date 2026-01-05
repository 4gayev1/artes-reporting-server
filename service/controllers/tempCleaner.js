const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const tempDir = path.join(__dirname, "../temp");

function clearTempFolder() {
  try {
    if (fs.existsSync(tempDir)) {
      fs.readdirSync(tempDir).forEach((file) => {
        const curPath = path.join(tempDir, file);
        fs.rmSync(curPath, { recursive: true, force: true });
      });
      console.log(`[${new Date().toISOString()}] Temp folder cleared`);
    }
  } catch (err) {
    console.error("Error clearing temp folder:", err.message);
  }
}

cron.schedule("0 */12 * * *", () => {
  clearTempFolder();
});

clearTempFolder();
