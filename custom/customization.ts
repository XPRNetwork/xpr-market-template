const customizationJson = {
  collection: 'monsters',
  owner: 'monsters',
  typography: {
    h1: {
      font: 'Bebas Neue',
      size: '64px',
      fontWeight: '400',
      isItalic: false,
    },
    h2: {
      font: 'Bebas Neue',
      size: '32px',
      fontWeight: '400',
      isItalic: false,
    },
    h3: {
      font: 'Bebas Neue',
      size: '24px',
      fontWeight: '400',
      isItalic: true,
    },
    h4: {
      font: 'Roboto',
      size: '18px',
      fontWeight: '400',
      isItalic: false,
    },
    paragraph: {
      font: 'Roboto',
      size: '12px',
      fontWeight: '400',
      isItalic: false,
    },
    label: {
      font: 'Roboto',
      size: '14px',
      fontWeight: '600',
      isItalic: false,
    },
    caption: {
      font: 'Roboto',
      size: '14px',
      fontWeight: '400',
      isItalic: false,
    },
  },
  navbar: {
    logo: '/mlb-logo.png',
    logoLink: '/',
    backgroundColor: '#ffffff',
    defaultAvatarImage: '/default-avatar.png',
    navLinkFontType: 'label',
    navLinks: [
      // recommended 3 - 5
      {
        link: 'https://google.com',
        color: '#000000',
      },
      {
        link: 'https://google.com',
        color: '#000000',
      },
      {
        link: 'https://google.com',
        color: '#000000',
      },
      {
        link: 'https://google.com',
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
    secondaryBackgroundColor: 'lightgrey',
    borderColor: 'gray',
    borderRadius: '8px',
    minWidth: '300px',
    priceFont: {
      type: 'h4',
      color: '#000000',
    },
    countFont: {
      type: 'label',
      color: 'black',
    },
    titleFont: {
      type: 'h4',
      color: '#000000',
      carouselHeight: '32px',
    },
    collectionNameFont: {
      type: 'label',
      color: 'gray',
    },
  },
  featuredSection: {
    carousel: true,
    titleFont: {
      type: 'h2',
      color: '#000000',
    },
    backgroundColor: '#f2f2f2',
    carouselButtonsBackgroundColor: '#ffffff',
    carouselButtonsBorderColor: '#000000',
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
    imageShadow: false,
    cardTitleFont: {
      type: 'h1',
      color: 'black',
    },
    collectionNameFont: {
      type: 'caption',
      color: '#666666',
    },
    priceEditionLabelFont: {
      type: 'caption',
      color: '#666666',
    },
    priceFont: {
      type: 'h2',
      color: '#c71f3e',
    },
    editionFont: {
      type: 'h2',
      color: 'black',
    },
    cardDescriptionFont: {
      type: 'caption',
      color: '#666666',
    },
    errorFont: {
      type: 'caption',
      color: '#c71f3e',
    },
    button: {
      textColor: 'white',
      textFont: 'caption',
      backgroundColor: 'black',
    },
    dropdown: {
      borderColor: '#f2f2f2',
      arrowDropdownColor: '#666',
      textColor: 'black',
      textFont: 'caption',
    },
  },
};

export const generateFontImportLink = (): string => {
  const stylesByFont = {};
  Object.values(customizationJson.typography).forEach(
    ({ font, fontWeight, isItalic }) => {
      if (!stylesByFont[font] || !stylesByFont[font][fontWeight]) {
        stylesByFont[font] = {
          [fontWeight]: {
            shouldLoadItalic: isItalic,
          },
        };
      }

      if (isItalic) {
        stylesByFont[font][fontWeight] = {
          shouldLoadItalic: true,
        };
      }
    }
  );

  const fonts = Object.keys(stylesByFont).map((font) => {
    const styles = stylesByFont[font];
    let shouldLoadItalic = false;

    const partialStyleStrings = Object.keys(styles).map((weight) => {
      const iItalic = styles[weight].shouldLoadItalic;
      if (iItalic) {
        shouldLoadItalic = true;
      }
      return iItalic ? `${weight};1,${weight}` : `${weight}`;
    });

    const stylesString = shouldLoadItalic
      ? partialStyleStrings.map((string) => `0,${string}`).join(';')
      : partialStyleStrings.join(';');

    return `family=${font.replace(/\s/g, '+')}:${
      shouldLoadItalic ? 'ital,' : ''
    }wght@${stylesString}`;
  });

  return `https://fonts.googleapis.com/css2?${fonts.join('&')}&display=swap`;
};

export type ThemeProps = {
  theme: {
    typography: {
      h1: {
        font: string;
        size: string;
        fontWeight: string;
        isItalic: boolean;
      };
      h2: {
        font: string;
        size: string;
        fontWeight: string;
        isItalic: boolean;
      };
      h3: {
        font: string;
        size: string;
        fontWeight: string;
        isItalic: boolean;
      };
      h4: {
        font: string;
        size: string;
        fontWeight: string;
        isItalic: boolean;
      };
      paragraph: {
        font: string;
        size: string;
        fontWeight: string;
        isItalic: boolean;
      };
      label: {
        font: string;
        size: string;
        fontWeight: string;
        isItalic: boolean;
      };
      caption: {
        font: string;
        size: string;
        fontWeight: string;
        isItalic: boolean;
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
      borderColor: string;
      borderRadius: string;
      minWidth: string;
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
        carouselHeight: string;
      };
      collectionNameFont: {
        type: string;
        color: string;
      };
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

export default customizationJson;
