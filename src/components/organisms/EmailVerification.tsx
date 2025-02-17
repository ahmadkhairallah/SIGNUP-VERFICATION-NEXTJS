"use client";
import React, { useState } from "react";
import { verifyOTP, resendOTP } from "@/services/authAPI";
import OtpInput from "../molecules/OtpInput";
import ResendOtp from "../molecules/ResendOtp";

type EmailVerificationProps = {
  email: string;
};

const EmailVerification: React.FC<EmailVerificationProps> = ({ email }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    try {
      await verifyOTP({ email, otp: otp.join("") });
      alert("تم التحقق بنجاح!");
      window.location.href = "/";
    } catch (err: any) {
      setError("OTP غير صحيح.");
    }
  };

  return (
    <div>
      <h1>تحقق من بريدك الإلكتروني</h1>
      <OtpInput otp={otp} setOtp={setOtp} />
      <button onClick={handleVerify}>تحقق</button>
      <ResendOtp resendOtp={() => resendOTP(email)} /> {/* ✅ تمرير `email` عند استدعاء `resendOTP` */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EmailVerification;
