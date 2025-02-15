import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  path: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  path,
  name,
  onClick,
  className = '',
}) => {
  return (
    <Link
      href={path}
      onClick={onClick}
      className={`bg-black text-white py-2 px-8 rounded-lg cursor-pointer text-center mx-10 ${className}`}
    >
      {name}
    </Link>
  );
};

export default Button;
