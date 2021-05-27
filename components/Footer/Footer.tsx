import {
  FooterContainer,
  FooterContent,
  FooterIconsContainer,
  Logo,
} from './Footer.styled';
import { FC } from 'react';
import {
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
  MessengerIcon,
} from '../SocialMediaIcons/SocialMediaIcons';
import customizationJson from '../../custom/customization';

const { footer } = customizationJson;
const { socialMediaLinks } = footer;

const getSocialMediaIcons = () => {
  return socialMediaLinks.map((link) => (
    <a href={link.link} target="_blank" rel="noreferrer" key={link.type}>
      {iconGetter(link.type)}
    </a>
  ));
};

const iconGetter = (type) => {
  switch (type) {
    case 'facebook': {
      return <FacebookIcon />;
    }
    case 'github': {
      return <GithubIcon />;
    }
    case 'google': {
      return <GoogleIcon />;
    }
    case 'instagram': {
      return <InstagramIcon />;
    }
    case 'linkedin': {
      return <LinkedInIcon />;
    }
    case 'medium': {
      return <MediumIcon />;
    }
    case 'telegram': {
      return <TelegramIcon />;
    }
    case 'twitter': {
      return <TwitterIcon />;
    }
    case 'youtube': {
      return <YoutubeIcon />;
    }
    case 'messenger': {
      return <MessengerIcon />;
    }
    default: {
      return null;
    }
  }
};

export const Footer: FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo src={footer.logo} className="logo" />
        <FooterIconsContainer>{getSocialMediaIcons()}</FooterIconsContainer>
      </FooterContent>
    </FooterContainer>
  );
};
