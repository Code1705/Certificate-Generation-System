import Certificate from "../models/Certificate.js";
import uploadToGoogleDrive from "../utils/googleDrive.js";
import generateCertificatePDF from "../utils/pdfGenerator.js";

export const createCertificate = async (req, res) => {
  try {
    const { name, email } = req.body;
    await generateCertificatePDF(name);
    const fileId = await uploadToGoogleDrive(name);
    const fileLink = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    const newCertificate = new Certificate({ name, email, fileLink });
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error) {
    res.status(500).json({ message: "Error creating certificate", error });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    // console.log(certificates);
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching certificates", error });
  }
};
