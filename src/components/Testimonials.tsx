'use client';

import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const Testimonials = () => {
  const [contentVisible, setContentVisible] = useState(false);

  const testimonials = [
    {
      name: 'Chris Starkie',
      position: 'Graphic Designer',
      company: 'William Hill.',
      testimonial:
        'Matt is a rare talent that is a genuine asset to any company. Adept at efficiently learning and mastering new skills while not compromising on quality or user/customer experience, he is a great communicator and consummate professional.',
    },
    {
      name: 'Brennan Caldwell',
      position: 'Director, Engineering & Technology',
      company: 'Blokhaus.',
      testimonial:
        'Matthew is an ideal collaborator. His steadiness and intelligence enhanced every project we worked on together -- and his sense of humor made even the most frustrating moments a delight.',
    },
    {
      name: 'Blake Jones',
      position: 'Software Engineer',
      company: 'Social Solutions.',
      testimonial:
        'I had the pleasure of working with Matthew during my time at Hack Reactor. Matthew was a great pair programmer and made sure to thoroughly think through the problem we were tackling before getting into coding.',
    },
    {
      name: 'Andrew Yoder',
      position: 'Software Engineer',
      company: 'John Deere.',
      testimonial:
        'I have worked with Matthew on several software engineering projects and he was an invaluable teammate on each one. His strong technical and organization skills lead us to rely on him for the proxy that pulled together multiple services in a service-oriented architecture.',
    },
  ];

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };

  return (
    <section className='container px-4 flex flex-col max-w-3xl text-sm'>
      <article className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800'>
        <header
          onClick={toggleContentVisibility}
          className='group p-4 sm:px-6 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900'
        >
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 group-hover:text-yellow-400 dark:group-hover:text-yellow-400'>
              Testimonials
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
          <div className='border-t border-gray-700 dark:border-gray-700 py-2 sm:px-6'>
            <Carousel
              autoPlay
              infiniteLoop
              showStatus={false}
              showThumbs={false}
              interval={7000}
              showArrows={false}
              showIndicators={true}
              className='custom-carousel'
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className='p-4'>
                  <p className='font-light italic text-gray-500 dark:text-gray-400 pb-3'>
                    &quot;{testimonial.testimonial}&quot;
                  </p>
                  <p className='text-gray-900 dark:text-gray-300 font-semibold'>
                    {' '}
                    {/* Add mb-4 here */}
                    {testimonial.name}
                  </p>
                  <p className='text-gray-500 dark:text-gray-400 font-extralight mb-8'>
                    {' '}
                    {/* Add mb-4 here */}
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </article>
    </section>
  );
};

export default Testimonials;