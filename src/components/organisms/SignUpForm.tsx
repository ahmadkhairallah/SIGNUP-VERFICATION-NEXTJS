"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "@/services/authAPI";
import FormFields from "../molecules/FormFields";
import SubmitButton from "../molecules/SubmitButton";
import PasswordStrength from "../molecules/PasswordStrength";

const SignUpForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    console.log("📤 بيانات المستخدم قبل الإرسال:", data);

    if (!data.name || !data.email || !data.password) {
      console.error("❌ خطأ: البيانات غير مكتملة");
      setError("جميع الحقول مطلوبة.");
      setLoading(false);
      return;
    }

    try {
      await registerUser(data);
      alert("تم التسجيل بنجاح! تحقق من بريدك الإلكتروني.");
      window.location.href = `/email-verification?email=${data.email}`;
    } catch (err: any) {
      console.error("❌ خطأ في التسجيل:", err.response?.data);
      setError(err.response?.data?.error || "حدث خطأ أثناء التسجيل.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFields label="الاسم" type="text" name="name" placeholder="أدخل اسمك" register={register} errors={errors} />
      <FormFields label="البريد الإلكتروني" type="email" name="email" placeholder="أدخل بريدك الإلكتروني" register={register} errors={errors} />
      <FormFields label="كلمة المرور" type="password" name="password" placeholder="أدخل كلمة المرور" register={register} errors={errors} />
      <PasswordStrength password={watch("password")} /> {/* ✅ تمرير `password` كمُدخل (`prop`) */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <SubmitButton text={loading ? "جارٍ التسجيل..." : "تسجيل"} onClick={() => {}} />
    </form>
  );
};

export default SignUpForm;
