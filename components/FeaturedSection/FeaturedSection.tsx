import { FC } from 'react';
import {
  FeaturedSectionWrapper,
  FeaturedSectionContainer,
  HeadingText,
} from './FeaturedSection.styled';
import { FeaturedCarousel } from '../FeaturedCarousel/FeaturedCarousel';
import { FeaturedGrid } from '../FeaturedGrid/FeaturedGrid';
import { Text } from '../../custom/localization';
import { FeaturedSectionProps } from '../../custom/customization';
import { Template } from '../../services/templates';

type Props = {
  styles: FeaturedSectionProps;
  text: Text;
  templates: Template[];
};

export const FeaturedSection: FC<Props> = ({ styles, text, templates }) => {
  return (
    <FeaturedSectionContainer backgroundColor={styles.backgroundColor}>
      <FeaturedSectionWrapper>
        <HeadingText {...styles.titleFont}>
          {text.featuredSection.heading}
        </HeadingText>
        {styles.carousel ? (
          <FeaturedCarousel templates={templates} styles={styles} />
        ) : (
          <FeaturedGrid templates={templates} type="featured" />
        )}
      </FeaturedSectionWrapper>
    </FeaturedSectionContainer>
  );
};
