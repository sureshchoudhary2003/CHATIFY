import { ENV } from "./env.js";
import crypto from "crypto";

// 1x1 transparent PNG, base64 — no file needed
const testImageBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const dataUri = `data:image/png;base64,${testImageBase64}`;

async function debugUpload() {
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + ENV.CLOUDINARY_API_SECRET)
    .digest("hex");

  const formData = new URLSearchParams();
  formData.append("file", dataUri);
  formData.append("api_key", ENV.CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${ENV.CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  const text = await response.text();
  console.log("STATUS:", response.status);
  console.log("HEADERS:", JSON.stringify([...response.headers]));
  console.log("BODY:", text);
}

debugUpload();