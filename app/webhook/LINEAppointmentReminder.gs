// เรียก Script Properties ก่อน
const scriptProperties = PropertiesService.getScriptProperties();

// ดึงค่าจาก Script Properties จริง ๆ
const CHANNEL_ACCESS_TOKEN = scriptProperties.getProperty('CHANNEL_ACCESS_TOKEN');
const ADMIN_USER_ID = scriptProperties.getProperty('ADMIN_USER_ID');  // แก้ไขตัวสะกด AMDIN -> ADMIN
const SPREADSHEET_ID = scriptProperties.getProperty('SPREADSHEET_ID');
const SHEET_NAME = "ชีต1"; // ชื่อชีตยังสามารถใช้ได้

/**
 * ฟังก์ชันหลักสำหรับตรวจสอบและส่งการแจ้งเตือนนัดหมายผ่าน LINE
 */
function sendLineReminders() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = row[2];      // ชื่อ (คอลัมน์ C)
    const dateStr = row[17];    // วันนัด (คอลัมน์ R)
    const timeStr = row[18];    // เวลา (คอลัมน์ S)

    if (!dateStr || !name) continue; // ข้ามไปถ้าไม่มีข้อมูลวันที่หรือชื่อ

    const appointmentDate = new Date(dateStr);
    appointmentDate.setHours(0, 0, 0, 0);

    // ตรวจสอบว่าเป็นนัดของวันนี้หรือไม่
    if (appointmentDate.getTime() === today.getTime()) {
      // สร้าง Flex Message และส่งข้อความ
      pushLineFlexMessage(ADMIN_USER_ID, name, formatDate(appointmentDate), timeStr);
    }
  }
}

/**
 * ส่งข้อความแจ้งเตือนในรูปแบบ Flex Message
 * @param {string} userId - ไอดีของผู้รับ
 * @param {string} name - ชื่อผู้มีนัด
 * @param {string} date - วันที่นัด (รูปแบบ YYYY-MM-DD)
 * @param {string} time - เวลานัด (เช่น "14:30")
 */
function pushLineFlexMessage(userId, name, date, time) {
  const url = "https://api.line.me/v2/bot/message/push";
  const timeText = time ? time : "ไม่ระบุเวลา";

  // ข้อความที่จะแสดงในหน้าต่างแชทและในการแจ้งเตือน (กรณีดูพรีวิว)
  const altTextMessage = `แจ้งเตือนนัดหมาย: คุณ ${name} วันที่ ${date} เวลา ${timeText}`;

  const flexMessage = {
    "type": "flex",
    "altText": altTextMessage,
    "contents": {
      "type": "bubble",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "📅  แจ้งเตือนนัดหมาย",
            "weight": "bold",
            "color": "#1DB446",
            "size": "md"
          },
          {
            "type": "text",
            "text": "Appointment Reminder",
            "color": "#666666",
            "size": "xs",
            "margin": "md"
          }
        ],
        "paddingAll": "20px",
        "backgroundColor": "#F0F8FF"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "👤",
                "flex": 1,
                "size": "sm",
                "gravity": "center"
              },
              {
                "type": "text",
                "text": name,
                "flex": 5,
                "size": "sm",
                "wrap": true
              }
            ],
            "spacing": "md"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "🗓️",
                "flex": 1,
                "size": "sm",
                "gravity": "center"
              },
              {
                "type": "text",
                "text": date,
                "flex": 5,
                "size": "sm"
              }
            ],
            "spacing": "md",
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "⏰",
                "flex": 1,
                "size": "sm",
                "gravity": "center"
              },
              {
                "type": "text",
                "text": timeText,
                "flex": 5,
                "size": "sm"
              }
            ],
            "spacing": "md",
            "margin": "md"
          }
        ]
      },
      "styles": {
        "header": {
          "separator": true
        }
      }
    }
  };

  const payload = {
    to: userId,
    messages: [flexMessage]
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    payload: JSON.stringify(payload)
  };

  try {
    UrlFetchApp.fetch(url, options);
  } catch (e) {
    Logger.log("Error sending LINE message: " + e);
  }
}

/**
 * จัดรูปแบบวันที่เป็น YYYY-MM-DD
 * @param {Date} date - Object วันที่
 * @returns {string} วันที่ในรูปแบบ "YYYY-MM-DD"
 */
function formatDate(date) {
  return Utilities.formatDate(date, "Asia/Bangkok", "yyyy-MM-dd");
}