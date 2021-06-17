import styled from 'styled-components';
import customizationJson from '../../custom/customization';
import { breakpoint } from '../../styles/Breakpoints';
import { MaxWidth } from '../../styles/MaxWidth.styled';

const { typography } = customizationJson;

interface ButtonProps {
  backgroundColor: string;
  textFont: string;
  textColor: string;
}

export const NftPageContainer = styled(MaxWidth).attrs({ as: 'main' })<{
  imagePlacement: string;
}>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ imagePlacement }) =>
    imagePlacement === 'left' ? 'row' : 'row-reverse'};
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

export const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 56px;
  margin-top: 32px;
  padding: 0;
  background-color: ${(props) => props.backgroundColor};
  font-family: ${(props) => typography[props.textFont].font};
  color: ${(props) => props.textColor};
  border: none;
  cursor: pointer;

  ${breakpoint.tablet`
    font-size: 14px;
  `}
`;

export const ButtonLink = styled.a<ButtonProps>`
  width: 100%;
  height: 56px;
  margin-top: 32px;
  padding: 0;
  background-color: ${(props) => props.backgroundColor};
  font-family: ${(props) => typography[props.textFont].font};
  color: ${(props) => props.textColor};
  border: none;
  cursor: pointer;

  ${breakpoint.tablet`
    font-size: 14px;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.p<{ type: string; color: string }>`
  color: ${(props) => props.color};
  font-family: ${(props) => typography[props.type].font};
  font-size: ${(props) => typography[props.type].size};
  font-weight: ${(props) => typography[props.type].fontWeight};
  margin-top: 32px;
`;
