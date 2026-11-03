-- ใช้ตอนสร้างฐานข้อมูลใหม่ (โฟลเดอร์ mysql_data ว่าง) เท่านั้น
CREATE TABLE IF NOT EXISTS `root` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Equation` TEXT NOT NULL,
  PRIMARY KEY (`ID`)
);
