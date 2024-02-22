import dotenv from 'dotenv';
import fetch from 'node-fetch'
import crypto from 'node:crypto'
import fs from  'node:fs'
import AWS from 'aws-sdk'
dotenv.config();


// Configuração do AWS SDK para usar o Cloudflare R2
const s3 = new AWS.S3({
  endpoint: 'https://f68e554b630c9e477a4d5a3706cccc56.r2.cloudflarestorage.com/bookmarks', // Substitua <your-r2-endpoint> pelo endpoint do seu bucket R2
  accessKeyId: process.env.R2_ACCESS_KEY_ID, // Use suas credenciais armazenadas em variáveis de ambiente
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

export const uploadFile = async (url: string) => {
  // Ler o conteúdo do arquivo
  const response = await fetch(url);
  const imageBuffer  = await response.arrayBuffer()

  // Configurar os parâmetros para o upload
  const params = {
    Bucket: 'bookmarks', // Substitua 'your-bucket-name' pelo nome do seu bucket R2
    Key: `${crypto.randomBytes(16).toString('hex')}.png`, // Substitua 'file-name-in-r2' pelo nome desejado para o arquivo no bucket
    Body: new Uint8Array(imageBuffer),
  };

  const upload = await s3.upload(params).promise()
  console.log(upload.Location)
  return upload.Location
  // Upload do arquivo para o bucket R2
  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(`File uploaded successfully. ${data.Location}`);
  // });
};



