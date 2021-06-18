import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { Typography } from '../../custom/customization';
import { breakpoint } from '../../styles/Breakpoints';

export const PageContainer = styled(MaxWidth)<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex-direction: column;
  justify-content: flex-start;
  min-height: calc(100vh - 96px - 96px);
  overflow: scroll;

  ${breakpoint.mobile`
    ${`min-height: calc(100vh - 96px - 72px)`};
  `}
`;

export const HeaderText = styled.span<{
  type: string;
  color: string;
  typography: Typography;
}>`
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  color: ${(props) => props.color};
  align-self: flex-start;
  margin-top: 56px;
  margin-bottom: 65px;
  line-height: 1.25;

  ${breakpoint.mobile`
    margin-top: 31px;
    margin-bottom: 40px;
    font-size: 25px;
  `}
`;
