import styled from 'styled-components';
import customizationJson, { ThemeProps } from '../../custom/customization';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { breakpoint } from '../../styles/Breakpoints';

const { navbar } = customizationJson;

export const NavbarContainer = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 1px solid ${navbar.bottomBorderColor};
  background-color: ${navbar.backgroundColor };
  height: 96px;
`;

export const Wrapper = styled(MaxWidth).attrs({ as: 'nav' })`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoContainer = styled.a`
  cursor: pointer;
`;

export const DesktopOnlySection = styled.section`
  width: 50%;
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${breakpoint.tablet`
    display: none;
  `}
`;

export const LoginButton = styled.button`

`;

export const MobileOnlySection = styled.section`
  display: none;
  ${breakpoint.tablet`
    display: unset;
  `}
`;