import styled from 'styled-components';
import { Typography } from '../../custom/customization';
import { Image } from '../../styles/index.styled';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { breakpoint } from '../../styles/Breakpoints';

export type GradientBackgroundProps = {
  isOpen: boolean;
};

type DropdownProps = {
  isOpen: boolean;
  height?: string;
};

type DropdownLinkProps = {
  color: string;
  typography: Typography;
  navLinkFontType: string;
};

export const AvatarContainer = styled.div`
  position: relative;
`;

export const HamburgerIcon = styled(Image)`
  cursor: pointer;
`;

export const NavbarContainer = styled.div<{
  bottomBorderColor: string;
  backgroundColor: string;
}>`
  width: 100%;
  position: relative;
  border-bottom: 1px solid ${({ bottomBorderColor }) => bottomBorderColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 96px;
`;

export const Wrapper = styled(MaxWidth).attrs({ as: 'nav' })`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const LogoContainer = styled.a`
  cursor: pointer;

  ${breakpoint.tablet`
    margin-left: 16px;
  `}
`;

export const DesktopOnlySection = styled.section`
  width: 85%;
  margin-right: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${breakpoint.tablet`
    display: none;
  `}
`;

export const AvatarImage = styled(Image)`
  border-radius: 100%;
  cursor: pointer;
  overflow: hidden;
`;

export const LoginButton = styled.button<{
  buttonBorderColor: string;
  buttonFontColor: string;
  buttonBackgroundColor: string;
  buttonFontType: string;
  typography: Typography;
}>`
  border: 2px solid ${({ buttonBorderColor }) => buttonBorderColor};
  height: 42px;
  padding: 0 15px;
  color: ${({ buttonFontColor }) => buttonFontColor};
  background-color: ${({ buttonBackgroundColor }) => buttonBackgroundColor};
  cursor: pointer;
  font-family: ${({ typography, buttonFontType }) =>
    typography[buttonFontType].font};
  font-size: ${({ typography, buttonFontType }) =>
    typography[buttonFontType].size};
  font-weight: ${({ typography, buttonFontType }) =>
    typography[buttonFontType].fontWeight};
`;

export const MobileOnlySection = styled.section`
  display: none;
  ${breakpoint.tablet`
    display: flex;
    align-items: center;
  `}
`;

export const NavLinks = styled.section<{
  typography: Typography;
  navLinkFontType: string;
}>`
  max-width: 45%;
  width: 45%;
  display: flex;
  justify-content: space-between;

  a {
    font-family: ${({ typography, navLinkFontType }) =>
      typography[navLinkFontType].font};
    font-size: ${({ typography, navLinkFontType }) =>
      typography[navLinkFontType].size};
    font-weight: ${({ typography, navLinkFontType }) =>
      typography[navLinkFontType].fontWeight};
  }
`;

export const MobileHeaderWrapper = styled.div`
  height: 92px;
  display: flex;
  align-items: center;
`;

export const CloseIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  cursor: pointer;
  border-radius: 100%;
  z-index: 3;
  width: 40px;
  height: 40px;
  background: #f2f2f2;
  outline: none;

  * {
    z-index: 3;
  }
`;

export const DropdownList = styled.section<DropdownProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 80px;
  right: 0;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.1), 0 0 8px 0 rgba(0, 0, 0, 0.08);
  min-width: 224px;
  z-index: 2;

  @media (max-width: 970px) {
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    background: none;

    &:before {
      content: '';
      background: #ffffff;
      height: ${({ height }) => height || '400px'};
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
`;

export const GradientBackground = styled.div<GradientBackgroundProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;

  ${breakpoint.tablet`
    background-color: rgba(0, 0, 0, 0.7);
  `}
`;

export const Name = styled.span<{
  typography: Typography;
  fontType: string;
}>`
  font-family: ${({ typography, fontType }) => typography[fontType].font};
  font-size: ${({ typography, fontType }) => typography[fontType].size};
  font-weight: ${({ typography, fontType }) => typography[fontType].fontWeight};
  line-height: 24px;
  margin: 16px 16px 11px;

  ${breakpoint.tablet`
    margin: 16px 0 11px;
  `}
`;

export const Subtitle = styled.span`
  color: #808080;
  font-size: 12px;
  line-height: 20px;
  margin: 0 16px;

  ${breakpoint.tablet`
    margin: 0;
  `}
`;

export const Balance = styled(Name)`
  font-family: ${({ typography, fontType }) => typography[fontType].font};
  font-size: ${({ typography, fontType }) => typography[fontType].size};
  font-weight: ${({ typography, fontType }) => typography[fontType].fontWeight};
  line-height: 24px;
  border-bottom: 1px solid #e6e6e6;
  margin: 0 16px 8px;
  padding: 0 0 16px;

  ${breakpoint.tablet`
    margin: 0 0 8px;
  `}
`;

export const DropdownLink = styled.a<DropdownLinkProps>`
  font-family: ${({ typography, navLinkFontType }) =>
    typography[navLinkFontType].font};
  font-size: ${({ typography, navLinkFontType }) =>
    typography[navLinkFontType].size};
  font-weight: ${({ typography, navLinkFontType }) =>
    typography[navLinkFontType].fontWeight};
  color: ${({ color }) => color};
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  padding: 8px 16px;
  width: 100%;
  transition: 0.2s;

  :last-of-type {
    margin-bottom: 16px;
  }

  ${breakpoint.tablet`
    padding: 8px 0;
  `}
`;
