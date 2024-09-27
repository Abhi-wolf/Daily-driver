import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase.config.js";
import fs from "fs";

export async function uploadFile(localFilePath) {
  try {
    if (!localFilePath) return null;

    const storageRef = ref(storage, `${localFilePath}`);

    const fileBuffer = fs.readFileSync(localFilePath);

    const snapshot = await uploadBytes(storageRef, fileBuffer);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File uploaded successfully:", downloadURL);

    // Optionally, delete the local file after upload
    fs.unlinkSync(localFilePath);

    return { url: downloadURL };
  } catch (error) {
    console.error("Error uploading file to Firebase:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Remove local file in case of error
    }
    return null;
  }
}
