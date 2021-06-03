import styled from 'styled-components';

type InputProps = {
  hasError: boolean;
  halfWidth?: boolean;
  mr?: string;
  ml?: string;
  mb?: string;
  mt?: string;
  disabled?: boolean;
};

export const InputContainer = styled.div<InputProps>`
  border-radius: 8px;
  border: solid 1px ${({ hasError }) => (hasError ? '#f94e6c' : '#e6e6e6')};
  width: ${({ halfWidth }) => (halfWidth ? '50%' : '100%')};
  margin-right: ${({ mr }) => (mr ? mr : 0)};
  margin-left: ${({ ml }) => (ml ? ml : 0)};
  margin-top: ${({ mt }) => (mt ? mt : 0)};
  margin-bottom: ${({ mb }) => (mb ? mb : 0)};
  transition: 0.2s;
  display: flex;
  align-items: center;
  position: relative;

  :hover,
  :focus,
  :focus-visible {
    border: solid 1px ${({ hasError }) => (hasError ? '#f94e6c' : '#752eeb')};
  }

  ${({ disabled }) =>
    disabled &&
    `
    border: none;
    :hover,
    :focus,
    :focus-visible {
      border: none;
    }
  `}
`;

export const Input = styled.input`
  width: 100%;
  font-size: 16px;
  color: black;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  line-height: 24px;

  -moz-appearance: textfield;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  ::placeholder {
    color: #808080;
  }
`;

export const ErrorMessage = styled.p`
  position: absolute;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  top: 60px;
  left: 0;
  font-size: 14px;
  z-index: 1;
  background: #f94e6c;

  ::before {
    position: absolute;
    content: '';
    top: -6px;
    left: 16px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #f94e6c;
  }
`;
