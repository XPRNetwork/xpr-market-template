import styled from 'styled-components';

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
  display: boolean;
};

export const ButtonNextContainer = styled.div<ButtonProps>`
  display: ${({ display }) => (display ? 'block' : 'none')};
  position: absolute;
  left: calc(100% - 42px);
  top: calc(50% - 24px);

  button {
    width: 48px;
    height: 48px;
    background-color: white;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    box-shadow: 0px 2px 5px rgb(210, 210, 210);

    :disabled {
      display: none;
    }

    :hover {
      cursor: pointer;
    }
  }
`;

export const ButtonBackContainer = styled.div<ButtonProps>`
  display: ${({ display }) => (display ? 'block' : 'none')};
  position: absolute;
  right: calc(100% - 24px);
  top: calc(50% - 24px);

  button {
    width: 48px;
    height: 48px;
    background-color: white;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    transform: rotate(180deg);
    outline: none;
    border: none;
    box-shadow: 0px -2px 5px rgb(210, 210, 210);

    :disabled {
      display: none;
    }

    :hover {
      cursor: pointer;
    }
  }
`;
