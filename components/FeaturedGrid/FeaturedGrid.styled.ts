import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const Container = styled.section`
  width: 100%;
  display: inline-grid;
  grid-column-gap: 24px;
  grid-row-gap: 50px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  ${breakpoint.laptop`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `}

  ${breakpoint.tablet`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${breakpoint.mobile`
    grid-template-columns: repeat(1, minmax(0, 1fr));
  `}
`;
