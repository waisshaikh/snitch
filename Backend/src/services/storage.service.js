import { config } from '../config/config.js';


export async function uploadFile({ buffer, fileName, mimeType, folder = "/snitch" }) {
  if (!buffer) {
    throw new Error("Image buffer is missing");
  }

  if (buffer.length === 0) {
    throw new Error("Image file is empty");
  }

  if (!fileName) {
    throw new Error("Image fileName is missing");
  }

  const privateKey = config.IMAGEKIT_PRIVATE_KEY?.trim();

  if (!privateKey?.startsWith("private_")) {
    throw new Error("Invalid ImageKit private key");
  }

  const formData = new FormData();
  formData.append("file", buffer.toString("base64"));
  formData.append("fileName", fileName);
  formData.append("folder", folder.replace(/^\/+/, ""));
  formData.append("useUniqueFileName", "true");

  const credentials = Buffer.from(`${privateKey}:`).toString("base64");
  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    body: formData,
  });

  const responseText = await response.text();

  if (!response.ok) {
    const error = new Error(responseText || "ImageKit upload failed");
    error.status = response.status;
    error.imageKitRequestId =
      response.headers.get("x-ik-requestid") || response.headers.get("x-request-id");
    throw error;
  }

  const result = JSON.parse(responseText);

  return result.url;
}
