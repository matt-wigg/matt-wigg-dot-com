import { useState, useEffect, useRef } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(isDark);
  const owlAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsChecked(isDark);
  }, [isDark]);

  const handleToggle = () => {
    toggleTheme();
    owlAudioRef.current?.play();
  };

  return (
    <div className='flex items-center'>
      {isChecked ? (
        <SunIcon className={`h-6 w-6 text-yellow-400 mr-3`} />
      ) : (
        <SunIcon className={`h-6 w-6 text-gray-800 mr-3`} />
      )}
      <label htmlFor='theme-toggle' className='relative cursor-pointer'>
        <input
          id='theme-toggle'
          type='checkbox'
          className='sr-only'
          onChange={handleToggle}
          checked={isChecked}
        />
        <div
          className={`block w-14 h-6 bg-yellow-400 rounded-full shadow-inner ${
            isChecked ? 'bg-yellow-400' : ' bg-gray-800'
          }`}
        ></div>
        <div
          className={`${
            isChecked ? 'translate-x-8' : 'translate-x-0'
          } absolute inset-y-0 left-0 w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transition-all duration-300 ease-in-out transform-gpu scale-95 hover:scale-100 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-yellow-400`}
        ></div>
      </label>
      {isChecked ? (
        <MoonIcon className={`h-6 w-6 text-yellow-400 ml-3`} />
      ) : (
        <MoonIcon className={`h-6 w-6 text-gray-800 ml-3`} />
      )}
      <audio ref={owlAudioRef} src='/owl-sound.mp3' preload='auto'></audio>{' '}
    </div>
  );
};

export default ThemeToggle;
