import express from "express";
import multer from "multer";
import Minio from 'minio'
import { v4 as uuidv4 } from 'uuid'

const minio = new Minio.Client({
  endPoint: "minio",
  port: parseInt(process.env.MINIO_PORT, 10),
  useSSL: false,
  accessKey: process.env.MINIO_USER,
  secretKey: process.env.MINIO_PASSWORD
});

const BUCKET = 'image'
const MAX_FILE_SIZE = 15 * 1024 * 1024

const app = express();

app.post("/upload", multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_FILE_SIZE } }).single("file"), async function (request, response) {
  const id = uuidv4()
  try {
    await minio.putObject(BUCKET, id, request.file.buffer, {
      fieldName: request.file.fieldname,
      "content-type": request.file.mimetype,
      "Mimetype": request.file.mimetype, "Cache-Control": "max-age=86400"
    });
    response.send({
      success: {
        id
      }
    });
  }
  catch (error) {
    console.log({ error })
    response.status(500).send({
      error
    });
  }
});


app.listen(3000)