<<<<<<< HEAD
import { toQueryString, addPrecisionDecimal } from '../utils';
import { getFromApi } from '../utils/browser-fetch';
import { getLowestPriceAsset } from './sales';

export type Template = {
  lowestPrice: string;
  lowestPriceSaleId: string;
  max_supply: string;
  collection: {
    name: string;
    author: string;
    collection_name: string;
  };
  immutable_data: {
    name: string;
    image: string;
    series: number;
    desc: string;
    video?: string;
  };
};

/**
 * Get a specific template detail
 * Mostly used in viewing a specific template's detail page
 * @param  {string} collectionName   The name of the collection the template belongs in
 * @param  {string} templateId       The specific template id number you need to look up details for
 * @return {Template[]}              Returns array of templates, most likely will only return one item in the array
 */

export const getTemplateDetails = async (
  collectionName: string,
  templateId: string
): Promise<Template> => {
  try {
    const templatesQueryObject = {
      collection_name: collectionName,
      ids: templateId,
      page: 1,
      limit: 1,
    };

    const templatesQueryParams = toQueryString(templatesQueryObject);
    const templatesResponse = await getFromApi<Template[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/templates?${templatesQueryParams}`
    );
    if (!templatesResponse.success || !templatesResponse.data.length) {
      throw new Error('NFT not found');
    }

    const saleForTemplateAsc = await getLowestPriceAsset(
      collectionName,
      templateId
    );

    const lowestPriceSale = saleForTemplateAsc[0];
    const lowestPrice =
      lowestPriceSale && lowestPriceSale.listing_price
        ? `${addPrecisionDecimal(
            lowestPriceSale.listing_price,
            lowestPriceSale.price.token_precision
          )} ${lowestPriceSale.listing_symbol}`
        : '';
    const lowestPriceSaleId =
      lowestPriceSale && lowestPriceSale.sale_id ? lowestPriceSale.sale_id : '';
    return {
      ...templatesResponse.data[0],
      lowestPrice,
      lowestPriceSaleId,
    };
  } catch (e) {
    throw new Error(e);
  }
=======
import { getFromApi } from '../utils/browser-fetch';
import { toQueryString, addPrecisionDecimal } from '../utils';
import { TOKEN_SYMBOL } from '../utils/constants';
import { Sale } from './sales';

export interface Collection {
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
}

export type SchemaFormat = {
  name: string;
  type: string;
};

export type Schema = {
  schema_name: string;
  format: SchemaFormat[];
  created_at_block: string;
  created_at_time: string;
};

type ImmutableData = {
  name: string;
  image?: string;
  series: number;
  desc: string;
  video?: string;
  model?: string;
  stage?: string;
  skybox?: string;
};

export interface Template {
  immutable_data?: ImmutableData;
  template_id?: string;
  contract?: string;
  collection?: Collection;
  schema?: Schema;
  name?: string;
  max_supply?: string;
  is_transferable?: boolean;
  is_burnable?: boolean;
  created_at_time?: string;
  created_at_block?: string;
  issued_supply?: string;
  lowestPrice?: string;
  totalAssets?: string;
  assetsForSale?: string;
}

type GetCollectionOptions = {
  type: string;
  limit?: number;
  page?: number;
};

/**
 * Get a list of templates within a collection by page
 * Mostly used in viewing all the templates of a collection (i.e. in the homepage or after searching for one collection)
 * @param  {string} type         The name of the collection
 * @param  {string} page         Page number of results to return (defaults to 1)
 * @return {Template[]}          Returns array of templates in that collection
 */

export const getTemplatesByCollection = async ({
  type,
  limit = 100,
}: GetCollectionOptions): Promise<Template[]> => {
  try {
    let templates = [];
    let page = 1;
    let hasResults = true;

    while (hasResults) {
      const templatesQueryObject = {
        collection_name: type,
        limit,
        page,
        has_assets: true,
      };

      const templatesQueryParams = toQueryString(templatesQueryObject);
      const templatesResponse = await getFromApi<Template[]>(
        `https://proton.api.atomicassets.io/atomicassets/v1/templates?${templatesQueryParams}`
      );

      if (!templatesResponse.success) {
        const errorMessage =
          typeof templatesResponse.error === 'object'
            ? templatesResponse.error.message
            : templatesResponse.message;
        throw new Error(errorMessage as string);
      }

      if (templatesResponse.data.length < limit || limit !== 100) {
        hasResults = false;
      }

      templates = templates.concat(templatesResponse.data);
      page += 1;
    }

    return templates;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Gets the lowest price of assets for sale for a collection's templates
 * Mostly used to display the lowest price of any of the templates with assets for sale in the collection
 * @param  {string} type               Name of collection that templates belong to
 * @return {Template[]}                Returns array of templates with an additional 'lowestPrice' flag
 */

export const getLowestPricesForAllCollectionTemplates = async ({
  type,
}: {
  type: string;
}): Promise<{ [id: string]: string }> => {
  const limit = 100;
  const lowestPriceByTemplateIds = {};
  let page = 1;
  let hasResults = true;

  while (hasResults) {
    const salesQueryObject = {
      collection_name: type,
      symbol: TOKEN_SYMBOL,
      order: 'desc',
      sort: 'created',
      limit,
      page,
    };

    const salesQueryParams = toQueryString(salesQueryObject);
    const salesResult = await getFromApi<Sale[]>(
      `https://proton.api.atomicassets.io/atomicmarket/v1/sales/templates?${salesQueryParams}`
    );

    console.log('sales result: ', salesResult);

    if (!salesResult.success) {
      const errorMessage =
        typeof salesResult.error === 'object'
          ? salesResult.error.message
          : salesResult.message;
      throw new Error(errorMessage as string);
    }

    for (const sale of salesResult.data) {
      const {
        listing_price,
        assets,
        price: { token_precision },
      } = sale;

      if (!assets.length) {
        continue;
      }

      const {
        template: { template_id },
      } = assets[0];

      lowestPriceByTemplateIds[template_id] = listing_price
        ? `${addPrecisionDecimal(
            listing_price,
            token_precision
          )} ${TOKEN_SYMBOL}`
        : '';
    }

    if (salesResult.data.length < limit) {
      hasResults = false;
    }

    page += 1;
  }

  return lowestPriceByTemplateIds;
>>>>>>> 6870b96 (adding functionality to get collection data)
};
