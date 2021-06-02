import { Template } from './templates';
import { getFromApi } from '../utils/browser-fetch';
import { toQueryString } from '../utils';
import { TOKEN_SYMBOL, NFT_ENDPOINT } from '../utils/constants';

type Price = {
  token_contract: string;
  token_symbol: string;
  token_precision: number;
  median: number | null;
  amount: number;
};

type Asset = {
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
  isForSale?: boolean;
  salePrice?: string;
};

type Collection = {
  author: string;
  collection_name: string;
  name?: string | null;
  img?: string | null;
  allow_notify?: boolean;
  authorized_accounts?: string[];
  notify_accounts?: string[] | [];
  market_fee?: number;
  created_at_block?: string;
  created_at_time?: string;
  order?: number;
  sales?: string;
  volume?: string;
  data?: {
    img?: string;
    name?: string;
    description?: string;
  };
};

type Sale = {
  market_contract: string;
  assets_contract: string;
  sale_id: string;
  seller: string;
  buyer: string;
  offer_id: string;
  price: Price;
  listing_price: string;
  listing_symbol: string;
  assets: Asset[];
  collection_name: string;
  collection: Collection;
  maker_marketplace: string;
  taker_marketplace: string;
  is_seller_contract: boolean;
  updated_at_block: string;
  updated_at_time: string;
  created_at_block: string;
  created_at_time: string;
  state: number;
  asset_serial: string;
};

export const getLowestPriceAsset = async (
  collection: string,
  templateId: string
): Promise<Sale[]> => {
  try {
    const queryObject = {
      collection_name: collection,
      template_id: templateId,
      sort: 'price',
      order: 'asc',
      state: 1, // Assets listed for sale
      limit: 1,
      symbol: TOKEN_SYMBOL,
    };
    const queryString = toQueryString(queryObject);
    const saleRes = await getFromApi<Sale[]>(
      `${NFT_ENDPOINT}/atomicmarket/v1/sales?${queryString}`
    );

    if (!saleRes.success) {
      throw new Error(saleRes.message as unknown as string);
    }

    return saleRes.data;
  } catch (e) {
    throw new Error(e);
  }
};
