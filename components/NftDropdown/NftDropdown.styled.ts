import styled, { css } from 'styled-components';
import customizationJson from '../../custom/customization';
import { Box } from '../../styles/index.styled';

const {
  typography,
  detailPage: {
    dropdown: { borderColor, textColor, textFont },
  },
} = customizationJson;

const inputCSS = css`
  font-size: ${typography[textFont].size};
  font-family: ${typography[textFont].font};
  font-weight: ${typography[textFont].fontWeight};
  color: ${textColor};
  border: 1px solid ${borderColor};
  margin: 64px 0 0;
  padding: 0 16px;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  line-height: 24px;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const Container = styled(Box)`
  position: relative;
`;

export const DisabledInput = styled.input`
  ${inputCSS}
`;

export const DropdownMenu = styled.select`
  ${inputCSS}
  cursor: pointer;
`;

export const StyledSvg = styled.svg`
  position: absolute;
  top: 75px;
  right: 15px;
  height: 500px;
  cursor: pointer;
`;
