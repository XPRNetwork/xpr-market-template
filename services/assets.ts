import { Template, Schema } from './templates';
import { Collection } from './collections';
import { toQueryString } from '../utils';
import { getFromApi } from '../utils/browser-fetch';

export type Asset = {
  name: string;
  data: Record<string, unknown>;
  owner: string;
  template: Template;
  asset_id: string;
  saleId: string;
  mutable_data?: Record<string, unknown>;
  immutable_data?: Record<string, unknown>;
  template_mint?: string;
  schema_mint?: string;
  collection_mint?: string;
  backed_tokens?: string[] | [];
  burned_by_account?: string | null;
  burned_at_block?: string | null;
  burned_at_time?: string | null;
  updated_at_block?: string;
  updated_at_time?: string;
  transferred_at_block?: string;
  transferred_at_time?: string;
  minted_at_block?: string;
  minted_at_time?: string;
  contract?: string;
  is_transferable?: boolean;
  is_burnable?: boolean;
  collection?: Collection;
  schema?: Schema;
  isForSale?: boolean;
  salePrice?: string;
};

/**
 * Gets a list of all user owned assets of a specific template
 * Mostly used in viewing all your owned assets and see which one is listed for sale at a glance.
 * @param owner       The account name of the owner of the assets to look up
 * @param templateId  The ID of the template of a group of assets
 * @returns {Asset[]} Returns array of Assets owned by the user of a specified template
 */

export const getAllUserAssetsByTemplate = async (
  templateId: string,
  owner: string
): Promise<Asset[]> => {
  try {
    const limit = 100;
    let assets = [];
    let hasResults = true;
    let page = 1;

    while (hasResults) {
      const queryObject = {
        owner,
        page,
        order: 'asc',
        sort: 'template_mint',
        template_id: templateId,
        limit,
      };
      const queryString = toQueryString(queryObject);
      const result = await getFromApi<Asset[]>(
        `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/assets?${queryString}`
      );

      if (!result.success) {
        throw new Error(result.message as unknown as string);
      }

      if (result.data.length < limit) {
        hasResults = false;
      }

      assets = assets.concat(result.data);
      page += 1;
    }

    return assets;
  } catch (e) {
    throw new Error(e);
  }
};
