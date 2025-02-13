import { JSX } from 'react';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  size?: string; // size in rem. Default: "1.5rem"
}

const getArrowSvg = (
  direction: 'left' | 'right',
  size: string = '1.5rem'
): JSX.Element => {
  if (direction === 'left') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Arrow stalk */}
        <line x1="20" y1="12" x2="8" y2="12" />
        {/* Chevron head */}
        <polyline points="12 16 8 12 12 8" />
      </svg>
    );
  } else {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Arrow stalk */}
        <line x1="4" y1="12" x2="16" y2="12" />
        {/* Chevron head */}
        <polyline points="12 8 16 12 12 16" />
      </svg>
    );
  }
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
  size = '1.5rem',
}) => {
  return (
    <button
      onClick={onClick}
      className="border border-black bg-inherit text-black w-7 h-7 mx-2 flex items-center justify-center rounded-full cursor-pointer"
    >
      {getArrowSvg(direction, size)}
    </button>
  );
};
