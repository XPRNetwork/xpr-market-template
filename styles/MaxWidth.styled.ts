import styled from 'styled-components';
import { breakpoint } from './Breakpoints';

export const MaxWidth = styled.div`
  max-width: 1352px;
  display: flex;
  justify-content: center;
  margin: 0px auto;

  ${breakpoint.largeLaptop`
    max-width: 90%;
  `};
`;
