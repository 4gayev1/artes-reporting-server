const Minio = require("minio");

const MinioConf = {
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "artes",
  secretKey: "artes123",
};

const minioClient = new Minio.Client(MinioConf);

const bucketPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: { AWS: ["*"] },
      Action: ["s3:GetObject"],
      Resource: ["arn:aws:s3:::artes-reports/*"],
    },
  ],
};

async function ensureBucket() {
  const bucket = "artes-reports";
  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    console.log(`Bucket "${bucket}" does not exist. Creating...`);
    await minioClient.makeBucket(bucket);
    console.log(`Bucket "${bucket}" created`);
  } else {
    console.log(`Bucket "${bucket}" exists`);
  }

  await minioClient.setBucketPolicy(
    "artes-reports",
    JSON.stringify(bucketPolicy),
  );
  console.log(`Bucket policy applied for "${bucket}"`);
}

ensureBucket().catch(console.error);

module.exports = { minioClient, MinioConf };
