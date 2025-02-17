import { otpStore } from "@/services/otpStore";
import { NextResponse } from "next/server";

// استخدام نفس `otpStore` لتخزين `OTP`
// import { otpStore } from "../register/route"; 

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!otpStore.has(email)) {
      return NextResponse.json({ error: "OTP غير موجود أو منتهي الصلاحية" }, { status: 400 });
    }

    if (otpStore.get(email) !== otp) {
      return NextResponse.json({ error: "OTP غير صحيح" }, { status: 400 });
    }

    otpStore.delete(email); // حذف OTP بعد الاستخدام
    return NextResponse.json({ message: "تم التحقق بنجاح!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطأ أثناء التحقق" }, { status: 500 });
  }
}
