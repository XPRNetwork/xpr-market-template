import styled from 'styled-components';

export interface ContainerProps {
  margin?: string;
}

export const Container = styled.section<ContainerProps>`
  width: 100%;
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
