"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import EmailVerification from "@/components/organisms/EmailVerification";

const EmailVerificationPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  if (!email) {
    return <p>البريد الإلكتروني غير متوفر. الرجاء العودة إلى صفحة التسجيل.</p>;
  }

  return <EmailVerification email={email} />;
};

export default EmailVerificationPage;
