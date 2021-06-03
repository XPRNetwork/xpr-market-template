import { Dispatch, FC, SetStateAction } from 'react';
import { DropdownMenu, DisabledInput } from './NftSaleDropdown.styled';
import { Asset } from '../../services/assets';

type Props = {
  assets: Asset[];
  salePrices: {
    [asset_id: string]: string;
  };
  selectedAssetId: string;
  setSelectedAssetId: Dispatch<SetStateAction<string>>;
};

export const NftSaleDropdown: FC<Props> = ({
  assets,
  salePrices,
  selectedAssetId,
  setSelectedAssetId,
}) => {
  if (!assets.length) {
    return <DisabledInput placeholder="No assets" disabled />;
  }

  return (
    <DropdownMenu
      name="assets"
      value={selectedAssetId}
      onChange={(e) => setSelectedAssetId(e.target.value)}>
      {assets.map(({ asset_id, template_mint }) => (
        <option key={template_mint} value={asset_id}>
          #{template_mint}
          {salePrices[asset_id] ? ` - ${salePrices[asset_id]}` : ''}
        </option>
      ))}
    </DropdownMenu>
  );
};
