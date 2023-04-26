import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/ThemeContext';
import Button from './Button';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className='dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start w-full dark:hover:text-yellow-400 '
    >
      {isDark ? (
        <SunIcon className='h-6 w-6 text-yellow-400' />
      ) : (
        <MoonIcon className='h-6 w-6 text-yellow-400' />
      )}
      <span className='ml-4'>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </Button>
  );
};

export default ThemeToggle;
