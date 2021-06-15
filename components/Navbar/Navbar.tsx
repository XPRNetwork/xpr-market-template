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
} from '../Navbar/Navbar.styled';
import { Image } from '../../styles/index.styled';
import { NavbarProps } from '../../custom/customization';
import { ReactComponent as CloseIcon } from '../../public/icon-light-close-16-px.svg';
import { useAuthContext, useLocaleContext } from '../Provider';
import { useScrollLock, useEscapeKeyClose, useWindowSize } from '../../hooks';
import { TOKEN_SYMBOL } from '../../utils/constants';
import localizationJson, { Text } from '../../custom/localization';

type DropdownProps = {
  isOpen: boolean;
  styles: NavbarProps;
  text: Text;
  closeNavDropdown: () => void;
};

const Dropdown: FC<DropdownProps> = ({
  isOpen,
  styles,
  text,
  closeNavDropdown,
}) => {
  const router = useRouter();
  const { currentUser, currentUserBalance, logout } = useAuthContext();
  const { isMobile, isTablet } = useWindowSize();
  useEscapeKeyClose(closeNavDropdown);
  const isLoggedIn = currentUser && currentUser.actor;
  const routes = [];

  if (isMobile || isTablet) {
    styles.navLinks.forEach((link, index) => {
      routes.push({
        name: text.navbar.navLinks[index],
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
              <Name>{currentUser ? currentUser.name : ''}</Name>
              <Subtitle>{text.navbar.balanceText}</Subtitle>
              <Balance>{currentUserBalance || `0.00 ${TOKEN_SYMBOL}`}</Balance>
            </>
          ) : null}
          {routes.map(({ name, path, onClick, color }) =>
            path ? (
              <Link href={path} passHref key={name}>
                <DropdownLink onClick={onClick} color={color}>
                  {name}
                </DropdownLink>
              </Link>
            ) : (
              <DropdownLink
                tabIndex={0}
                onClick={onClick}
                key={name}
                color={color}>
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
  styles: NavbarProps;
  text?: Text;
}

const Navbar: FC<Props> = ({ styles, text: textProps }) => {
  const { currentUser, login, isLoadingUser } = useAuthContext();
  const { locale, isLoadingLocale } = useLocaleContext();
  const [isOpen, setIsOpen] = useState(false);
  useScrollLock(isOpen);

  const toggleNavDropdown = () => setIsOpen(!isOpen);

  const closeNavDropdown = () => setIsOpen(false);

  useEscapeKeyClose(closeNavDropdown);

  if (isLoadingLocale) return null;

  const text =
    textProps || Object.keys(localizationJson[locale]).length
      ? localizationJson[locale]
      : localizationJson['en'];

  return (
    <NavbarContainer>
      <Wrapper>
        <MobileOnlySection>
          <Image
            src="/hamburger-icon.svg"
            height="24px"
            width="24px"
            onClick={toggleNavDropdown}
          />
          <LogoContainer href={styles.logoLink}>
            <Image src={styles.logo} height="42px" width="auto" />
          </LogoContainer>
        </MobileOnlySection>
        <DesktopOnlySection>
          <LogoContainer href={styles.logoLink}>
            <Image src={styles.logo} height="60px" width="auto" />
          </LogoContainer>
          <NavLinks>
            {styles.navLinks.map(({ link }, index) => (
              <Link key={text.navbar.navLinks[index]} href={link}>
                {text.navbar.navLinks[index]}
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
                styles.defaultAvatarImage ||
                '/default-avatar.png'
              }
              width="48px"
              height="48px"
            />
          </AvatarContainer>
        ) : (
          <LoginButton onClick={login}>{text.navbar.loginText}</LoginButton>
        )}
        <Dropdown
          isOpen={isOpen}
          closeNavDropdown={closeNavDropdown}
          styles={styles}
          text={text}
        />
        <GradientBackground isOpen={isOpen} onClick={closeNavDropdown} />
      </Wrapper>
    </NavbarContainer>
  );
};

export default Navbar;
