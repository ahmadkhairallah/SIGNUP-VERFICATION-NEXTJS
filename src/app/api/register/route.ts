import { NextResponse } from "next/server";
import { z } from "zod";
import { sendOTPEmail } from "@/services/emailService";

// مخزن مؤقت لـ OTP
const otpStore = new Map<string, string>();

const registerSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون على الأقل 3 أحرف"),
  email: z.string().email("يجب إدخال بريد إلكتروني صحيح"),
  password: z.string().min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 البيانات المستلمة في API:", body);

  
    const parsedBody = registerSchema.safeParse(body);
    if (!parsedBody.success) {
      console.error("❌ خطأ في البيانات:", parsedBody.error);
      return NextResponse.json({ error: "البيانات غير صحيحة", details: parsedBody.error }, { status: 400 });
    }

    const { email } = parsedBody.data;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // تخزين OTP
    otpStore.set(email, otp);
    console.log(`📧 تم تخزين OTP: ${otp}`);

 
    try {
      console.log(`📤 محاولة إرسال OTP إلى ${email}`);
      await sendOTPEmail(email, otp);
      console.log("✅ تم إرسال OTP بنجاح!");
    } catch (emailError: unknown) { 
      console.error("❌ خطأ أثناء إرسال البريد الإلكتروني:", emailError);

  
      const errorMessage = emailError instanceof Error ? emailError.message : "حدث خطأ غير معروف أثناء إرسال البريد الإلكتروني";

      return NextResponse.json({ error: "فشل إرسال البريد الإلكتروني", details: errorMessage }, { status: 500 });
    }

    return NextResponse.json({ message: "تم التسجيل بنجاح! تحقق من بريدك الإلكتروني." }, { status: 201 });
  } catch (error: unknown) { 
    console.error("❌ خطأ غير متوقع في API:", error);

    const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء معالجة الطلب";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
