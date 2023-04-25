import React from 'react';
import Link from 'next/link';

type SkillsSectionProps = {
  title: string;
  icon: React.ComponentType<any>;
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  title,
  icon,
}) => (
  <div className='flex align-middle text-yellow-400'>
    {React.createElement(icon, { className: 'h-6 w-6 mr-2 mt-1' })}
    <Link href={`#${title.toLowerCase()}`}>
      <span className='font-medium text-xl' id={`${title.toLowerCase()}`}>
        {title}
      </span>
    </Link>
  </div>
);

type SubSkillsProps = {
  skills: string[];
};

export const SubSkills: React.FC<SubSkillsProps> = ({ skills }) => (
  <ul className='list-disc list-inside pl-4'>
    {skills.map((skill, index) => (
      <li key={index}>{skill}</li>
    ))}
  </ul>
);
