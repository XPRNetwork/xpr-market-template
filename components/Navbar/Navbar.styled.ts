import styled from 'styled-components';
import { ThemeProps } from '../../custom/customization';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { breakpoint } from '../../styles/Breakpoints';

export const NavbarContainer = styled.div<ThemeProps>`
  width: 100%;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.navbar.bottomBorderColor };
  background-color: ${({ theme }) => theme.navbar.backgroundColor };
  height: 96px;
`;

export const Wrapper = styled(MaxWidth).attrs({ as: 'nav' })<ThemeProps>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoContainer = styled.a`
  cursor: pointer;
`;

export const DesktopOnlySection = styled.section`
  ${breakpoint.tablet`
    display: none;
  `}
`;