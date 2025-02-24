import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  href: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  href,
  name,
  onClick,
  className = '',
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`bg-black text-white py-2 px-8 rounded-lg cursor-pointer text-center mx-10 ${className}`}
    >
      {name}
    </Link>
  );
};

export default Button;
