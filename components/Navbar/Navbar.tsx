import { useState } from 'react';
import Link from 'next/link';
import { NavbarContainer, Wrapper, LogoContainer, DesktopOnlySection, LoginButton, MobileOnlySection } from '../Navbar/Navbar.styled';
import theme from '../../custom/customization';
import { Image } from '../../styles/index.styled';
import { useAuthContext } from '../Provider';
import { useScrollLock, useEscapeKeyClose, useWindowSize } from '../../hooks';

const Navbar = () => {
  const { navbar } = theme;
  const { currentUser, login, isLoadingUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(false);
  useScrollLock(isOpen);

  const toggleNavDropdown = () => setIsOpen(!isOpen);

  const closeNavDropdown = () => setIsOpen(false);

  const connectWallet = async () => {
    setIsLoginDisabled(true);
    await login();
    closeNavDropdown();
    setIsLoginDisabled(false);
  };
  
  console.log(currentUser)
  return (
    <NavbarContainer>
      <Wrapper>
        <LogoContainer href={navbar.logoLink}>
          <Image src={navbar.logo} height="80px" width="auto" />
        </LogoContainer>
        <DesktopOnlySection>
          {navbar.navLinks.map((link) => (
            <Link key={link.title} href={link.link}>
              {link.title}
            </Link>
          ))}
          { !isLoadingUser && currentUser && currentUser.actor ?
            <Image src={navbar.defaultAvatarImage || '/default-avatar.png'} width="48px" height="48opx" /> :
            <LoginButton onClick={login}>
              Connect Wallet
            </LoginButton>
          }
        </DesktopOnlySection>
        <MobileOnlySection>

        </MobileOnlySection>
      </Wrapper>
    </NavbarContainer>
  );
}

export default Navbar;