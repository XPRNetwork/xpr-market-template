import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import customizationJson from '../../custom/customization';

const { featuredSection } = customizationJson;

export const FeaturedSectionContainer = styled.section`
  width: 100%;
  background-color: ${featuredSection.backgroundColor};
`;

export const FeaturedSectionWrapper = styled(MaxWidth).attrs({ as: 'section' })`
  padding: 60px 0;
  display: flex;
  flex-direction: column;
`;

export const HeadingText = styled.h2`
  text-align: center;
  margin-bottom: 60px;
`;