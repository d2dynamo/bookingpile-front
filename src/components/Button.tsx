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
      className={`bg-black text-white py-2 px-8 rounded-md cursor-pointer mx-10 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
