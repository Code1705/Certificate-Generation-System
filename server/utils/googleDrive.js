import fs from "fs";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const uploadToGoogleDrive = async (name) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "test1.json",
      scopes: "https://www.googleapis.com/auth/drive",
    });

    const drive = google.drive({ version: "v3", auth });
    const filePath = `utils/${name}_certificate.pdf`;
    const fileMetadata = {
      name: `${name}.pdf`,
      parents: ["1-mUzBUMvzk25PYce_hCYyVCksQlnJ1gZ"],
    };

    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      return;
    }

    const media = {
      mimeType: "application/pdf",
      body: fs.createReadStream(filePath),
    };

    media.body.on("error", (err) => {
      console.error("Stream error:", err);
      throw err;
    });

    console.log("Uploading file...");
    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, name, size",
    });

    console.log("File uploaded successfully:", file.data.name);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        throw err;
      }
      console.log("File deleted successfully from local path", filePath);
    });

    return file.data.id;
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw error;
  }
};

export default uploadToGoogleDrive;
