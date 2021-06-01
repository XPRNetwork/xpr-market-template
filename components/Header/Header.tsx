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
import { useLocaleContext } from '../Provider';
import customizationJson from '../../custom/customization';
import localizationJson from '../../custom/localization';

export const Header: FC = () => {
  const {
    header: { image },
  } = customizationJson;
  const { locale, isLoadingLocale } = useLocaleContext();

  if (isLoadingLocale) return null;

  const text = Object.keys(localizationJson[locale]).length
    ? localizationJson[locale].header
    : localizationJson['en'].header;

  return (
    <HeaderContainer>
      <HeaderContent>
        <TextContainer>
          <HighlightText>{text.highlightText}</HighlightText>
          <HeaderText>{text.headerLine1}</HeaderText>
          <HeaderText>{text.headerLine2}</HeaderText>
          <SubHeaderText>{text.description}</SubHeaderText>
          <ButtonWrapperAnchor>
            <Button>{text.buttonText}</Button>
          </ButtonWrapperAnchor>
        </TextContainer>
        <ImageContainer>
          <img src={image} alt="mlb" />
        </ImageContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};
