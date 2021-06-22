import { useState, FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  NavbarContainer,
  Wrapper,
  LogoContainer,
  DesktopOnlySection,
  LoginButton,
  MobileOnlySection,
  AvatarImage,
  DropdownList,
  Name,
  Subtitle,
  Balance,
  DropdownLink,
  AvatarContainer,
  NavLinks,
  GradientBackground,
  CloseIconButton,
  MobileHeaderWrapper,
} from './Navbar.styled';
import { Image } from '../../styles/index.styled';
import { NavbarProps, Typography } from '../../custom/customization';
import { useScrollLock, useEscapeKeyClose, useWindowSize } from '../../hooks';
import { TOKEN_SYMBOL } from '../../utils/constants';
import { NavbarTextProps } from '../../custom/localization';
import { User } from '../../services/proton';

type DropdownProps = {
  isOpen: boolean;
  isLoggedIn: boolean;
  styles: NavbarProps;
  text: NavbarTextProps;
  typography: Typography;
  closeNavDropdown: () => void;
  currentUser: User;
  currentUserBalance: string;
  logout: () => Promise<void>;
};

const Dropdown: FC<DropdownProps> = ({
  isOpen,
  isLoggedIn,
  styles,
  text,
  typography,
  closeNavDropdown,
  currentUser,
  currentUserBalance,
  logout,
}) => {
  const { balanceSubtitleFontType, navLinkFontType } = styles;
  const router = useRouter();
  const { isMobile, isTablet } = useWindowSize();
  useEscapeKeyClose(closeNavDropdown);
  const routes = [];

  if (isMobile || isTablet) {
    styles.navLinks.forEach((link, index) => {
      routes.push({
        name: text.navLinks[index],
        path: link.link,
        color: link.color || styles.buttonFontColor,
        onClick: () => {
          window.location.replace(link.link);
          closeNavDropdown();
        },
      });
    });
  }
  if (isLoggedIn) {
    routes.push({
      name: 'Sign out',
      path: '',
      color: '#ff0000',
      onClick: () => {
        closeNavDropdown();
        logout();
        router.push('/');
      },
    });
  }

  let closeMobileDropdown = <></>;
  if (isMobile || isTablet) {
    closeMobileDropdown = (
      <MobileHeaderWrapper>
        <CloseIconButton onClick={closeNavDropdown}>
          <img src="/icon-light-close-16-px.svg" alt="close" />
        </CloseIconButton>
      </MobileHeaderWrapper>
    );
  }

  if (routes.length > 0) {
    const minHeightMobileDropdown = routes.length * 70;
    return (
      <>
        <DropdownList
          isOpen={isOpen}
          height={
            isLoggedIn
              ? `${minHeightMobileDropdown + 85}px`
              : `${minHeightMobileDropdown}px`
          }>
          {closeMobileDropdown}
          {isLoggedIn ? (
            <>
              <Name typography={typography} fontType={navLinkFontType}>
                {currentUser ? currentUser.name : ''}
              </Name>
              <Subtitle>{text.balanceText}</Subtitle>
              <Balance
                typography={typography}
                fontType={balanceSubtitleFontType}>
                {currentUserBalance || `0.00 ${TOKEN_SYMBOL}`}
              </Balance>
            </>
          ) : null}
          {routes.map(({ name, path, onClick, color }) =>
            path ? (
              <Link href={path} passHref key={name}>
                <DropdownLink
                  onClick={onClick}
                  color={color}
                  typography={typography}
                  navLinkFontType={navLinkFontType}>
                  {name}
                </DropdownLink>
              </Link>
            ) : (
              <DropdownLink
                tabIndex={0}
                onClick={onClick}
                key={name}
                color={color}
                typography={typography}
                navLinkFontType={navLinkFontType}>
                {name}
              </DropdownLink>
            )
          )}
        </DropdownList>
      </>
    );
  }

  return null;
};

interface Props {
  navbarStyles: NavbarProps;
  navbarText: NavbarTextProps;
  typography: Typography;
  currentUser: User;
  currentUserBalance: string;
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const Navbar: FC<Props> = ({
  navbarStyles,
  navbarText,
  typography,
  currentUser,
  currentUserBalance,
  isLoggedIn,
  login,
  logout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useScrollLock(isOpen);

  const {
    bottomBorderColor,
    backgroundColor,
    buttonBorderColor,
    buttonFontColor,
    buttonBackgroundColor,
    buttonFontType,
    navLinkFontType,
  } = navbarStyles;

  const toggleNavDropdown = () => setIsOpen(!isOpen);

  const closeNavDropdown = () => setIsOpen(false);

  useEscapeKeyClose(closeNavDropdown);

  const avatarImage = currentUser
    ? currentUser.avatar
    : '' || navbarStyles
    ? navbarStyles.defaultAvatarImage
    : '' || '/default-avatar.png';

  return (
    <NavbarContainer
      bottomBorderColor={bottomBorderColor}
      backgroundColor={backgroundColor}>
      <Wrapper>
        <MobileOnlySection>
          <Image
            src="/hamburger-icon.svg"
            height="24px"
            width="24px"
            onClick={toggleNavDropdown}
          />
          <LogoContainer href={navbarStyles.logoLink}>
            <Image src={navbarStyles.logo} height="42px" width="auto" />
          </LogoContainer>
        </MobileOnlySection>
        <DesktopOnlySection>
          <LogoContainer href={navbarStyles.logoLink}>
            <Image src={navbarStyles.logo} height="60px" width="auto" />
          </LogoContainer>
          <NavLinks typography={typography} navLinkFontType={navLinkFontType}>
            {navbarStyles.navLinks.map(({ link }, index) => (
              <Link key={navbarText.navLinks[index]} href={link}>
                {navbarText.navLinks[index]}
              </Link>
            ))}
          </NavLinks>
        </DesktopOnlySection>
        {isLoggedIn ? (
          <AvatarContainer>
            <AvatarImage
              onClick={toggleNavDropdown}
              src={avatarImage}
              width="48px"
              height="48px"
            />
          </AvatarContainer>
        ) : (
          <LoginButton
            onClick={login}
            buttonBorderColor={buttonBorderColor}
            buttonFontColor={buttonFontColor}
            buttonBackgroundColor={buttonBackgroundColor}
            buttonFontType={buttonFontType}
            typography={typography}>
            {navbarText.loginText}
          </LoginButton>
        )}
        <Dropdown
          isOpen={isOpen}
          isLoggedIn={isLoggedIn}
          closeNavDropdown={closeNavDropdown}
          styles={navbarStyles}
          text={navbarText}
          typography={typography}
          currentUser={currentUser}
          currentUserBalance={currentUserBalance}
          logout={logout}
        />
        <GradientBackground isOpen={isOpen} onClick={closeNavDropdown} />
      </Wrapper>
    </NavbarContainer>
  );
};
