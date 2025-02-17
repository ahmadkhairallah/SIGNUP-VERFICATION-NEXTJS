import React, { useState, useEffect } from "react";
import styles from "./styles/passwordStrength.module.css";

type PasswordStrengthProps = {
  password: string; // ✅ تعريف `password` كمُدخل (prop)
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const [strength, setStrength] = useState("");

  useEffect(() => {
    checkStrength(password);
  }, [password]);

  const checkStrength = (password: string) => {
    if (password.length < 6) {
      setStrength("ضعيف");
    } else if (password.length < 10) {
      setStrength("متوسط");
    } else {
      setStrength("قوي");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles[strength]}>{strength}</p>
    </div>
  );
};

export default PasswordStrength;
