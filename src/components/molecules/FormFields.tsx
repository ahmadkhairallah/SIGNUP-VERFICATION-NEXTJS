import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./styles/formfields.module.css";

type FormFieldsProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: Record<string, any>;
};

const FormFields: React.FC<FormFieldsProps> = ({ label, type, name, placeholder, register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.formField}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.inputWrapper}>
        <input 
          {...register(name, { required: `${label} مطلوب` })} // ✅ تصحيح `register`
          id={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          className={errors[name] ? styles.inputError : styles.input} 
        />
        {type === "password" && (
          <button 
            type="button" 
            className={styles.togglePassword} 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️‍🗨️" : "🙈"}
          </button>
        )}
      </div>
      {errors[name] && <p className={styles.errorMessage}>{errors[name]?.message}</p>}
    </div>
  );
};

export default FormFields;
