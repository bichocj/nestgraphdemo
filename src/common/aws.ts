import * as AWS from "aws-sdk";
import { Readable } from "stream";
const BUCKET_NAME = process.env.AWS_STORAGE_BUCKET_NAME;
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

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