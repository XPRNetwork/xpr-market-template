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
  return socialMediaLinks.map(({ link, type, color }) => (
    <a href={link} target="_blank" rel="noreferrer" key={type}>
      {iconGetter({ type, color })}
    </a>
  ));
};

const iconGetter = ({ type, color }: { type: string; color: string }) => {
  switch (type) {
    case 'facebook': {
      return <FacebookIcon color={color} />;
    }
    case 'github': {
      return <GithubIcon color={color} />;
    }
    case 'google': {
      return <GoogleIcon color={color} />;
    }
    case 'instagram': {
      return <InstagramIcon color={color} />;
    }
    case 'linkedin': {
      return <LinkedInIcon color={color} />;
    }
    case 'medium': {
      return <MediumIcon color={color} />;
    }
    case 'telegram': {
      return <TelegramIcon color={color} />;
    }
    case 'twitter': {
      return <TwitterIcon color={color} />;
    }
    case 'youtube': {
      return <YoutubeIcon color={color} />;
    }
    case 'messenger': {
      return <MessengerIcon color={color} />;
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
