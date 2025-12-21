import fs from "fs"
import parseCsvEmails from "../util/csvParser.js"
import { sendMail } from "../util/mailServices.js"
export const sendCsvEmails = async (req, res) => {
    const { subject, message } = req.body;
    
    if (!req.file) {
        return res.status(400).json({
            message: "CSV file is required"
        });
    }

    try {
        const emails = await parseCsvEmails(req.file.path);
        
        for (const email of emails) {
            const username = email.split("@")[0];
            const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
            
            const emailTemplate = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            color: #333333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            text-align: center;
                            padding: 20px 0;
                            border-bottom: 2px solid #f0f0f0;
                            margin-bottom: 20px;
                        }
                        .logo {
                            font-size: 24px;
                            font-weight: bold;
                            color: #3b82f6;
                            margin-bottom: 10px;
                        }
                        .content {
                            padding: 20px 0;
                        }
                        .button {
                            display: inline-block;
                            padding: 12px 24px;
                            margin: 20px 0;
                            background-color: #3b82f6;
                            color: white !important;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: 500;
                        }
                        .contact-info {
                            margin-top: 20px;
                            font-size: 14px;
                        }
                        .contact-item {
                            margin: 5px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="logo">Avyakt-Ehsaas 🧘</div>
                    </div>
                    
                    <div class="content">
                        <p>Dear ${formattedName},</p>
                        
                        <p>${message.replace(/\n/g, '<br/>')}</p>
                        
                        <div class="contact-info">
                            <p>If you need any assistance or information, feel free to reach out to us:</p>
                            <div class="contact-item">📧 Email: amrit@avyaktehsaas.com</div>
                            <div class="contact-item">📱 WhatsApp: 8847825095</div>
                        </div>
                        
                        <p>We look forward to meditating with you!</p>
                        <div >
                            <p>Warm regards,<br>Team Avyakt Ehsaas</p>
                        </div>
                    </div>
                    
                </body>
                </html>
            `;

            await sendMail({
                to: email,
                subject: subject,
                html: emailTemplate
            });
            await new Promise(r => setTimeout(r, 700));
        }

        fs.unlinkSync(req.file.path);

        res.status(200).json({
            success: true,
            totalEmails: emails.length,
        });
    } catch (error) {
        console.error("Error sending emails:", error);
        res.status(500).json({ 
            error: "Failed to send emails",
            details: error.message 
        });
    }
};