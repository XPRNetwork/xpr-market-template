import styled from 'styled-components';
import { Typography } from '../../custom/customization';
import { Box } from '../../styles/index.styled';

export const Container = styled(Box)`
  position: relative;
`;

interface DropdownProps {
  textFont: string;
  textColor: string;
  borderColor: string;
  typography: Typography;
}

export const DisabledInput = styled.input<DropdownProps>`
  font-size: ${({ typography, textFont }) => typography[textFont].size};
  font-family: ${({ typography, textFont }) => typography[textFont].font};
  font-weight: ${({ typography, textFont }) => typography[textFont].fontWeight};
  color: ${({ textColor }) => textColor};
  border: 1px solid ${({ borderColor }) => borderColor};
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

export const DropdownMenu = styled.select<DropdownProps>`
  font-size: ${({ typography, textFont }) => typography[textFont].size};
  font-family: ${({ typography, textFont }) => typography[textFont].font};
  font-weight: ${({ typography, textFont }) => typography[textFont].fontWeight};
  color: ${({ textColor }) => textColor};
  border: 1px solid ${({ borderColor }) => borderColor};
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
  cursor: pointer;
`;

export const StyledSvg = styled.svg`
  position: absolute;
  top: 75px;
  right: 15px;
  height: 500px;
  cursor: pointer;
`;
