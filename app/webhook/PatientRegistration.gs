// เรียก Script Properties ก่อน
const scriptProperties = PropertiesService.getScriptProperties();

// แทนที่ YOUR_SPREADSHEET_ID และ SHEET_NAME ด้วยข้อมูลของคุณ
var SPREADSHEET_ID = scriptProperties.getProperty('SPREADSHEET_ID');
var SHEET_NAME = scriptProperties.getProperty('SHEET_NAME');; 
// ================================================================
//  ฟังก์ชันสำหรับจัดการ GET requests (เช่น การดึงข้อมูล Dashboard)
// ================================================================
function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    // เราจะเรียกใช้ฟังก์ชันที่เตรียมข้อมูล Dashboard โดยตรง
    return handleGetDashboardData(spreadsheet);
  } catch (err) {
    Logger.log(err);
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "An error occurred in doGet: " + err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================
//  ฟังก์ชันสำหรับจัดการ POST requests (เช่น การลงทะเบียน)
// ================================================================
function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("Sheet not found. Please check the sheet name.");
    }

    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'register_new';

    if (action === 'find_patient') {
      const nationalId = data.nationalId;
      const patientData = findPatientById(sheet, nationalId);
      if (patientData) {
        return ContentService.createTextOutput(JSON.stringify({ success: true, patient: patientData })).setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: "ไม่พบข้อมูลผู้ป่วย" })).setMimeType(ContentService.MimeType.JSON);
      }

    } else if (action === 'register_new' || action === 'register_existing') {
      const newRow = [
        data.nationalId,
        new Date(),
        data.firstName,
        data.lastName,
        data.gender,
        data.dob,
        "'" + data.phone,
        data.allergies || '',
        data.symptoms,
        data.weight || '',
        data.height || '',
        data.age || '',
        data.desired,
        data.disease || '',
        data.address || '',
        data.certificate || '',
      ];
      sheet.appendRow(newRow);
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);

    } else {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Unknown action" })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    Logger.log(error.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ฟังก์ชันสำหรับค้นหาข้อมูลผู้ป่วยจากเลขบัตรประชาชน
 */
function findPatientById(sheet, nationalId) {
  const data = sheet.getDataRange().getValues();
  const searchId = String(nationalId).trim();

  for (let i = data.length - 1; i >= 1; i--) {
    const sheetNationalId = String(data[i][0]).trim();

    if (sheetNationalId === searchId) {
      const dobValue = data[i][5];
      let formattedDob = '';

      if (dobValue instanceof Date && !isNaN(dobValue)) {
        formattedDob = Utilities.formatDate(dobValue, 'Asia/Bangkok', 'yyyy-MM-dd');
      } else if (typeof dobValue === 'string' && dobValue) {
        formattedDob = dobValue.substring(0, 10);
      }

      return {
        nationalId: data[i][0],
        firstName: data[i][2],
        lastName: data[i][3],
        gender: data[i][4],
        dob: formattedDob,
        phone: data[i][6],
        address: data[i][14],
        allergies: data[i][7],
        disease: data[i][13],
        weight: data[i][9],
        height: data[i][10]
      };
    }
  }
  return null;
}
