import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white py-2 px-4 rounded cursor-pointer self-end w-full"
    >
      <p className="text-center">{text}</p>
    </button>
  );
};

export default Button;
