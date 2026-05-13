import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@svnitacm.in";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@svnitacm.in";

export async function sendEventRegistrationConfirmation({
  to,
  name,
  eventTitle,
  eventDate,
  eventLocation,
}: {
  to: string;
  name: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Registration Confirmed: ${eventTitle} — SVNIT ACM`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="background:#020408;color:#F0F4FF;font-family:'DM Sans',sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="color:#00D4FF;font-size:24px;font-weight:700;margin:0;">SVNIT ACM</h1>
              <p style="color:#6B7FA3;margin:8px 0 0;">Student Chapter</p>
            </div>
            <div style="background:#0D1117;border:1px solid rgba(0,212,255,0.15);border-radius:16px;padding:32px;">
              <h2 style="color:#F0F4FF;font-size:20px;margin:0 0 16px;">Registration Confirmed! 🎉</h2>
              <p style="color:#9EB3CC;margin:0 0 24px;">Hey ${name}, you're registered for:</p>
              <div style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.2);border-radius:12px;padding:20px;margin-bottom:24px;">
                <h3 style="color:#00D4FF;font-size:18px;margin:0 0 12px;">${eventTitle}</h3>
                <p style="color:#9EB3CC;margin:0 0 8px;">📅 ${eventDate}</p>
                <p style="color:#9EB3CC;margin:0;">📍 ${eventLocation}</p>
              </div>
              <p style="color:#9EB3CC;margin:0;">We'll send more details closer to the event. See you there!</p>
            </div>
            <p style="text-align:center;color:#3D4F6E;font-size:12px;margin-top:24px;">SVNIT ACM Student Chapter · Surat, Gujarat</p>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Failed to send registration confirmation email:", error);
  }
}

export async function sendContactFormNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="background:#0D1117;color:#F0F4FF;font-family:sans-serif;padding:32px;border-radius:16px;max-width:600px;">
          <h2 style="color:#00D4FF;margin:0 0 20px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background:#020408;border-radius:8px;padding:16px;margin-top:16px;">
            <p style="margin:0;white-space:pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact form notification:", error);
  }
}

export async function sendNewsletterConfirmation({ to }: { to: string }) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Welcome to SVNIT ACM Newsletter",
      html: `
        <div style="background:#020408;color:#F0F4FF;font-family:sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="color:#00D4FF;font-size:24px;font-weight:700;">SVNIT ACM</h1>
          </div>
          <div style="background:#0D1117;border:1px solid rgba(0,212,255,0.15);border-radius:16px;padding:32px;text-align:center;">
            <h2 style="color:#F0F4FF;margin:0 0 16px;">You're subscribed! 🚀</h2>
            <p style="color:#9EB3CC;margin:0;">You'll receive updates on events, workshops, and opportunities from SVNIT ACM Chapter.</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send newsletter confirmation:", error);
  }
}

export async function sendMembershipConfirmation({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Membership Application Received — SVNIT ACM",
      html: `
        <div style="background:#020408;color:#F0F4FF;font-family:sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;">
          <div style="background:#0D1117;border:1px solid rgba(0,212,255,0.15);border-radius:16px;padding:32px;">
            <h2 style="color:#00D4FF;margin:0 0 16px;">Application Received, ${name}!</h2>
            <p style="color:#9EB3CC;margin:0 0 16px;">Thank you for applying to join SVNIT ACM. Our team will review your application and get back to you within 3-5 working days.</p>
            <p style="color:#9EB3CC;margin:0;">In the meantime, follow us on Instagram and LinkedIn for updates!</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send membership confirmation:", error);
  }
}
