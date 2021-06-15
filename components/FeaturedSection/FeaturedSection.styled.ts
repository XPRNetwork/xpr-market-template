import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import customizationJson from '../../custom/customization';

const { typography } = customizationJson;

export const FeaturedSectionContainer = styled.section<{
  backgroundColor: string;
}>`
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const FeaturedSectionWrapper = styled(MaxWidth).attrs({ as: 'section' })`
  padding: 60px 0;
  display: flex;
  flex-direction: column;
`;

export const HeadingText = styled.h2<{ type: string; color: string }>`
  text-align: center;
  margin-bottom: 60px;
  font-family: ${(props) => typography[props.type].font};
  font-weight: ${(props) => typography[props.type].fontWeight};
  font-size: ${(props) => typography[props.type].size};
  color: ${(props) => props.color};
`;
