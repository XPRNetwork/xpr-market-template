const customizationJson = {
  typography: {
    h1: {
      font: 'bebas',
      size: '64px',
      fontWeight: '400'
    },
    h2: {
      font: 'bebas',
      size: '32px',
      fontWeight: '400'
    },
    h3: {
      font: 'bebas',
      size: '24px',
      fontWeight: '400'
    },
    h4: {
      font: 'avenir',
      size: '18px',
      fontWeight: '400'
    },
    paragraph: {
      font: 'avenir',
      size: '12px',
      fontWeight: '400'
    },
    label: {
      font: 'avenir',
      size: '14px',
      fontWeight: '600',
    },
    caption: {
      font: 'avenir',
      size: '14px',
      fontWeight: '400'
    }
  },
  navbar: {
    logo: 'https://google.com',
    backgroundColor: '#eeeeee',
    defaultAvatarPng: 'https://google.com',
    navLinkFontType: 'label',
    navLinks: [{
      link: 'https://protonmarket.com',
      title: 'Market',
      color: '#ffffff',
    }],
    buttonFontColor: '#ffffff',
    buttonBackgroundColor: '#000000',
    buttonFontType: 'label',
    bottomBorderColor: '#ffffff',
  },
  footer: {
    logo: 'https://google.com',
    socialMediaLinks: [{
      link: 'https://facebook.com',
      type: 'facebook',
      color: '#0f0f0f'
    },
    {
      link: 'https://twitter.com',
      type: 'twitter',
      color: '#0f0f0f'
    }],
    backgroundColor: '#ffffff'
  },
  nftCard: {
    mainBackgroundColor: '#ffffff',
    secondaryBackgroundColor: '#000000',
    priceFont: {
      type: 'h4',
      color: '#000000',
    },
    countFont: {
      type: 'label',
      color: '#f0f0f0',
    },
    titleFont: {
      type: 'h4',
      color: '#000000',
    },
    collectionNameFont: {
      type: 'label',
      color: '#f0f0f0',
    },
    borderColor: '#0f0f0f',
    borderRadius: '4px',
  },
  featuredLayoutSection: {
    carousel: false,
    titleFont: {
      type: 'h2',
      color: '#ffffff',
    },
    backgroundColor: 'grey',
  },
  header: {
    image: 'https://google.com/image.png',
    imagePlacement: 'right',
    backgroundColor: 'white',
    highlightFont: {
      isShown: true,
      type: 'paragraph',
      color: 'red',
    },
    mainHeadingFont: {
      type: 'h1',
      color: '#000000',
    },
    subheadingFont: {
      type: 'h4',
      color: 'grey',
    },
    button: {
      isShown: true,
      textColor: 'white',
      textFont: 'caption',
      backgroundColor: '#ffffff',
      link: 'https://goestohere.com'
    }
  },
  myItemsPage: {
    backgroundColor: '#ffffff',
    headerFont: {
      type: 'h2',
      color: 'black',
    },
  },
  detailPage: {
    imagePlacement: 'left',
    imageBackgroundColor: '#efefef',
    cardTitleFont: {
      type: 'h1',
      color: 'black',
    },
    collectionNameFont: {
      type: 'caption',
      color: 'red',
    },
    priceEditionLabelFont: {
      type: 'caption',
      color: '#ffffff',
    },
    priceEditionFont: {
      type: 'h2',
      color: '#ffffff',
    },
    cardDescriptionFont: {
      type: 'caption',
      color: 'grey',
    },
    button: {
      textColor: 'white',
      textFont: 'caption',
      backgroundColor: '#ffffff',
    },
    dropdown: {
      borderColor: '#0f0f0f',
      arrowDropdownColor: '#000000',
      textColor: 'black',
      textFont: 'caption',
    }
  },
};

export default customizationJson;