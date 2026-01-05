const express = require("express");
const reportsRouter = require("./routes/reports");
const cors = require("cors");
const path = require("path");

require("./controllers/tempCleaner");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", reportsRouter);

app.use("/api/preview", express.static(path.join(__dirname, "temp")));

const PORT = 4010;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
