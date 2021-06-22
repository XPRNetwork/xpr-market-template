import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import { SHORTENED_TOKEN_PRECISION } from './constants';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface QueryParams {
  collection_name?: string;
  template_id?: string;
  ids?: string;
  sort?: string;
  order?: string;
  symbol?: string;
  state?: number;
  limit?: number;
  page?: number;
}

export const toQueryString = (queryObject: QueryParams): string => {
  return Object.keys(queryObject)
    .map(
      (key) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(queryObject[key])
    )
    .join('&');
};

export const capitalize = (word: string): string => {
  if (!word) return '';
  return word[0].toUpperCase() + word.slice(1);
};

export const formatNumber = (numberString: string): string =>
  numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const asyncForEach = async (
  array: unknown[],
  callback: (element: unknown, index: number, array: unknown[]) => void
): Promise<void> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const parseTimestamp = (timestamp: string): string => {
  if (timestamp) {
    return `${dayjs(+timestamp)
      .tz('America/Los_Angeles')
      .format('MMM DD, YYYY, h:mm A')} PST`;
  }
  return '';
};

export const addPrecisionDecimal = (
  number: string,
  precision: number,
  noCommas?: boolean
): string => {
  if (number && number.includes('.')) return formatThousands(number);
  if (number && number.length > precision) {
    const insertDecimalAtIndex = number.length - precision;
    const numberString =
      number.slice(0, insertDecimalAtIndex) +
      '.' +
      number.slice(insertDecimalAtIndex);
    if (noCommas) {
      return numberString;
    }
    return formatThousands(parseFloat(numberString).toString());
  }

  let prependZeros = '';
  for (let i = 0; i < precision - number.length; i++) {
    prependZeros += '0';
  }
  const numberString = `0.${prependZeros + number}`;
  if (noCommas) {
    return numberString;
  }
  return formatThousands(parseFloat(numberString).toString());
};

export const formatPrice = (
  priceString: string,
  tokenPrecision?: number
): string => {
  if (!priceString) return '';
  const [price, currency] = priceString.split(' ');
  const amount = formatThousands(
    parseFloat(price.replace(/[,]/g, '')).toFixed(
      tokenPrecision || SHORTENED_TOKEN_PRECISION
    )
  );
  return `${amount} ${currency}`;
};

export const formatThousands = (numberString: string): string => {
  if (!numberString) return '';
  const [integers, decimals] = numberString.split('.');
  let salePrice = parseFloat(integers.replace(/[,]/g, '')).toLocaleString();
  salePrice = decimals ? salePrice + '.' + decimals : salePrice;
  return salePrice;
};

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
