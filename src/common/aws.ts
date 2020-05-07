import * as fs from "fs";
import * as AWS from "aws-sdk";
import { Readable } from "stream";
const BUCKET_NAME = 'atixteam';
const IAM_USER_KEY = 'AKIAIS3ZKSJOV7MQ3GIQ';
const IAM_USER_SECRET = '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';

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});


export function uploadToS3(readStream: Readable, fileName: string): Promise<any> {
  const params = {
    Bucket: BUCKET_NAME,
    Key: "myapp" + "/" + fileName,
    Body: readStream,
    ACL: 'public-read'
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, function(err, data) {
      readStream.destroy();
      
      if (err) {
        return reject(err);
      }
      
      return resolve(data);
    });
  });
}