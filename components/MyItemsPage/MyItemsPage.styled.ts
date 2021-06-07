import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import customizationJson from '../../custom/customization';
import { breakpoint } from '../../styles/Breakpoints';

const {
  myItemsPage: { backgroundColor, headerFont },
  typography,
} = customizationJson;

export const PageContainer = styled(MaxWidth)`
  background-color: ${backgroundColor};
  flex-direction: column;
  justify-content: flex-start;
  min-height: calc(100vh - 96px - 96px);
  overflow: scroll;

  ${breakpoint.mobile`
    ${`min-height: calc(100vh - 96px - 72px)`};
  `}
`;

export const HeaderText = styled.span`
  font-family: ${typography[headerFont.type].font};
  font-size: ${typography[headerFont.type].size};
  color: ${headerFont.color};
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
