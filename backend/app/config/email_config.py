from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
from typing import List
import os
import logging

logger = logging.getLogger(__name__)

email_conf = ConnectionConfig(
    MAIL_USERNAME = "amsp604@gmail.com",
    MAIL_PASSWORD = "lnem vvlk syse rikz",
    MAIL_FROM = "amsp604@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True
)

fastmail = FastMail(email_conf)

async def send_disaster_alert(subscribers: List[dict], disaster_info: dict):
    failed_emails = []
    success_count = 0
    
    for subscriber in subscribers:
        try:
            message = MessageSchema(
                subject=f"Disaster Alert: {disaster_info['disaster_type']}",
                recipients=[subscriber['email']],
                body=f"""
                Dear {subscriber['name']},

                We want to inform you about a {disaster_info['disaster_type']} in {disaster_info['location']}.

                Details:
                Type: {disaster_info['disaster_type']}
                Location: {disaster_info['location']}
                Description: {disaster_info['description']}

                Stay safe and follow local authorities' instructions.

                Best regards,
                Disaster Alert Team
                """,
                subtype="plain"
            )
            
            await fastmail.send_message(message)
            success_count += 1
            logger.info(f"Alert sent successfully to {subscriber['email']}")
            
        except Exception as e:
            logger.error(f"Failed to send email to {subscriber['email']}: {str(e)}")
            failed_emails.append(subscriber['email'])
    
    return {
        "success_count": success_count,
        "failed_emails": failed_emails
    }