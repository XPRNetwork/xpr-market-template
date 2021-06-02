import styled from 'styled-components';
import customizationJson from '../../custom/customization';
import { Image } from '../../styles/index.styled';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { breakpoint } from '../../styles/Breakpoints';

const { navbar } = customizationJson;

export type GradientBackgroundProps = {
  isOpen: boolean;
};

type DropdownProps = {
  isOpen: boolean;
};

export const AvatarContainer = styled.div`
  position: relative;
`;

export const NavbarContainer = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 1px solid ${navbar.bottomBorderColor};
  background-color: ${navbar.backgroundColor};
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
  margin-left: 25%;
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

export const LoginButton = styled.button`
  border: 2px solid ${navbar.buttonBorderColor};
  height: 42px;
  padding: 0 15px;
  background-color: ${navbar.buttonBackgroundColor};
  cursor: pointer;
`;

export const MobileOnlySection = styled.section`
  display: none;
  ${breakpoint.tablet`
    display: unset;
  `}
`;

export const DropdownList = styled.section<DropdownProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 75px;
  right: 0;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.1), 0 0 8px 0 rgba(0, 0, 0, 0.08);
  min-width: 224px;
  z-index: 2;

  ${breakpoint.tablet`
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    right: 0;
    z-index: 2;
    top: 65px;
    width: 100%;
    background: none;

    &:before {
      content: '';
      background: #ffffff;
      width: 100%;
      height: 320px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
    }
  `}
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

export const Name = styled.span`
  font-family: CircularStdBold;
  color: #1a1a1a;
  font-size: 14px;
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
  font-size: 18px;
  line-height: 24px;
  border-bottom: 1px solid #e6e6e6;
  margin: 0 16px 8px;
  padding: 0 0 16px;

  ${breakpoint.tablet`
    margin: 0 0 8px;
  `}
`;

export const DropdownLink = styled.a`
  color: ${navbar.buttonFontColor};
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
