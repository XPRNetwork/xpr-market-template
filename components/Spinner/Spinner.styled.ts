import styled, { keyframes } from 'styled-components';

type StyledSpinnerProps = {
  size: string;
  hasBackground: boolean;
};

const rotate = keyframes`
  \ 100% {
        transform: rotate(360deg);
      }
`;

const dash = keyframes`
  \ 0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  \ 50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  \ 100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

export const StyledSpinner = styled.svg<StyledSpinnerProps>`
  animation: ${rotate} 2s linear infinite;
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  & .path {
    stroke: ${({ hasBackground }) =>
      hasBackground ? 'rgba(255, 255, 255, 1)' : 'rgba(117, 120, 181, 0.2)'};
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;
