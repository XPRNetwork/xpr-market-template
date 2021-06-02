const customizationJson = {
  typography: {
    h1: {
      font: 'bebas',
      size: '64px',
      fontWeight: '400',
    },
    h2: {
      font: 'bebas',
      size: '32px',
      fontWeight: '400',
    },
    h3: {
      font: 'bebas',
      size: '24px',
      fontWeight: '400',
    },
    h4: {
      font: 'avenir',
      size: '18px',
      fontWeight: '400',
    },
    paragraph: {
      font: 'avenir',
      size: '12px',
      fontWeight: '400',
    },
    label: {
      font: 'avenir',
      size: '14px',
      fontWeight: '600',
    },
    caption: {
      font: 'avenir',
      size: '14px',
      fontWeight: '400',
    },
  },
  navbar: {
    logo: '/mlb-logo.png',
    logoLink: '/',
    backgroundColor: '#ffffff',
    defaultAvatarImage: '/default-avatar.png',
    navLinkFontType: 'label',
    navLinks: [ // recommended 3 - 5
      {
        link: 'https://google.com',
        title: 'LINK 01',
        color: '#000000',
      },
      {
        link: 'https://google.com',
        title: 'LINK 02',
        color: '#000000',
      },
      {
        link: 'https://google.com',
        title: 'LINK 03',
        color: '#000000',
      },
      {
        link: 'https://google.com',
        title: 'LINK 04',
        color: '#000000',
      },
    ],
    buttonFontColor: '#000000',
    buttonBackgroundColor: 'transparent',
    buttonBorderColor: '#000000',
    buttonFontType: 'label',
    bottomBorderColor: '#cccccc',
  },
  footer: {
    logo: '/mlb-logo.png',
    socialMediaLinks: [
      {
        link: 'https://facebook.com',
        type: 'facebook',
        color: '#1877F2',
      },
      {
        link: 'https://twitter.com',
        type: 'twitter',
        color: '#1DA1F2',
      },
      {
        link: 'https://youtube.com',
        type: 'youtube',
        color: '#FF0000',
      },
    ],
    backgroundColor: 'white',
    borderColor: 'transparent',
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
    image: '/header-image.png',
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
      backgroundColor: 'black',
      link: 'https:/google.com',
    },
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
    },
  },
};

export default customizationJson;

export type ThemeProps = {
  theme: {
    typography: {
      h1: {
        font: string;
        size: string;
        fontWeight: string;
      };
      h2: {
        font: string;
        size: string;
        fontWeight: string;
      };
      h3: {
        font: string;
        size: string;
        fontWeight: string;
      };
      h4: {
        font: string;
        size: string;
        fontWeight: string;
      };
      paragraph: {
        font: string;
        size: string;
        fontWeight: string;
      };
      label: {
        font: string;
        size: string;
        fontWeight: string;
      };
      caption: {
        font: string;
        size: string;
        fontWeight: string;
      };
    };
    navbar: {
      logo: string;
      backgroundColor: string;
      defaultAvatarPng: string;
      navLinkFontType: string;
      navLinks: {
        link: string;
        title: string;
        color: string;
      }[];
      buttonFontColor: string;
      buttonBackgroundColor: string;
      buttonFontType: string;
      bottomBorderColor: string;
    };
    footer: {
      logo: string;
      socialMediaLinks: {
        link: string;
        type: string;
        color: string;
      }[];
      backgroundColor: string;
      borderColor: string;
    };
    nftCard: {
      mainBackgroundColor: string;
      secondaryBackgroundColor: string;
      priceFont: {
        type: string;
        color: string;
      };
      countFont: {
        type: string;
        color: string;
      };
      titleFont: {
        type: string;
        color: string;
      };
      collectionNameFont: {
        type: string;
        color: string;
      };
      borderColor: string;
      borderRadius: string;
    };
    featuredLayoutSection: {
      carousel: boolean;
      titleFont: {
        type: string;
        color: string;
      };
      backgroundColor: string;
    };
    header: {
      image: string;
      imagePlacement: string;
      backgroundColor: string;
      highlightFont: {
        isShown: boolean;
        type: string;
        color: string;
      };
      mainHeadingFont: {
        type: string;
        color: string;
      };
      subheadingFont: {
        type: string;
        color: string;
      };
      button: {
        isShown: boolean;
        textColor: string;
        textFont: string;
        backgroundColor: string;
        link: string;
      };
    };
    myItemsPage: {
      backgroundColor: string;
      headerFont: {
        type: string;
        color: string;
      };
    };
    detailPage: {
      imagePlacement: string;
      imageBackgroundColor: string;
      cardTitleFont: {
        type: string;
        color: string;
      };
      collectionNameFont: {
        type: string;
        color: string;
      };
      priceEditionLabelFont: {
        type: string;
        color: string;
      };
      priceEditionFont: {
        type: string;
        color: string;
      };
      cardDescriptionFont: {
        type: string;
        color: string;
      };
      button: {
        textColor: string;
        textFont: string;
        backgroundColor: string;
      };
      dropdown: {
        borderColor: string;
        arrowDropdownColor: string;
        textColor: string;
        textFont: string;
      };
    };
  };
};
