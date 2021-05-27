import { FC } from 'react';
import {
  HeaderContainer,
  TextContainer,
  ImageContainer,
  HighlightText,
  SubHeaderText,
  HeaderText,
  Button,
  ButtonText,
} from './Header.styled';

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <TextContainer>
        <HighlightText>Exclusive</HighlightText>
        <HeaderText>Kenny Lofton </HeaderText>
        <SubHeaderText>
          Kenneth Lofton is an American former Major League Baseball center
          fielder. Lofton was a six-time All-Star, four-time Gold Glove Award
          winner, and at retirement.
        </SubHeaderText>
        <Button>
          <ButtonText>Label</ButtonText>
        </Button>
      </TextContainer>
      <ImageContainer />
    </HeaderContainer>
  );
};
