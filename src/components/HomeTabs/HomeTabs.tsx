'use client';

import React, { useRef, useState, useEffect } from 'react';
import TabContent from './TabContent';

type TabName = 'introduction' | 'skills' | 'experience';

const useActiveTabIndicator = (initialTab: TabName = 'introduction') => {
  const [activeTab, setActiveTab] = useState<TabName>(initialTab);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const tabNameToIndex: Record<TabName, number> = {
      introduction: 0,
      skills: 1,
      experience: 2,
    };
    const activeTabIndex = tabNameToIndex[activeTab];
    const { offsetLeft, offsetWidth } = tabRefs.current[activeTabIndex];
    setIndicatorStyle({
      left: `${offsetLeft}px`,
      width: `${offsetWidth}px`,
    });
  }, [activeTab, tabRefs]);

  return { activeTab, setActiveTab, tabRefs, indicatorStyle };
};

const HomeTabs = () => {
  const { activeTab, setActiveTab, tabRefs, indicatorStyle } =
    useActiveTabIndicator();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('Loading...');

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentHour = currentTime.getHours();
    if (currentHour < 12) {
      setGreeting('Good morning ⋆⁺₊⋆ ☀︎ ⋆⁺₊⋆ ');
    } else if (currentHour < 18) {
      setGreeting('Good afternoon ⋆｡˚ ☁︎ ˚｡⋆｡˚☽˚｡⋆');
    } else {
      setGreeting('Good evening ⋆⁺₊⋆ ☾⋆⁺₊⋆');
    }
  }, [currentTime]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === '1') {
      setActiveTab('introduction');
    } else if (event.key === '2') {
      setActiveTab('skills');
    } else if (event.key === '3') {
      setActiveTab('experience');
    }
  };

  return (
    <section className='container px-4 flex'>
      <div className='h-fit bg-white dark:bg-zinc-950 rounded-lg shadow-md border border-gray-800 w-full'>
        <div className='flex mb-4 relative py-4 px-4 sm:px-6 justify-start'>
          <div
            className='absolute left-0 bottom-0 bg-yellow-400 h-1 rounded-full transition-all duration-300 ease-in-out'
            style={indicatorStyle}
          />
          {['introduction', 'skills'].map((tab, index) => (
            <button
              key={tab}
              ref={(el) => {
                if (el) {
                  tabRefs.current[index] = el;
                }
              }}
              className={`bg-white dark:bg-zinc-950 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-4 py-2 mr-4 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm font-medium ${
                activeTab === tab
                  ? 'text-gray-900 dark:text-yellow-400 dark:hover:text-yellow-400'
                  : 'text-gray-500 dark:text-yellow-400'
              }`}
              id={tab}
              onClick={() => setActiveTab(tab as TabName)}
            >
              <span
                className={`inline-block text-white dark:text-gray-400 rounded px-2 py-1 text-xs mr-3 transition duration-150 ease-in-out bg-gray-500 dark:bg-gray-700`}
              >
                {index + 1}.
              </span>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
            </button>
          ))}
        </div>
        <div className='transition-all duration-300 ease-in-out border-t border-gray-200 dark:border-gray-700 min-w-full text-gray-200'>
          <TabContent activeTab={activeTab} greeting={greeting} />
        </div>
      </div>
    </section>
  );
};

export default HomeTabs;