import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const CarouselStyleFix = styled.div`
  width: 100%;
  .carousel {
    overflow: hidden;
    outline: none;
    width: calc(100% + 24px);

    .carousel__slider {
      outline: none;
    }
  }

  ul {
    outline: none;
    transition: 0.5s;

    li {
      margin-right: 24px;
      outline: none;
    }
  }
`;

export const CarouselContainer = styled.div`
  min-height: 150px;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
`;

type ButtonProps = {
  isVisible: boolean;
  carouselButtonsBackgroundColor: string;
  carouselButtonsBorderColor: string;
};

export const ButtonNextContainer = styled.div<ButtonProps>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  left: calc(100% - 24px);
  top: calc(50% - 24px);

  button {
    width: 48px;
    height: 48px;
    background-color: ${({ carouselButtonsBackgroundColor }) =>
      carouselButtonsBackgroundColor};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: 1px solid
      ${({ carouselButtonsBorderColor }) => carouselButtonsBorderColor};
    box-shadow: 0px 2px 5px rgb(210, 210, 210);

    :disabled {
      display: none;
    }

    :hover {
      cursor: pointer;
    }

    ${breakpoint.mobile`
      width: 40px;
      height: 40px;
    `}
  }
`;

export const ButtonBackContainer = styled.div<ButtonProps>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  right: calc(100% - 24px);
  top: calc(50% - 24px);

  button {
    width: 48px;
    height: 48px;
    background-color: ${({ carouselButtonsBackgroundColor }) =>
      carouselButtonsBackgroundColor};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid
      ${({ carouselButtonsBorderColor }) => carouselButtonsBorderColor};
    transform: rotate(180deg);
    outline: none;
    box-shadow: 0px -2px 5px rgb(210, 210, 210);

    :disabled {
      display: none;
    }

    :hover {
      cursor: pointer;
    }

    ${breakpoint.mobile`
      width: 40px;
      height: 40px;
    `}
  }
`;
