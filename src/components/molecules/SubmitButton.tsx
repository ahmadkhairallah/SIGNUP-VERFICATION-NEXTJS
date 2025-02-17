import React from "react";
import Button from "../atoms/Button";

type SubmitButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick, disabled }) => {
  return <Button text={text} onClick={onClick} disabled={disabled} />;
};

export default SubmitButton;
