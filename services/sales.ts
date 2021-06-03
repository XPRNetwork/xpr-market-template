import { getFromApi } from '../utils/browser-fetch';
import { addPrecisionDecimal, toQueryString } from '../utils';
import { TOKEN_SYMBOL } from '../utils/constants';
import { Asset } from './assets';
import { Collection } from './collections';

type Price = {
  token_contract: string;
  token_symbol: string;
  token_precision: number;
  median: number | null;
  amount: number;
};

export type SaleData = {
  saleIds: {
    [asset_id: string]: string;
  };
  salePrices: {
    [asset_id: string]: string;
  };
};

export type Sale = {
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
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/sales?${queryString}`
    );

    if (!saleRes.success) {
      throw new Error(saleRes.message as unknown as string);
    }

    return saleRes.data;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Get the unfulfilled sales for a specific template
 * Mostly used in purchasing an asset of a specific template
 * @param  {string} templateId     The template id of an asset you want to purchase
 * @return {SaleData}       Returns a SaleData including a record of sale IDs by asset ID and a record of sales price by asset ID
 */

export const getSaleDataForTemplate = async (
  template_id: string,
  owner: string
): Promise<SaleData> => {
  try {
    const limit = 100;
    let sales = [];
    let hasResults = true;
    let page = 1;

    while (hasResults) {
      const queryObject = {
        state: 1,
        sort: 'template_mint',
        order: 'asc',
        symbol: TOKEN_SYMBOL,
        template_id,
        page,
        owner,
        limit,
      };
      const queryParams = toQueryString(queryObject);
      const result = await getFromApi<Asset[]>(
        `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/sales?${queryParams}`
      );

      if (!result.success) {
        throw new Error(result.message as unknown as string);
      }

      if (result.data.length < limit) {
        hasResults = false;
      }

      sales = sales.concat(result.data);
      page += 1;
    }

    const salePrices = {};
    const saleIds = {};
    for (const sale of sales) {
      const {
        assets,
        listing_price,
        listing_symbol,
        sale_id,
        price: { token_precision },
      } = sale;

      assets.forEach(({ asset_id }) => {
        saleIds[asset_id] = sale_id;
        salePrices[asset_id] = `${addPrecisionDecimal(
          listing_price,
          token_precision
        )} ${listing_symbol}`;
      });
    }

    return {
      saleIds,
      salePrices,
    };
  } catch (e) {
    throw new Error(e);
  }
};
