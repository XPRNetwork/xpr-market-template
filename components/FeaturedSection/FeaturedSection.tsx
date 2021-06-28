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
import {
  FeaturedSectionProps,
  Typography,
  NftCardProps,
} from '../../custom/customization';
import { Template } from '../../services/templates';

type Props = {
  featuredSectionStyles: FeaturedSectionProps;
  featuredSectionText: FeaturedSectionTextProps;
  nftCardStyles: NftCardProps;
  nftCardText: NftCardTextProps;
  templates: Template[];
  typography: Typography;
};

export const FeaturedSection: FC<Props> = ({
  featuredSectionStyles,
  featuredSectionText,
  nftCardStyles,
  nftCardText,
  templates,
  typography,
}) => (
  <FeaturedSectionContainer
    backgroundColor={featuredSectionStyles.backgroundColor}>
    <FeaturedSectionWrapper>
      {featuredSectionText && featuredSectionText.heading ? (
        <HeadingText
          {...featuredSectionStyles.titleFont}
          typography={typography}>
          {featuredSectionText.heading}
        </HeadingText>
      ) : null}
      {featuredSectionStyles.carousel ? (
        <FeaturedCarousel
          templates={templates}
          styles={featuredSectionStyles}
          nftCardText={nftCardText}
          nftCardStyles={nftCardStyles}
          typography={typography}
        />
      ) : (
        <FeaturedGrid
          templates={templates}
          nftCardText={nftCardText}
          nftCardStyles={nftCardStyles}
          typography={typography}
          type="featured"
        />
      )}
    </FeaturedSectionWrapper>
  </FeaturedSectionContainer>
);
