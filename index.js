const PDFDocument = require("pdfkit");
const fs = require("fs");

function createPDF() {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  // Embed a Thai font
  doc.registerFont("THSarabun", "./THSarabunNew.ttf");

  // Output file
  const fileName = "output_with_rounded_border.pdf";
  doc.pipe(fs.createWriteStream(fileName));

  // Header Section
  doc
    .font("THSarabun")
    .fontSize(20)
    .fillColor("teal")
    .text("ใบขายฝาก", 400, 50, { align: "right" })
    .fontSize(12)
    .fillColor("black")
    .text("เลขที่ P2567081234", 400, 70, { align: "right" });

  doc
    .fontSize(14)
    .fillColor("black")
    .text("โรงรับจำนำ เลิศชัย", 50, 50)
    .text(
      "ถ.ประเสริฐมนูกิจ แขวงนวมินทร์ เขตบึงกุ่ม กรุงเทพมหานคร 10230",
      50,
      70
    );

  // Customer Details
  doc
    .moveDown()
    .fontSize(12)
    .text("ชื่อ-นามสกุล: นายสราวุธ จิตแจ่มใส", 50, 110)
    .text("ที่อยู่: 34/23 หมู่ที่ 8 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี", 50, 130)
    .text("เบอร์โทรศัพท์: 0955700894", 50, 150)
    .text("เลขบัตรประชาชน: 1160100456098", 50, 170)
    .text("วันครบกำหนด: 07/08/2567", 400, 150, { align: "right" });

  // Contract Details Section
  doc
    .fontSize(10)
    .fillColor("black")
    .text(
      "2. ผู้ขายฝากยอมให้คิดดอกเบี้ยอัตราร้อยละ 5% ต่อปี ตามจำนวนเงินที่ขายฝากไว้...",
      50,
      200
    )
    .text(
      "3. ผู้ขายฝากรับรองว่าทรัพย์สินที่ขายฝากนั้น เป็นทรัพย์สินของผู้ขายฝากเอง...",
      50,
      220
    )
    .text(
      "4. ผู้รับจำนำตกลงว่าจะไม่จำหน่ายทรัพย์สินที่ขายฝากก่อนกำหนด...",
      50,
      240
    );

  // Table Section
  doc.moveTo(50, 300).lineTo(550, 300).strokeColor("#CCCCCC").stroke();

  const lineHeight = 20; // กำหนดความสูงของบรรทัด (สามารถปรับตามต้องการ)

  doc
    .fontSize(12)
    .text("5%", 500, 310, { align: "right" })
    .text("4 เดือน", 500, 330, { align: "right" })
    .text("10,000 บาท", 500, 350, { align: "right" });

  // เพิ่มระยะห่างระหว่างบรรทัด
  doc
    .text("อัตราดอกเบี้ย/ปี", 400, 310)
    .text("ระยะเวลา", 400, 330)
    .text("ราคาไถ่ถอน", 400, 350);

  // Footer Section with rounded borders and dividers
  const borderX = 50;
  const borderY = 700;
  const borderWidth = 500;
  const borderHeight = 100;

  // Create rounded rectangle with border color
  doc
    .roundedRect(borderX, borderY, borderWidth, borderHeight, 12) // Add rounded corners
    .strokeColor("#00BB9F")
    .lineWidth(2)
    .stroke();

  // Add vertical dividers
  doc
    .moveTo(borderX + 166, borderY) // Divider 1
    .lineTo(borderX + 166, borderY + borderHeight)
    .strokeColor("#00BB9F")
    .stroke();

  doc
    .moveTo(borderX + 333, borderY) // Divider 2
    .lineTo(borderX + 333, borderY + borderHeight)
    .strokeColor("#00BB9F")
    .stroke();

  // Footer text inside the bordered sections
  doc
    .fontSize(12)
    .text("ผู้ขายฝาก", 90, 720, { align: "center", width: 100 })
    .text("12/09/2567", 90, 740, { align: "center", width: 100 });

  doc
    .text("ผู้รับฝาก", 256, 720, { align: "center", width: 100 })
    .text("12/09/2567", 256, 740, { align: "center", width: 100 });

  doc
    .text("ผู้อนุมัติ", 422, 720, { align: "center", width: 100 })
    .text("12/09/2567", 422, 740, { align: "center", width: 100 });

  // Save the file
  doc.end();
  console.log(`PDF created successfully: ${fileName}`);
}

createPDF();
