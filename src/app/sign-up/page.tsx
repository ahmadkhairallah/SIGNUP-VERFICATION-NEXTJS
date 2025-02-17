import React from "react";
import AuthLayout from "@/components/templates/AuthLayout";
import SignUpForm from "@/components/organisms/SignUpForm";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <h1>تسجيل جديد</h1>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
