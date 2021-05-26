import Link from 'next/link';
import { NavbarContainer, Wrapper, LogoContainer, DesktopOnlySection, NavbarLink } from '../Navbar/Navbar.styled';
import theme from '../../custom/customization';
import { Image } from '../../styles/index.styled';

const Navbar = () => {
  const { navbar } = theme;
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
        </DesktopOnlySection>
      </Wrapper>
    </NavbarContainer>
  );
}

export default Navbar;