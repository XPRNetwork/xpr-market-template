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
import { HeaderProps } from '../../custom/customization';
import { HeaderTextProps } from '../../custom/localization';

interface Props {
  headerStyles: HeaderProps;
  headerText: HeaderTextProps;
}

export const Header: FC<Props> = ({ headerStyles, headerText }) => {
  return (
    <HeaderContainer backgroundColor={headerStyles.backgroundColor}>
      <HeaderContent imagePlacement={headerStyles.imagePlacement}>
        <TextContainer imagePlacement={headerStyles.imagePlacement}>
          <HighlightText {...headerStyles.highlightFont}>
            {headerText.highlightText}
          </HighlightText>
          <HeaderText {...headerStyles.mainHeadingFont}>
            {headerText.headerLine1}
          </HeaderText>
          <HeaderText {...headerStyles.mainHeadingFont}>
            {headerText.headerLine2}
          </HeaderText>
          <SubHeaderText {...headerStyles.subheadingFont}>
            {headerText.description}
          </SubHeaderText>
          <ButtonWrapperAnchor href={headerStyles.button.link}>
            <Button {...headerStyles.button}>{headerText.buttonText}</Button>
          </ButtonWrapperAnchor>
        </TextContainer>
        <ImageContainer>
          <img src={headerStyles.image} alt="mlb" />
        </ImageContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};
