'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ContentCardHeader from './ContentCardHeader';
import ContentCardContent from './ContentCardContent';

interface ContentCardProps {
  show: boolean;
  title: string;
  content: React.ReactNode;
}

const ContentCardContainer: React.FC<ContentCardProps> = ({
  show,
  title,
  content,
}) => {
  const [contentVisible, setContentVisible] = useState(show);

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };
  return (
    <div>
      <ContentCardHeader
        toggleContentVisibility={toggleContentVisibility}
        contentVisible={contentVisible}
        title={title}
      />
      {contentVisible && <ContentCardContent content={content} />}
    </div>
  );
};

ContentCardContainer.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default ContentCardContainer;
