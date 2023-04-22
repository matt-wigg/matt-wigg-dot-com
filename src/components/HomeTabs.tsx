'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  CodeBracketIcon,
  CircleStackIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

type TabName =
  | 'introduction'
  | 'skills'
  | 'experience'
  | 'education'
  | 'testimonials';

const useActiveTabIndicator = (initialTab: TabName = 'introduction') => {
  const [activeTab, setActiveTab] = useState<TabName>(initialTab);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const tabNameToIndex: Record<TabName, number> = {
      introduction: 0,
      skills: 1,
      experience: 2,
      education: 3,
      testimonials: 4,
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
      setGreeting('Good morning ☀️');
    } else if (currentHour < 18) {
      setGreeting('Good afternoon 🌤️');
    } else {
      setGreeting('Good evening 🌙');
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
    } else if (event.key === '4') {
      setActiveTab('education');
    } else if (event.key === '5') {
      setActiveTab('testimonials');
    }
  };

  const TabContent = () => {
    switch (activeTab) {
      case 'introduction':
        return (
          <div className='space-y-4 text-lg font-light pl-4 '>
            <p className='text-2xl font-bold pt-2'>{greeting}</p>
            <p>Welcome to my website.</p>
            <p>About me: </p>
            <ul className='list-disc list-inside pl-4'>
              <li>My name is Matthew Wigglesworth.</li>
              <li>I&apos;m a full-stack software engineer.</li>
              <li>I&apos;m from England.</li>
              <li>I live in San Diego with my wife.</li>
              <li>I like hiking, camping, surfing, and Leeds United.</li>
              <li>I want a dog.</li>
            </ul>
          </div>
        );
      case 'skills':
        return (
          <div className='space-y-4 text-lg font-light pl-4'>
            <p className='text-2xl font-bold pt-2'>Skills.</p>
            <div className='flex align-middle'>
              <CodeBracketIcon className='h-6 w-6 mr-2 text-white' />
              <p className='font-medium'>Languages</p>
            </div>
            <ul className='list-disc list-inside pl-4'>
              <li>TypeScript (React, Next.js, Node.js, Express.js)</li>
              <li>Python (Flask, Django, Jupyter)</li>
              <li>HTML</li>
              <li>CSS (Tailwind, Materialize, SASS, Bootstrap)</li>
              <li>
                <span className=' text-sm'>English (ha..!)</span>
              </li>
            </ul>
            <div className='flex align-middle'>
              <CircleStackIcon className='h-6 w-6 mr-2 text-white' />
              <p className='font-medium'>Databases</p>
            </div>
            <ul className='list-disc list-inside pl-4'>
              <li>SQL (PostgreSQL)</li>
              <li>NoSQL (MongoDB)</li>
            </ul>
            <div className='flex align-middle'>
              <ClipboardDocumentIcon className='h-6 w-6 mr-2 text-white' />
              <p className='font-medium'>Project Management</p>
            </div>
            <ul className='list-disc list-inside pl-4'>
              <li>Programming languages: JavaScript, Python, Java, C++</li>
              <li>Web development: HTML, CSS, React, Angular, Node.js</li>
              <li>Database management: SQL, NoSQL, PostgreSQL, MongoDB</li>
              <li>Version control systems: Git, GitHub, GitLab, Bitbucket</li>
              <li>
                Project management & collaboration: Agile methodologies, Scrum,
                Jira, Trello
              </li>
            </ul>
          </div>
        );
      case 'experience':
        // Add your experience content here
        return <p>This is the Experience tab content...</p>;
      case 'education':
        // Add your education content here
        return <p>This is the Education tab content...</p>;
      case 'testimonials':
        // Add your testimonials content here
        return <p>This is the Testimonials tab content...</p>;
      default:
        return null;
    }
  };

  return (
    <div className='bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-md w-fit border border-gray-800'>
      <div className='flex space-x-4 mb-4 relative'>
        <div
          className='absolute left-0 -bottom-2 bg-yellow-400 h-1 rounded-full transition-all duration-300 ease-in-out'
          style={indicatorStyle}
        />
        {[
          'introduction',
          'skills',
          'experience',
          'education',
          'testimonials',
        ].map((tab, index) => (
          <button
            key={tab}
            ref={(el) => {
              if (el) {
                tabRefs.current[index] = el;
              }
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === tab
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-500'
            }`}
            onClick={() => setActiveTab(tab as TabName)}
          >
            <span
              className={`inline-block text-white dark:text-gray-300 rounded px-2 py-0.5 text-xs mr-2 transition duration-150 ease-in-out  ${
                activeTab === tab
                  ? 'bg-gray-200 bg-gray-500 dark:bg-gray-700'
                  : 'bg-gray-400 bg-gray-300 dark:bg-gray-800'
              }`}
            >
              {index + 1}
            </span>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
          </button>
        ))}
      </div>
      <div className='transition-all duration-300 ease-in-out'>
        <TabContent />
      </div>
    </div>
  );
};

export default HomeTabs;
