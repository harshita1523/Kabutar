# Kabutar 🦅📨

**Mail-Pilot** is a real-time bulk email sender built using **Node.js**, **Express**, **Nodemailer**, and **WebSockets**. It allows users to upload an email **template** and an **Excel sheet** with recipients' data — then sends personalized emails in bulk and shows real-time delivery status on the UI.

Perfect for use-cases like campaigns, invites, or internal communication, with a smooth UX and efficient backend.

## 🚀 Features

- 📤 **Bulk Email Sending** using `nodemailer`
- 🧾 Upload **dynamic HTML templates** and **Excel files** (.xlsx) with user data
- 🧠 **Real-time delivery tracking** using WebSockets
- ⚡ **Connection pooling** for fast and optimized email sending
- 🔄 Graceful error handling and delivery status reporting
- 🎯 Field mapping between Excel columns and template variables
- 👁️ User-friendly UI built in React

## 📸 Demo


## 🛠️ Tech Stack

| Layer       | Technologies                 |
|------------|-------------------------------|
| Frontend   | React, tailwind css           |
| Backend    | Node.js, Express, Socket.IO   |
| Mailing    | Nodemailer with SMTP pooling  |
| File Handling | Multer, XLSX               |
| Utilities  | dotenv, cors, validator, etc. |

## 🧑‍💻 How It Works

1. **Upload Email Template**  
   Upload an HTML file with dynamic placeholders like `{{name}}`, `{{email}}`, etc.

2. **Upload Excel Sheet**  
   Upload a `.xlsx` file where columns match the placeholders in the template.

3. **Send Emails**  
   The server parses and merges data, then sends emails in bulk using a pooled SMTP connection.

4. **Track Status**  
   Live progress and delivery success/failure is shown on screen via WebSockets.

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/harshita1523/Kabutar.git
cd Mail-Pilot
