const { minioClient } = require("../minioClient");

const BUCKET_NAME = "logo";
const OBJECT_NAME = "logo";

async function getLogo(req, res) {
  try {
    const stream = await minioClient.getObject(BUCKET_NAME, OBJECT_NAME);

    res.setHeader("Cache-Control", "public, max-age=86400");

    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(404).send("Logo not found");
  }
}

module.exports = { getLogo };
