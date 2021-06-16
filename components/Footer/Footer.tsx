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
import { FooterProps } from '../../custom/customization';

const getSocialMediaIcons = (socialMediaLinks) => {
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

export const Footer: FC<{ footerStyles: FooterProps }> = ({ footerStyles }) => {
  const { logo, socialMediaLinks, backgroundColor, borderColor } = footerStyles;
  return (
    <FooterContainer
      backgroundColor={backgroundColor}
      borderColor={borderColor}>
      <FooterContent>
        <Logo src={logo} className="logo" />
        <FooterIconsContainer>
          {getSocialMediaIcons(socialMediaLinks)}
        </FooterIconsContainer>
      </FooterContent>
    </FooterContainer>
  );
};
