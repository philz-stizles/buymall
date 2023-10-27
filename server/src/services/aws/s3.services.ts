import fs, { PathLike } from 'fs';
import * as AWS from '@aws-sdk/client-s3';

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });
const region = process.env.AWS_REGION as string;
const bucket = process.env.AWS_BUCKET_NAME as string;
const s3 = new AWS.S3({ apiVersion: '2010-12-01' });

export const uploadDoc = async (name: string, file: PathLike, type: string) => {
  const key = `${process.env.AWS_BUCKET_ROOT_DIR}${name}`;
  const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  const command = new AWS.PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: fs.readFileSync(file),
    ACL: 'public-read',
    ContentType: type,
  });

  const response = await s3.send(command);
  console.log(response);
  return url;
};

export const uploadDocBase64 = async (
  name: string,
  base64Data: any,
  contentType: string
) => {
  const key = `${process.env.AWS_BUCKET_ROOT_DIR}${name}`;
  const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  const command = new AWS.PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: contentType,
  });

  const response = await s3.send(command);
  console.log(response);
  return url;
};

export const removeDoc = (key: string) => {
  const command = new AWS.DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  s3.send(command);
};
