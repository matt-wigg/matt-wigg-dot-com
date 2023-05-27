import React from 'react';
import PropTypes from 'prop-types';
import ContentCardContainer from './ContentCardContainer';

interface ContentCardProps {
  show: boolean;
  title: string;
  content: React.ReactNode;
}

const ContentCard: React.FC<ContentCardProps> = ({ show, title, content }) => {
  return (
    <section className='container flex flex-col px-4 text-sm'>
      <article className='bg-white border shadow rounded-lg overflow-hidden border-gray-800 dark:bg-zinc-950'>
        <ContentCardContainer show={show} title={title} content={content} />
      </article>
    </section>
  );
};

ContentCard.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default ContentCard;
