import styled, { css } from 'styled-components';

const inputCSS = css`
  font-size: 16px;
  margin-bottom: 12px;
  padding: 0 16px;
  width: 100%;
  height: 48px;
  color: #808080;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  line-height: 24px;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:hover {
    border: 1px solid #e6e6e6;
  }
`;

export const DisabledInput = styled.input`
  ${inputCSS}
`;

export const DropdownMenu = styled.select`
  ${inputCSS}
  background: url('/down-arrow.svg');
  background-repeat: no-repeat;
  background-position: top 5px right 15px;
  cursor: pointer;
`;
