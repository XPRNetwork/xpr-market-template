import styled from 'styled-components';
import customizationJson from '../custom/customization';
import { MaxWidth } from './MaxWidth.styled';

const {
  detailPage: { imagePlacement },
} = customizationJson;

export const NftPageContainer = styled(MaxWidth)`
  display: flex;
  justify-content: space-between;
  flex-direction: ${imagePlacement === 'left' ? 'row' : 'row-reverse'};
  padding: 76px 0;
  height: 100%;
`;
