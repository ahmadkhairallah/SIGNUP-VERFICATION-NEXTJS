"use client";
import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const EmailVerificationContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div>
      <h1>تحقق من بريدك الإلكتروني</h1>
      <p>تم إرسال كود التحقق إلى {email}. الرجاء إدخاله أدناه:</p>
    </div>
  );
};

const EmailVerificationPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EmailVerificationContent />
    </Suspense>
  );
};

export default EmailVerificationPage;
