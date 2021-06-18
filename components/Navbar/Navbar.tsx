import { useState, FC } from 'react';
import { useRouter } from 'next/router';
import { FontImport } from '../../components';
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
} from '../Navbar/Navbar.styled';
import { Image } from '../../styles/index.styled';
import { NavbarProps, Typography } from '../../custom/customization';
import { ReactComponent as CloseIcon } from '../../public/icon-light-close-16-px.svg';
import { useAuthContext } from '../Provider';
import { useScrollLock, useEscapeKeyClose, useWindowSize } from '../../hooks';
import { TOKEN_SYMBOL } from '../../utils/constants';
import { NavbarTextProps } from '../../custom/localization';

type DropdownProps = {
  isOpen: boolean;
  styles: NavbarProps;
  text: NavbarTextProps;
  typography: Typography;
  closeNavDropdown: () => void;
};

const Dropdown: FC<DropdownProps> = ({
  isOpen,
  styles,
  text,
  typography,
  closeNavDropdown,
}) => {
  const { balanceSubtitleFontType, navLinkFontType } = styles;
  const router = useRouter();
  const { currentUser, currentUserBalance, logout } = useAuthContext();
  const { isMobile, isTablet } = useWindowSize();
  useEscapeKeyClose(closeNavDropdown);
  const isLoggedIn = currentUser && currentUser.actor;
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
          <CloseIcon />
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
}

const Navbar: FC<Props> = ({ navbarStyles, navbarText, typography }) => {
  const { currentUser, login, isLoadingUser } = useAuthContext();
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

  return (
    <>
      {process.env.STORYBOOK_ENVIRONMENT && (
        <FontImport typography={typography} />
      )}
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
          {!isLoadingUser && currentUser && currentUser.actor ? (
            <AvatarContainer>
              <AvatarImage
                onClick={toggleNavDropdown}
                src={
                  currentUser.avatar ||
                  navbarStyles.defaultAvatarImage ||
                  '/default-avatar.png'
                }
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
            closeNavDropdown={closeNavDropdown}
            styles={navbarStyles}
            text={navbarText}
            typography={typography}
          />
          <GradientBackground isOpen={isOpen} onClick={closeNavDropdown} />
        </Wrapper>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
