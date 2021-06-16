import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { breakpoint } from '../../styles/Breakpoints';

type FooterContainerProps = {
  backgroundColor: string;
  borderColor: string;
};

export const FooterContainer = styled.div<FooterContainerProps>`
  height: 96px;
  width: 100%;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
  border-top: 1px solid ${({ borderColor }) => borderColor || 'transparent'};

  ${breakpoint.mobile`
    height: 72px;
  `}
`;

export const FooterContent = styled(MaxWidth).attrs({ as: 'footer' })`
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const FooterIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  ${breakpoint.mobile`
    a {
      &:not(:last-child) {
        margin-right: 10px;
      }
      svg {
        width: 16px;
      }
    }
  `}
`;

export const Logo = styled.img`
  width: 75px;

  ${breakpoint.mobile`
    width: 50px;
  `}
`;
