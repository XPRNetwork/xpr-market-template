import { Container } from './LoadingPage.styled';
import { Spinner } from '../Spinner/Spinner';

export const LoadingPage = (): JSX.Element => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};
