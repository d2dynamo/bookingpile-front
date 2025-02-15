import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-white py-2 px-6 rounded-2xl cursor-pointer mx-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
