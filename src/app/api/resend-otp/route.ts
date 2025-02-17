import { NextResponse } from "next/server";
import { sendOTPEmail } from "@/services/emailService";
import { otpStore } from "../register/route"; // استخدم نفس المخزن المؤقت

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: "البريد الإلكتروني مطلوب" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ تحديث `OTP` وإعادة تخزينه
    otpStore.set(email, otp);
    console.log(`🔄 إعادة إرسال OTP: ${otp} إلى ${email}`);

    await sendOTPEmail(email, otp);
    return NextResponse.json({ message: "تم إرسال OTP جديد!" }, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ أثناء إعادة إرسال OTP:", error);
    return NextResponse.json({ error: "تعذر إرسال OTP" }, { status: 500 });
  }
}
