import React, { useState, useEffect } from "react";
import styles from "./styles/resendOtp.module.css";

const ResendOtp = ({ resendOtp }: { resendOtp: () => void }) => {
  const [timer, setTimer] = useState(30);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setDisabled(false);
    }
  }, [timer]);

  return (
    <button 
      className={styles.resendButton} 
      onClick={() => { resendOtp(); setTimer(30); setDisabled(true); }} 
      disabled={disabled}
    >
      {disabled ? `إعادة الإرسال بعد ${timer} ثانية` : "إعادة إرسال OTP"}
    </button>
  );
};

export default ResendOtp;
