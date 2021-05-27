import { NavbarContainer, Wrapper} from '../Navbar/Navbar.styled';
import theme from '../../custom/customization';
import { Image } from '../../styles/index.styled';

const Navbar = () => {
  return (
    <NavbarContainer>
      <Wrapper>
        <Image src={theme.navbar.logo} height="80px" width="auto" />
      </Wrapper>
    </NavbarContainer>
  );
}

export default Navbar;