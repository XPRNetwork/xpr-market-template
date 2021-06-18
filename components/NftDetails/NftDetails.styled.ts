import styled from 'styled-components';
import { FontProps } from '../../custom/customization';
import { breakpoint } from '../../styles/Breakpoints';

export const Container = styled.div<{ imagePlacement: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 50vh;
  margin-left: ${({ imagePlacement }) =>
    imagePlacement === 'left' ? '48px' : '0'};
  margin-right: ${({ imagePlacement }) =>
    imagePlacement === 'left' ? '0' : '48px'};

  ${breakpoint.laptop`
    width: 60%;
    margin-left: ${({ imagePlacement }) =>
      imagePlacement === 'left' ? '24px' : '0'};
    margin-right: ${({ imagePlacement }) =>
      imagePlacement === 'left' ? '0' : '24px'};
  `}

  ${breakpoint.tablet`
    width: 100%;
    height: 100%;
    margin: 24px 0 0;
  `}
`;

export const Title = styled.h1<FontProps>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  line-height: 80px;

  ${breakpoint.tablet`
    font-size: 32px;
    line-height: 40px;
  `}
`;

export const CollectionName = styled.h3<FontProps>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  line-height: 24px;
  margin: 0 0 24px;

  ${breakpoint.tablet`
    font-size: 14px;
  `}
`;

export const PriceEditionLabel = styled.label<FontProps>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  line-height: 24px;

  ${breakpoint.tablet`
    font-size: 10px;
    line-height: 16px;
  `}
`;

export const Price = styled.h2<FontProps>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  line-height: 40px;

  ${breakpoint.tablet`
    font-size: 22px;
    line-height: 32px;
  `}
`;

export const Edition = styled.h2<FontProps>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  line-height: 40px;

  ${breakpoint.tablet`
    font-size: 22px;
    line-height: 32px;
  `}
`;

export const Description = styled.p<FontProps>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  margin-top: 24px;
  line-height: 24px;

  ${breakpoint.tablet`
    font-size: 14px;
  `}
`;
