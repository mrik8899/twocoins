import React from 'react';

interface StatCardProps {
  icon: React.ElementType; // Accepts any icon component
  title: string;
  value: string;
  change: string;
  positive: boolean | null; // true = up (yellow), false = down (red), null = neutral
}

const StatCard = ({ icon: Icon, title, value, change, positive }: StatCardProps) => {
  // Decide color based on change direction
  const changeColorClass =
    positive === true
      ? 'text-yellow-400 dark:text-yellow-400'  // Positive = yellow
      : positive === false
      ? 'text-red-400 dark:text-red-400'        // Negative = red
      : 'text-slate-400 dark:text-slate-400';   // Neutral = gray

  // Add arrow icon based on trend direction
  const changeIcon =
    positive === true ? '↑'
    : positive === false ? '↓'
    : '';

  return (
    <div className="bg-white/80 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-300 dark:border-slate-700/50 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
        <h3 className="text-xl font-bold text-black dark:text-white">{title}</h3>
      </div>
      <p className="text-4xl font-extrabold text-black dark:text-white mb-2">{value}</p>
      <p className={`text-lg font-semibold ${changeColorClass}`}>
        {changeIcon} {change}
      </p>
    </div>
  );
};

export default StatCard;
