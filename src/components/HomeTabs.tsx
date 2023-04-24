'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CodeBracketIcon,
  CircleStackIcon,
  PuzzlePieceIcon,
  WrenchScrewdriverIcon,
  ServerStackIcon,
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
      setGreeting('Good morning ☀');
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
    type SkillsSectionProps = {
      title: string;
      icon: React.ComponentType<any>;
    };

    const SkillsSection: React.FC<SkillsSectionProps> = ({ title, icon }) => (
      <div className='flex align-middle text-yellow-400'>
        {React.createElement(icon, { className: 'h-6 w-6 mr-2 mt-1' })}
        <Link href={`#${title.toLowerCase()}`}>
          <span className='font-medium text-xl' id={`${title.toLowerCase()}`}>
            {title}
          </span>
        </Link>
      </div>
    );

    const SubSkills = ({ skills }: { skills: string[] }) => (
      <ul className='list-disc list-inside pl-4'>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    );
    switch (activeTab) {
      case 'introduction':
        return (
          <div className='space-y-4 text-lg font-light p-4'>
            <p className='text-2xl font-bold'>{greeting}</p>
            <p>Welcome to my website!</p>
            <p>This is a place for you to: </p>
            <ol className=' list-decimal list-inside pl-4'>
              <li>Discover my portfolio of software engineering projects.</li>
              <li>Overview the technologies and tools I know.</li>
              <li>
                Delve into my professional experience, education, and
                accomplishments.
              </li>
              <li>
                Learn about my background, personal interests, and motivations.
              </li>
              <li>
                Reach out to me for collaborations, opportunities, or just a
                friendly chat.
              </li>
            </ol>
            <p>Feel free to explore and connect with me! \(oᴗo).</p>
          </div>
        );

      case 'skills':
        return (
          <div className='space-y-4 text-lg font-light p-4'>
            <p className='text-2xl font-bold'>Skills</p>
            <p>Here are some of the technologies I&apos;ve used:</p>

            <SkillsSection title='Languages' icon={CodeBracketIcon} />
            <SubSkills
              skills={[
                'JavaScript / TypeScript',
                'Python',
                'Java / Apex',
                'HTML & CSS',
                'Solidity / Michelson',
                'SQL',
                'Bash / Shell',
                'Markdown / LaTeX',
              ]}
            />

            <SkillsSection
              title='Frameworks/Libraries'
              icon={ServerStackIcon}
            />
            <SubSkills
              skills={[
                'React.js, Next.js, Node.js, Express.js, p5.js',
                'Tailwind, SASS, Bootstrap, Materialize, Less',
                'Flask, Django, Jupyter',
                'Lightning Web Components, Aura, Visualforce, SFDX',
                'Cyprus, Jest, Mocha, Chai, Selenium, Storybook',
                'Salesforce, Shopify, Okta',
              ]}
            />

            <SkillsSection title='Databases/Ledgers' icon={CircleStackIcon} />
            <SubSkills
              skills={[
                'PostgreSQL, MySQL, Microsoft SQL Server, SQLite',
                'MongoDB, Cassandra, Redis, Amazon DynamoDB',
                'Bitcoin, Ethereum, Solana, Tezos',
              ]}
            />

            <SkillsSection title='Tools/Apps' icon={WrenchScrewdriverIcon} />
            <SubSkills
              skills={[
                'Git, GitHub, GitLab, BitBucket',
                'Azure, AWS, Google Cloud Platform, Vercel',
                'Docker, Kubernetes, Nginx',
                'Jenkins, GitHub Actions, Circle CI',
                'Postman, New Relic, Sentry, Artillery',
                'Adobe Creative Suite, Figma, Sketch, Zeplin',
                'Workbench, Data Loader, Sonar, Flosum, AutoRABIT, Provar',
                'Jira, Confluence, Atlassian Access, ServiceNow',
              ]}
            />

            <SkillsSection
              title='Methodologies/Concepts'
              icon={PuzzlePieceIcon}
            />
            <SubSkills
              skills={[
                'Agile (Scrum / Kanban)',
                'DevOps (CI/CD)',
                'Test-driven development (TDD)',
                'Pair programming (PP)',
                'Object-oriented programming (OOP)',
                'Service-oriented architecture (SOA)',
              ]}
            />
          </div>
        );

      case 'experience':
        // Add your experience content here
        return <p>This is the Experience tab content...</p>;
      default:
        return null;
    }
  };

  return (
    <div className='h-fit bg-white dark:bg-zinc-950 rounded-lg shadow-md border border-gray-800 w-full'>
      <div className=' flex mb-4 relative py-4 px-6 justify-between'>
        <div
          className='absolute left-0 -bottom-2 bg-yellow-400 h-1 rounded-full transition-all duration-300 ease-in-out'
          style={indicatorStyle}
        />
        {['introduction', 'skills', 'experience'].map((tab, index) => (
          <button
            key={tab}
            ref={(el) => {
              if (el) {
                tabRefs.current[index] = el;
              }
            }}
            className={`bg-white dark:bg-zinc-950 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm font-medium ${
              activeTab === tab
                ? 'text-gray-900 dark:text-yellow-400 dark:hover:text-yellow-400'
                : 'text-gray-500 dark:text-gray-700'
            }`}
            id={tab}
            onClick={() => setActiveTab(tab as TabName)}
          >
            <span
              className={`inline-block text-white dark:text-gray-300 rounded px-2 py-1 text-xs mr-3 transition duration-150 ease-in-out bg-gray-500 dark:bg-gray-700`}
            >
              {index + 1}.
            </span>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
          </button>
        ))}
      </div>

      <div className='transition-all duration-300 ease-in-out border-t border-gray-200 dark:border-gray-700 mt-6 min-w-full'>
        <TabContent />
      </div>
    </div>
  );
};

export default HomeTabs;
