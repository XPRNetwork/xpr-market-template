import { useState } from 'react';
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
} from '../Navbar/Navbar.styled';
import { Image } from '../../styles/index.styled';
import theme from '../../custom/customization';
import { useAuthContext, useLocaleContext } from '../Provider';
import { useScrollLock, useEscapeKeyClose, useWindowSize } from '../../hooks';
import { TOKEN_SYMBOL } from '../../utils/constants';

const Navbar = () => {
  const { navbar } = theme;
  const { currentUser, login, logout, currentUserBalance,  isLoadingUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(false);
  useScrollLock(isOpen);
  
  const toggleNavDropdown = () => setIsOpen(!isOpen);
  
  const closeNavDropdown = () => setIsOpen(false);
  
  useEscapeKeyClose(closeNavDropdown);

  return (
    <NavbarContainer>
      <Wrapper>
        <LogoContainer href={navbar.logoLink}>
          <Image src={navbar.logo} height="60px" width="auto" />
        </LogoContainer>
        <DesktopOnlySection>
          {navbar.navLinks.map((link) => (
            <Link key={link.title} href={link.link}>
              {link.title}
            </Link>
          ))}
        </DesktopOnlySection>
        <MobileOnlySection>

        </MobileOnlySection>
        { !isLoadingUser && currentUser && currentUser.actor ? (
          <AvatarContainer>
            <AvatarImage onClick={toggleNavDropdown} src={currentUser.avatar || navbar.defaultAvatarImage || '/default-avatar.png'} width="48px" height="48opx" />
            <DropdownList isOpen={isOpen}>
              <Name>{currentUser ? currentUser.name : ''}</Name>
              <Subtitle>Balance</Subtitle>
              <Balance>{currentUserBalance || `0.00 ${TOKEN_SYMBOL}`}</Balance>
              <DropdownLink onClick={() => {
                logout();
                closeNavDropdown();
              }}>
                Sign out
              </DropdownLink>
            </DropdownList>
          </AvatarContainer>
        ) :
          <LoginButton onClick={login}>
            Connect Wallet
          </LoginButton>
        }
      </Wrapper>
    </NavbarContainer>
  );
}

export default Navbar;