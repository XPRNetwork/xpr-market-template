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
import customizationJson from '../../custom/customization';

export const Header: FC = () => {
  const {
    header: { image },
  } = customizationJson;

  return (
    <HeaderContainer>
      <HeaderContent>
        <TextContainer>
          <HighlightText>Exclusive</HighlightText>
          <HeaderText>Kenny Lofton </HeaderText>
          <HeaderText>Baseball Card NFTs</HeaderText>
          <SubHeaderText>
            Kenneth Lofton is an American former Major League Baseball center
            fielder. Lofton was a six-time All-Star, four-time Gold Glove Award
            winner, and at retirement.
          </SubHeaderText>
          <ButtonWrapperAnchor>
            <Button>Label</Button>
          </ButtonWrapperAnchor>
        </TextContainer>
        <ImageContainer>
          <img src={image} alt="mlb" />
        </ImageContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};
