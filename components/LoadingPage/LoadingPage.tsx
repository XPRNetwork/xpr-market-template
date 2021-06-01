import { Container } from './LoadingPage.styled';
import { Spinner } from '../Spinner/Spinner';

type Props = {
  margin: string;
};

export const LoadingPage = ({ margin }: Props): JSX.Element => {
  return (
    <Container margin={margin}>
      <Spinner />
    </Container>
  );
};

LoadingPage.defaultProps = {
  margin: '25vh 0',
};
