import { Dispatch, FC, SetStateAction } from 'react';
import {
  Container,
  DropdownMenu,
  DisabledInput,
  StyledSvg,
} from './NftDropdown.styled';
import { Asset } from '../../services/assets';
import { DetailPageProps, Typography } from '../../custom/customization';

type Props = {
  assets: Asset[];
  salePrices: {
    [asset_id: string]: string;
  };
  selectedAssetId: string;
  placeholderDropdownText: string;
  detailPageStyles: DetailPageProps;
  typography: Typography;
  setSelectedAssetId: Dispatch<SetStateAction<string>>;
};

const DownArrowIcon: FC<{ color: string }> = ({ color }) => (
  <StyledSvg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        fill={color}
        d="M18.3 8.6c-.5-.4-1.2-.4-1.7 0l-5 4.2-4.9-4.2a1.2 1.2 0 00-1.6 1.8l5.8 5c.5.4 1.1.4 1.6 0l5.7-5c.6-.4.6-1.2.2-1.7h-.1z"
      />
    </g>
  </StyledSvg>
);

export const NftDropdown: FC<Props> = ({
  assets,
  salePrices,
  selectedAssetId,
  placeholderDropdownText,
  detailPageStyles,
  typography,
  setSelectedAssetId,
}) => {
  const {
    dropdown: { borderColor, textColor, textFont, arrowDropdownColor },
  } = detailPageStyles;
  if (!assets.length) {
    return (
      <DisabledInput
        placeholder={placeholderDropdownText}
        disabled
        textFont={textFont}
        textColor={textColor}
        borderColor={borderColor}
        typography={typography}
      />
    );
  }

  return (
    <Container>
      <DropdownMenu
        name="assets"
        value={selectedAssetId}
        onChange={(e) => setSelectedAssetId(e.target.value)}
        textFont={textFont}
        textColor={textColor}
        borderColor={borderColor}
        typography={typography}>
        {assets.map(({ asset_id, template_mint }) => (
          <option key={template_mint} value={asset_id}>
            #{template_mint}
            {salePrices[asset_id] ? ` - ${salePrices[asset_id]}` : ''}
          </option>
        ))}
      </DropdownMenu>
      <DownArrowIcon color={arrowDropdownColor} />
    </Container>
  );
};
