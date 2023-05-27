import PropTypes from 'prop-types';

const ContentCardContent = ({ content }: { content: React.ReactNode }) => {
  return (
    <div className='border-t p-5 sm:p-6 font-light text-gray-700 dark:text-gray-400 border-gray-700'>
      {content}
    </div>
  );
};

ContentCardContent.propTypes = {
  content: PropTypes.node.isRequired,
};

export default ContentCardContent;
