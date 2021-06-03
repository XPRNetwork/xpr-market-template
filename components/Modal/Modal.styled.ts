import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';

interface HalfButtonProps {
  fullWidth?: boolean;
  cancel?: boolean;
  margin?: string;
  padding?: string;
  smallSize?: boolean;
  disabled?: boolean;
  color?: string;
  hoverColor?: string;
  height?: string;
}

interface DescriptionProps {
  mb?: string;
}

export const Background = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const ModalBox = styled(MaxWidth)`
  display: flex;
  flex-direction: column;
  margin-top: 18vh !important;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;

  @media (min-width: 600px) {
    width: 416px;
  }
`;

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CloseIconContainer = styled.div`
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 21px;
  line-height: 32px;
  color: #1a1a1a;
  margin-bottom: 24px;
  font-weight: normal;
`;

export const Description = styled.p<DescriptionProps>`
  font-size: 14px;
  line-height: 24px;
  color: #1a1a1a;
  margin-bottom: ${({ mb }) => mb || '24px'};
`;

export const FeeLabel = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 24px;
  color: #333333;
  margin: 16px 0 24px;
`;

export const HalfButton = styled.button<HalfButtonProps>`
  margin: ${({ margin }) => margin};
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: 0.2s;
  height: auto;
  font-size: ${({ smallSize }) => (smallSize ? '14px' : '16px')};
  line-height: 24px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  :focus {
    outline: none;
  }

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    opacity: 0.2;
  `};

  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 144px;
  align-self: flex-end;
  padding: ${({ padding }) => padding || '11px 16px 13px'};

  ${({ color }) =>
    color &&
    `
    background-color: ${color};
  `};

  ${({ hoverColor }) =>
    hoverColor &&
    `
    :hover {
      background-color: ${hoverColor};
    }
  `};

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    opacity: 0.2;
  `};
`;
