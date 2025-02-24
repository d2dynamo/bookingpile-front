import React from 'react';
import Button from './Button';

interface ErrorAlertProps {
  title: string;
  description?: string;
  acknowledge: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title,
  description,
  acknowledge,
}) => {
  return (
    <div className="fixed bottom-4 right-4 animate-slide-up">
      <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 rounded shadow-lg">
        <div className="flex flex-col">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              {title}
            </h3>
            {description && (
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{description}</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={acknowledge} className="px-3 py-1 text-sm">
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
