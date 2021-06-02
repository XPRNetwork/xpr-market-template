import { toQueryString, addPrecisionDecimal } from '../utils';
import { getFromApi } from '../utils/browser-fetch';
import { getLowestPriceAsset } from './sales';

export type Template = {
  lowestPrice: string;
  max_supply: string;
  collection: {
    name: string;
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

    return {
      ...templatesResponse.data[0],
      lowestPrice,
    };
  } catch (e) {
    throw new Error(e);
  }
};
