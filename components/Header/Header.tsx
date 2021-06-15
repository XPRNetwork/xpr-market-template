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
import { Text } from '../../custom/localization';

interface Props {
  styles: HeaderProps;
  text: Text;
}

export const Header: FC<Props> = ({ styles, text }) => {
  return (
    <HeaderContainer backgroundColor={styles.backgroundColor}>
      <HeaderContent imagePlacement={styles.imagePlacement}>
        <TextContainer imagePlacement={styles.imagePlacement}>
          <HighlightText {...styles.highlightFont}>
            {text.header.highlightText}
          </HighlightText>
          <HeaderText {...styles.mainHeadingFont}>
            {text.header.headerLine1}
          </HeaderText>
          <HeaderText {...styles.mainHeadingFont}>
            {text.header.headerLine2}
          </HeaderText>
          <SubHeaderText {...styles.subheadingFont}>
            {text.header.description}
          </SubHeaderText>
          <ButtonWrapperAnchor href={styles.button.link}>
            <Button {...styles.button}>{text.header.buttonText}</Button>
          </ButtonWrapperAnchor>
        </TextContainer>
        <ImageContainer>
          <img src={styles.image} alt="mlb" />
        </ImageContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};
