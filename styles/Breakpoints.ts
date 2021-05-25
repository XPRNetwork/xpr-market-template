import { css } from 'styled-components';

interface MediaQueryProps {
  [key: string]: string;
}

interface MediaQueryValues {
  [key: string]: number;
}

const breakpoints: MediaQueryProps = {
  smallMobile: '400px',
  mobile: '600px',
  tablet: '970px',
  laptop: '1224px',
  largeLaptop: '1500px',
};

export const breakpointValues: MediaQueryValues = {
  smallMobile: 400,
  mobile: 600,
  tablet: 970,
  laptop: 1224,
  largeLaptop: 1500,
};

export const breakpoint = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args: Array<string[]>) => {
      return css`
        @media (max-width: ${breakpoints[label]}) {
          ${css({}, ...args)};
        }
      `;
    };
    return accumulator;
  },
  {
    smallMobile: undefined,
    mobile: undefined,
    tablet: undefined,
    laptop: undefined,
    largeLaptop: undefined,
  }
);

// How to use
// export const ExampleComponent = styled.div`
//   background-color: lime;

//   ${breakpoint.mobile`
//     background-color: red;
//   `}
// `;
