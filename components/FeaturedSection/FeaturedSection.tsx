import { FC, ReactNode } from 'react';
import { FeaturedSectionWrapper } from './FeaturedSection.styled';

type FeaturedSectionProps = {
  children: ReactNode,
};

export const FeaturedSection: FC<FeaturedSectionProps> = ({ children }) => {
  return (
    <FeaturedSectionWrapper>
      {children}
    </FeaturedSectionWrapper>
  )
};