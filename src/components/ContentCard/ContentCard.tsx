import React from 'react';
import ContentCardContainer from '@/components/ContentCard/ContentCardContainer';
import { ContentCardProps } from '@/types/ContentCardTypes';

const ContentCard: React.FC<ContentCardProps> = ({ show, title, content }) => {
  return (
    <section className='container flex flex-col px-4 text-sm'>
      <article className='bg-white border shadow rounded-lg overflow-hidden border-gray-800 dark:bg-zinc-950'>
        <ContentCardContainer show={show} title={title} content={content} />
      </article>
    </section>
  );
};

export default ContentCard;
