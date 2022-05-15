import express from "express";
import multer from "multer";
import Minio from 'minio'
import { v4 as uuidv4 } from 'uuid'

const minio = new Minio.Client({
  endPoint: process.env.HOST,
  port: parseInt(process.env.MINIO_PORT, 10),
  useSSL: false,
  accessKey: process.env.MINIO_USER,
  secretKey: process.env.MINIO_PASSWORD
});

const BUCKET = 'image'

const app = express();

app.post("/upload", multer({ storage: multer.memoryStorage() }).single("file"), async function (request, response) {
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
    response.status(500).send({
      error
    });
  }


});


app.listen(3000)