import React from 'react';
import content from '../../data/content.json';
import { SkillsSection, SubSkills } from './SkillsSection';
import {
  CodeBracketIcon as CodeBracket,
  CircleStackIcon as CircleStack,
  PuzzlePieceIcon as PuzzlePiece,
  WrenchScrewdriverIcon as WrenchScrewdriver,
  ServerStackIcon as ServerStack,
} from '@heroicons/react/24/outline';

type TabContentProps = {
  activeTab: string;
  greeting: string;
};

type IconType = React.ComponentType<
  React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
>;

const iconMapping: { [key: string]: IconType } = {
  CodeBracketIcon: CodeBracket,
  CircleStackIcon: CircleStack,
  PuzzlePieceIcon: PuzzlePiece,
  WrenchScrewdriverIcon: WrenchScrewdriver,
  ServerStackIcon: ServerStack,
};

const TabContent: React.FC<TabContentProps> = ({ activeTab, greeting }) => {
  switch (activeTab) {
    case 'introduction':
      return (
        <div className='space-y-4 font-light p-8 dark:text-gray-400'>
          <p className='text-3xl py-2 font-medium text-gray-900 dark:text-gray-100'>
            {greeting}
          </p>
          <p>{content.introduction.welcome}</p>
          <ol className=' list-decimal list-inside pl-4'>
            {content.introduction.listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
          <p>{content.introduction.closing}</p>
        </div>
      );
    case 'skills':
      return (
        <div className='space-y-4 font-light p-8 dark:text-gray-400'>
          <p className='text-3xl py-2 font-medium text-gray-900 dark:text-gray-100'>
            My skills
          </p>
          <p>{content.skillsintroduction}</p>
          {content.skills.map((skillSection) => (
            <React.Fragment key={skillSection.title}>
              <SkillsSection
                title={skillSection.title}
                icon={iconMapping[skillSection.icon]}
              />
              <SubSkills skills={skillSection.skills} />
            </React.Fragment>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default TabContent;
