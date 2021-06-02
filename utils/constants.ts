export const EMPTY_BALANCE = '0.00 XUSDC';
export const TOKEN_SYMBOL = 'XUSDC';
export const TOKEN_CONTRACT = 'xtokens';
export const TOKEN_PRECISION = 6;
export const SHORTENED_TOKEN_PRECISION = 2;
export const DEFAULT_COLLECTION = 'monsters';
export const PRICE_OF_RAM_IN_XPR = 0.0222;
export const PAGINATION_LIMIT = 8;
export const IPFS_RESOLVER = 'https://ipfs.io/ipfs/';

export const DEFAULT_SCHEMA = {
  series: 'uint16',
  name: 'string',
  desc: 'string',
  image: 'string',
  audio: 'string',
  video: 'string',
};

export const META = {
  twitterHandle: '@protonxpr',
  siteName: 'Proton Market',
  bannerImage: 'https://protonmarket.com/banner-rectangle.png',
  description:
    'Start creating and selling your own NFTs! The best way to monetize your talent. Free to get started.',
};

export interface RouterQuery {
  [query: string]: string;
}
