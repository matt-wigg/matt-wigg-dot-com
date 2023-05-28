'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ContentCard from './ContentCard/ContentCard';

const Testimonials = () => {
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
        'I have worked with Matthew on several software engineering projects and he was an invaluable teammate on each one. His strong technical and organization skills lead us to rely on him for multiple services in a service-oriented architecture.',
    },
  ];

  return (
    <ContentCard
      show={false}
      title='Testimonials'
      content={
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          interval={4000}
          showArrows={false}
          showIndicators={true}
          className='custom-carousel'
        >
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <p className='font-light italic text-gray-500 dark:text-gray-400 pb-4'>
                &quot;{testimonial.testimonial}&quot;
              </p>
              <p className='text-gray-900 dark:text-gray-300 font-semibold mb-1'>
                {testimonial.name}
              </p>
              <p className='text-gray-500 dark:text-gray-400 font-extralight mb-12'>
                {testimonial.position}, {testimonial.company}
              </p>
            </div>
          ))}
        </Carousel>
      }
    />
  );
};

export default Testimonials;
