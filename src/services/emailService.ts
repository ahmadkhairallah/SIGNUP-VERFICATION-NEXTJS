import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ تعطيل التحقق من الشهادة
  },
});

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  try {
    console.log(`📤 محاولة إرسال OTP إلى: ${email} - كود OTP: ${otp}`);

    const info = await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "كود التحقق الخاص بك",
      text: `كود التحقق هو: ${otp}`,
    });

    console.log(`✅ تم إرسال البريد بنجاح! معرف الرسالة: ${info.messageId}`);
  } catch (error: unknown) {
    console.error("❌ خطأ أثناء إرسال البريد الإلكتروني:", error);

    const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير معروف أثناء إرسال البريد الإلكتروني";
    throw new Error(`فشل إرسال البريد الإلكتروني: ${errorMessage}`);
  }
};
