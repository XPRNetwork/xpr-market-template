import { StyledSpinner } from './Spinner.styled';

type Props = {
  size: string;
  radius: string;
  hasBackground: boolean;
};

export const Spinner = ({
  size,
  radius,
  hasBackground,
}: Props): JSX.Element => (
  <StyledSpinner viewBox="0 0 50 50" size={size} hasBackground={hasBackground}>
    <circle
      className="path"
      cx="25"
      cy="25"
      r={radius}
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
);

Spinner.defaultProps = {
  size: '50px',
  radius: '20',
  hasBackground: false,
};
