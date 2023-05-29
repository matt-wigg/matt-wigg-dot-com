'use client';

import React, { useState } from 'react';
import ContentCardHeader from '@/components/ContentCard/ContentCardHeader';
import ContentCardContent from '@/components/ContentCard/ContentCardContent';
import { ContentCardProps } from '@/types/ContentCardTypes';

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

export default ContentCardContainer;
