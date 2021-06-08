import styled from 'styled-components';
import customizationJson from '../../custom/customization';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { breakpoint } from '../../styles/Breakpoints';

const { typography, header } = customizationJson;
const {
  imagePlacement,
  backgroundColor,
  highlightFont,
  mainHeadingFont,
  subheadingFont,
  button,
} = header;

export const HeaderContainer = styled.div`
  background-color: ${backgroundColor || 'blue'};

  ${breakpoint.tablet`
    margin-top: 30px;
  `}
`;

export const HeaderContent = styled(MaxWidth)`
  display: flex;
  flex-direction: ${imagePlacement === 'right' ? 'row' : 'row-reverse'};
  height: 640px;
  padding-top: 12px;

  ${breakpoint.tablet`
    padding-top: 0;
    flex-direction: column;
    height: 100%;
  `}
`;

export const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${header.imagePlacement === 'right' ? 'flex-start' : 'flex-end'};
  text-align: ${header.imagePlacement === 'right' ? 'left' : 'right'};
  line-height: 1.78;

  ${breakpoint.tablet`
    text-align: left;
    align-items: flex-start;
  `}
`;

export const ImageContainer = styled.div`
  flex: 1;

  img {
    width: 100%;
    height: 100%;
  }

  ${breakpoint.tablet`
    margin-top: 30px;
  `}
`;

export const HighlightText = styled.h3`
  display: ${highlightFont.isShown ? 'block' : 'none'};
  color: ${highlightFont.color};
  font-family: ${typography[highlightFont.type].font};
  font-size: ${typography[highlightFont.type].size};
  font-weight: ${typography[highlightFont.type].fontWeight};
  margin-bottom: 8px;

  ${breakpoint.mobile`
    font-size: 12px;
  `}
`;

export const HeaderText = styled.h1`
  color: ${mainHeadingFont.color};
  font-family: ${typography[mainHeadingFont.type].font};
  font-size: ${typography[mainHeadingFont.type].size};
  font-weight: ${typography[mainHeadingFont.type].fontWeight};
  margin: 0;
  line-height: 1.25;

  ${breakpoint.tablet`
    font-size: 55px;
  `}

  ${breakpoint.mobile`
    font-size: 32px;
  `}
`;

export const SubHeaderText = styled.h2`
  color: ${subheadingFont.color};
  font-family: ${typography[subheadingFont.type].font};
  font-size: ${typography[subheadingFont.type].size};
  font-weight: ${typography[subheadingFont.type].fontWeight};
  margin-top: 16px;
  max-width: 550px;

  ${breakpoint.mobile`
    font-size: 14px;
    margin-top: 23px;
  `}
`;

export const ButtonWrapperAnchor = styled.a.attrs({
  href: button.link,
  target: '_blank',
  rel: 'noreferrer',
})`
  ${breakpoint.mobile`
    width: 100%;
  `}
`;

export const Button = styled.button`
  width: 208px;
  height: 56px;
  margin-top: 32px;
  display: ${button.isShown ? 'block' : 'none'};
  background-color: ${button.backgroundColor};
  font-family: ${typography[button.textFont].font};
  color: ${button.textColor};
  border: none;
  cursor: pointer;

  ${breakpoint.mobile`
    width: 100%;
    height: 32px;
    margin-top: 25px;
  `}
`;
