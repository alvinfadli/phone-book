import React from "react";

interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "submit" | "reset" | "button" | undefined;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  variant,
  type,
  icon,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-black text-white border border-black hover:bg-slate-800";
      case "secondary":
        return "bg-white text-slate-500 border border-slate-300 hover:bg-slate-100";
      default:
        return "";
    }
  };

  return (
    <button
      className={`flex py-1.5 text-sm justify-center items-center px-4 rounded-md font-medium shadow-md ${getVariantClasses()}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && (
        <span className="button-icon pr-1 flex justify-center items-center ">
          {icon}
        </span>
      )}
      {text}
    </button>
  );
};

export default Button;
