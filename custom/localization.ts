const localizationJson = {
  en: {
    header: {
      highlightText: 'Exclusive',
      headerLine1: 'Kenny Lofton',
      headerLine2: 'Baseball Card NFTs',
      description:
        'Kenneth Lofton is an American former Major League Baseball centerfielder. Lofton was a six-time All-Star, four-time Gold Glove Award winner, and at retirement.',
      buttonText: 'Label',
    },
    navbar: {
      navLinks: ['BIO', 'BUSINESS', 'AUCTIONS', 'MY ITEMS'],
      balanceText: 'Balance',
      loginText: 'Connect Wallet',
    },
    detailPage: {
      priceLabelText: 'PRICE',
      editionLabelText: 'EDITION SIZE',
      placeholderPriceText: 'NOT FOR SALE',
      placeholderDropdownText: 'NO ASSETS',
      buyButtonText: 'BUY NOW',
      viewButtonText: 'VIEW ON PROTON MARKET',
      sellButtonText: 'SELL ON PROTON MARKET',
      cancelSaleButtonText: 'CANCEL SALE ON PROTON MARKET',
    },
    nftCard: {
      nftsLeft: 'LEFT',
      nftsOwned: 'OWNED',
      soldOut: 'SOLD OUT',
    },
    featuredSection: {
      heading: 'BREAKING NOW',
    },
    myItemsPage: {
      header: 'MY ITEMS',
    },
  },
};

export interface Text {
  header: {
    highlightText: string;
    headerLine1: string;
    headerLine2: string;
    description: string;
    buttonText: string;
  };
  navbar: {
    navLinks: string[];
    balanceText: string;
    loginText: string;
  };
  detailPage: {
    priceLabelText: string;
    editionLabelText: string;
    placeholderPriceText: string;
    placeholderDropdownText: string;
    buyButtonText: string;
    viewButtonText: string;
    sellButtonText: string;
    cancelSaleButtonText: string;
  };
  nftCard: {
    nftsLeft: string;
    nftsOwned: string;
    soldOut: string;
  };
  featuredSection: {
    heading: string;
  };
  myItemsPage: {
    header: string;
  };
}

export default localizationJson;
