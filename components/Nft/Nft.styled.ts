import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const NftContainer = styled.div<{
  imageBackgroundColor: string;
  imagePlacement: string;
}>`
  width: 50%;
  height: 100%;
  min-width: 552px;
  min-height: 552px;
  background-color: ${({ imageBackgroundColor }) =>
    imageBackgroundColor || 'none'};
  margin-left: ${({ imagePlacement }) =>
    imagePlacement === 'left' ? '0' : '48px'};
  margin-right: ${({ imagePlacement }) =>
    imagePlacement === 'left' ? '48px' : '0'};
  padding: 3vh 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  ${breakpoint.laptop`
    width: 40%;
    margin-left: ${({ imagePlacement }) =>
      imagePlacement === 'left' ? '24px' : '0'};
    margin-right: ${({ imagePlacement }) =>
      imagePlacement === 'left' ? '0' : '24px'};
    min-width: 480px;
    min-height: 480px;
  `}

  ${breakpoint.tablet`
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    min-width: 0;
    min-height: 0;
  `}
`;

export const Image = styled.img<{ imageShadow: boolean }>`
  object-fit: contain;
  max-width: 500px;
  max-height: 500px;

  ${({ imageShadow }) =>
    imageShadow
      ? `box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);`
      : ''}

  ${breakpoint.laptop`
    max-width: 440px;
    max-height: 440px;
  `}

  ${breakpoint.tablet`
    max-width: 100%;
    max-height: 100%;
  `}
`;

export const Video = styled.video<{ imageShadow: boolean }>`
  width: 100%;
  max-height: 100%;
  border-radius: 16px;
  outline: none;

  ${({ imageShadow }) =>
    imageShadow
      ? `box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);`
      : ''}
`;
