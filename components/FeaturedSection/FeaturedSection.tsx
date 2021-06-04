import { FC } from 'react';
import { useLocaleContext } from '../Provider';
import { FeaturedSectionWrapper, FeaturedSectionContainer, HeadingText } from './FeaturedSection.styled';
import { FeaturedCarousel, FeaturedGrid } from '../../components';
import { Template } from '../../services/templates';
import localizationJson from '../../custom/localization';
import customizationJson from '../../custom/customization';
const { featuredSection } = customizationJson;

type FeaturedSectionProps = {
  templates: Template[],
};

export const FeaturedSection: FC<FeaturedSectionProps> = ({ templates }) => {
  const { locale, isLoadingLocale } = useLocaleContext();

  const text = Object.keys(localizationJson[locale]).length
  ? localizationJson[locale].featuredSection
  : localizationJson['en'].featuredSection;

  return (
    <FeaturedSectionContainer>
      <FeaturedSectionWrapper>
        <HeadingText>{text.heading}</HeadingText>
        { featuredSection.carousel ? <FeaturedCarousel templates={templates} /> : <FeaturedGrid templates={templates} /> }
      </FeaturedSectionWrapper>
    </FeaturedSectionContainer>
  )
};