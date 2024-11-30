import PDFDocument from "pdfkit";
import fs from "fs";
import sizeOf from "image-size";

const generateCertificatePDF = async (name) => {
  const imagePath = "utils/certificate_template.png";

  if (!fs.existsSync(imagePath)) {
    console.error(`File not found: ${imagePath}`);
    throw new Error("Template is missing!");
  }

  const dimensions = sizeOf(imagePath);
  const imageWidth = dimensions.width;
  const imageHeight = dimensions.height;

  const outputFilePath = `utils/${name}_certificate.pdf`;

  const fontPath = "utils/fonts/MeowScript-Regular.ttf";

  if (!fs.existsSync(fontPath)) {
    console.error(`Font not found: ${fontPath}`);
    throw new Error("Font is missing!");
  }

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: [imageWidth, imageHeight],
    });

    const writeStream = fs.createWriteStream(outputFilePath);

    writeStream.on("finish", () => {
      console.log(`Certificate generated successfully at ${outputFilePath}`);
      resolve(outputFilePath);
    });

    writeStream.on("error", (err) => {
      console.error("Error writing PDF file:", err);
      reject(err);
    });

    doc.pipe(writeStream);

    doc.image(imagePath, 0, 0, { width: imageWidth, height: imageHeight });

    doc.font(fontPath).fontSize(60).fillColor("blue").text(name, 650, 360);

    doc.end();
  });
};

export default generateCertificatePDF;
