'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const InteractiveTimelineCard = () => {
  const [contentVisible, setContentVisible] = useState(true);

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };

  const timelineData = [
    {
      date: '2021 - Present',
      title: 'Software Engineer II',
      company: 'HTLF',
      country: '🇺🇸',
    },
    {
      date: '2020 - 2021',
      title: 'Software Engineer',
      company: 'Freelance / Contract',
      country: '🇺🇸',
    },
    {
      date: '2020 - 2020',
      title: 'Advanced Software Engineering',
      company: 'Hack Reactor',
      country: '🇺🇸',
    },
    {
      date: '2013 - 2019',
      title: 'Director of Ecommerce',
      company: 'Firespares / Stove Supermarket',
      country: '🇬🇧',
    },
    {
      date: '2008 - 2010',
      title: 'FdA in Graphic Design',
      company: 'University of the Arts London',
      country: '🇬🇧',
    },
  ];

  return (
    <section className='container px-4 flex flex-col text-sm'>
      <article className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800'>
        <header
          onClick={toggleContentVisibility}
          className='group p-4 sm:px-6 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900'
        >
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 group-hover:text-yellow-400 dark:group-hover:text-yellow-400'>
              Professional Timeline
            </h3>
          </div>
          <Button>
            <ChevronDownIcon
              className={`h-4 w-4 transform transition duration-300 ${
                contentVisible ? 'text-yellow-400' : 'rotate-180'
              }`}
            />
          </Button>
        </header>
        {contentVisible && (
          <div className='border-t border-gray-700 dark:border-gray-700 p-4 sm:px-6'>
            <ul className='space-y-4'>
              {timelineData.map((item, index) => (
                <li key={index}>
                  <div className='flex justify-between items-start'>
                    <div className='flex items-center space-x-4'>
                      <div>
                        <p className='text-gray-900 dark:text-gray-300 font-semibold'>
                          {item.title}
                        </p>
                        <p className='text-gray-500 dark:text-gray-400 font-extralight'>
                          {item.company}
                          <span className='ml-2 text-lg'>{item.country}</span>
                        </p>
                      </div>
                    </div>
                    <span className='text-gray-600 dark:text-gray-400 font-extralight'>
                      {item.date}
                    </span>
                  </div>
                  {/* <hr className='my-3 border-gray-300 dark:border-gray-700' /> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </section>
  );
};

export default InteractiveTimelineCard;
