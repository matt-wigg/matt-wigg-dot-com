'use client';

import React, { useRef, useState, useEffect } from 'react';
import TabContent from '@/components/HomeTabs/TabContent';
import ContentCard from '@/components/ContentCard/ContentCard';
import Button from '@/components/Button';

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '1') {
        setActiveTab('introduction');
      } else if (event.key === '2') {
        setActiveTab('skills');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setActiveTab]);

  return (
    <ContentCard
      show={true}
      title='Overview'
      content={
        <div>
          <div className='flex relative pb-4 justify-start text-base'>
            <div
              className='absolute left-0 bottom-0 bg-yellow-400 h-0.5 rounded-full transition-all duration-300 ease-in-out'
              style={indicatorStyle}
            />
            {['introduction', 'skills'].map((tab, index) => (
              <Button
                key={tab}
                ref={(el) => {
                  if (el) {
                    tabRefs.current[index] = el;
                  }
                }}
                className={`group mr-4 ${
                  activeTab === tab
                    ? ' text-yellow-400'
                    : ' dark:text-gray-100 dark:hover:text-yellow-400'
                }`}
                id={tab}
                onClick={() => setActiveTab(tab as TabName)}
              >
                <span
                  className={` text-white dark:text-gray-300 rounded px-2 text-sm mr-3 transition duration-150 ease-in-out bg-gray-400 dark:bg-gray-700 hidden md:inline`}
                >
                  {index + 1}.
                </span>
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </Button>
            ))}
          </div>

          <div className='transition-all duration-300 ease-in-out min-w-full text-gray-500 text-base'>
            <TabContent activeTab={activeTab} greeting={greeting} />
          </div>
        </div>
      }
    />
  );
};

export default HomeTabs;
