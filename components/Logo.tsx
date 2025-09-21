
import React from 'react';

export const Logo: React.FC = () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
             <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 animate-pulse"></div>
        </div>
    </div>
);
