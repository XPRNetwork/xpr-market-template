import { FC } from 'react';
import {
  HeaderContainer,
  HeaderContent,
  TextContainer,
  ImageContainer,
  HighlightText,
  SubHeaderText,
  HeaderText,
  ButtonWrapperAnchor,
  Button,
} from './Header.styled';
import { HeaderProps, Typography } from '../../custom/customization';
import { HeaderTextProps } from '../../custom/localization';

interface Props {
  headerStyles: HeaderProps;
  headerText: HeaderTextProps;
  typography: Typography;
}

export const Header: FC<Props> = ({ headerStyles, headerText, typography }) => (
  <HeaderContainer backgroundColor={headerStyles.backgroundColor}>
    <HeaderContent imagePlacement={headerStyles.imagePlacement}>
      <TextContainer imagePlacement={headerStyles.imagePlacement}>
        <HighlightText {...headerStyles.highlightFont} typography={typography}>
          {headerText.highlightText}
        </HighlightText>
        <HeaderText {...headerStyles.mainHeadingFont} typography={typography}>
          {headerText.headerLine1}
        </HeaderText>
        <HeaderText {...headerStyles.mainHeadingFont} typography={typography}>
          {headerText.headerLine2}
        </HeaderText>
        <SubHeaderText {...headerStyles.subheadingFont} typography={typography}>
          {headerText.description}
        </SubHeaderText>
        <ButtonWrapperAnchor href={headerStyles.button.link}>
          <Button {...headerStyles.button} typography={typography}>
            {headerText.buttonText}
          </Button>
        </ButtonWrapperAnchor>
      </TextContainer>
      <ImageContainer>
        <img src={headerStyles.image} alt="mlb" />
      </ImageContainer>
    </HeaderContent>
  </HeaderContainer>
);
