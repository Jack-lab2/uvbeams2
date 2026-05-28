const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "uvbeams",
  connectionLimit: 10,
});

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 587,
  secure: false, 
  auth: {
    user: "uvbeamsirc@gmail.com",
    pass: "qsxk zavk dwde bsnd", // Reminder: Move this to a .env file later!
  },
});

// 1. REGISTRATION ENDPOINT
app.post("/api/register", async (req, res) => {
  try {
    // 1. Destructure registration details
    const { first_name, last_name, email } = req.body; 
    
    // 2. Generate a secure 10-character temporary password string
    const temporaryPassword = crypto.randomBytes(5).toString("hex");

    // 3. Hash the temporary password
    const hash = await bcrypt.hash(temporaryPassword, 10);
    
    // FIX: Explicitly append NOW() timestamps directly into the target columns
    await db.execute(
      "INSERT INTO users (first_name, last_name, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [first_name, last_name, email, hash]
    );

    // 4. Construct email configuration
    const mailOptions = {
      from: '"International Research Conference" <uvbeamsirc@gmail.com>',
      to: email,
      subject: "Your Temporary Password - IRC 2026",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 450px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #16a34a; margin-top: 0;">Account Created!</h2>
          <p style="color: #4a5568; font-size: 15px;">Hello ${first_name},</p>
          <p style="color: #4a5568; line-height: 1.5;">Your account for the International Research Conference 2026 has been set up. Use the temporary password below to log in:</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #cbd5e0; padding: 16px; border-radius: 6px; text-align: center; margin: 20px 0;">
            <span style="font-size: 12px; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 5px;">Temporary Password</span>
            <code style="background: #e2e8f0; padding: 4px 10px; border-radius: 4px; font-size: 18px; color: #b91c1c; font-family: monospace; font-weight: bold;">${temporaryPassword}</code>
          </div>

          <p style="font-size: 12px; color: #718096; line-height: 1.4;">For security, please make sure to update your password in your profile settings immediately after logging in.</p>
        </div>
      `,
    };

    // 5. Send the email out
    await transporter.sendMail(mailOptions);

    res.status(201).json({ 
      message: "Account created! Check your email inbox for your temporary password." 
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(400).json({
      error: error.code === "ER_DUP_ENTRY" ? "Email already exists." : "Registration failed.",
    });
  }
});

// 2. LOGIN ENDPOINT (Updated to send back user info)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    
    if (rows.length > 0 && (await bcrypt.compare(password, rows[0].password_hash))) {
      // Pull out details to send back to React's AuthContext
      const loggedInUser = {
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
        email: rows[0].email
      };

      res.status(200).json({ 
        message: "Login successful!", 
        user: loggedInUser // <--- React will read this now!
      });
    } else {
      res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(8080, () => console.log("Server running on port 8080"));