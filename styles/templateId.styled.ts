// styled component for /pages/[templateId].tsx
import styled, { css } from 'styled-components';
import customizationJson from '../custom/customization';
import { breakpoint } from './Breakpoints';
import { MaxWidth } from './MaxWidth.styled';

const {
  typography,
  detailPage: { imagePlacement, button, errorFont },
} = customizationJson;

const buttonCSS = css`
  width: 100%;
  height: 56px;
  margin-top: 32px;
  padding: 0;
  background-color: ${button.backgroundColor};
  font-family: ${typography[button.textFont].font};
  color: ${button.textColor};
  border: none;
  cursor: pointer;

  ${breakpoint.tablet`
    font-size: 14px;
  `}
`;

export const NftPageContainer = styled(MaxWidth).attrs({ as: 'main' })`
  display: flex;
  justify-content: space-between;
  flex-direction: ${imagePlacement === 'left' ? 'row' : 'row-reverse'};
  padding: 76px 0;
  min-height: calc(100vh - 190px);

  ${breakpoint.tablet`
    padding: 32px 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  `}
`;

export const Button = styled.button`
  ${buttonCSS}
`;

export const ButtonLink = styled.a`
  ${buttonCSS}
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.p`
  color: ${errorFont.color};
  font-family: ${typography[errorFont.type].font};
  font-size: ${typography[errorFont.type].size};
  font-weight: ${typography[errorFont.type].fontWeight};
  margin-top: 32px;
`;
