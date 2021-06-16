import { FC } from 'react';
import {
  FeaturedSectionWrapper,
  FeaturedSectionContainer,
  HeadingText,
} from './FeaturedSection.styled';
import { FeaturedCarousel, FeaturedGrid } from '../../components';
import {
  NftCardTextProps,
  FeaturedSectionTextProps,
} from '../../custom/localization';
import { FeaturedSectionProps } from '../../custom/customization';
import { Template } from '../../services/templates';

type Props = {
  featuredSectionStyles: FeaturedSectionProps;
  featuredSectionText: FeaturedSectionTextProps;
  nftCardText: NftCardTextProps;
  templates: Template[];
};

export const FeaturedSection: FC<Props> = ({
  featuredSectionStyles,
  featuredSectionText,
  nftCardText,
  templates,
}) => {
  return (
    <FeaturedSectionContainer
      backgroundColor={featuredSectionStyles.backgroundColor}>
      <FeaturedSectionWrapper>
        <HeadingText {...featuredSectionStyles.titleFont}>
          {featuredSectionText.heading}
        </HeadingText>
        {featuredSectionStyles.carousel ? (
          <FeaturedCarousel
            templates={templates}
            styles={featuredSectionStyles}
            nftCardText={nftCardText}
          />
        ) : (
          <FeaturedGrid
            templates={templates}
            nftCardText={nftCardText}
            type="featured"
          />
        )}
      </FeaturedSectionWrapper>
    </FeaturedSectionContainer>
  );
};
