import React from "react";
// import styles from "./input.module.css";

type InputProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputProps> = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
  );
};

export default InputField;
