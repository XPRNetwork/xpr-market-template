import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import customizationJson from '../../custom/customization';

const { featuredSection, typography } = customizationJson;
const { titleFont, backgroundColor } = featuredSection;
export const FeaturedSectionContainer = styled.section`
  width: 100%;
  background-color: ${backgroundColor};
`;

export const FeaturedSectionWrapper = styled(MaxWidth).attrs({ as: 'section' })`
  padding: 60px 0;
  display: flex;
  flex-direction: column;
`;

export const HeadingText = styled.h2`
  text-align: center;
  margin-bottom: 60px;
  font-family: ${typography[titleFont.type].font};
  font-weight: ${typography[titleFont.type].fontWeight};
  font-size: ${typography[titleFont.type].size};
  color: ${titleFont.color};
`;
