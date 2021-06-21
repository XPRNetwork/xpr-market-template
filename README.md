## Documentation for Customizing the Proton Market Template

To update and edit the text and colors/font and various other styles of the
site, please look through the [Proton Market Templates
documentation](https://docs.google.com/document/d/12C-lWflPDy3J2mo35X_yE3JiM6mSz18mB1PUQpB4dRY).

## Getting Started

This runs on v15.0.0 Node. Please make sure you have Node installed before
trying to install this repo.

To get started:

```
git clone https://github.com/ProtonProtocol/proton-market-template.git

yarn install
```

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `pages/index.js`. The page
auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on
[http://localhost:3000/api/hello](http://localhost:3000/api/hello). This
endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are
treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead
of React pages.

## Environment Variables

Please create a `.env` file that uses either the Testnet or the Mainnet
variables in the `.env.template` file.

For mainnet, your `.env` file should be:
```
NEXT_PUBLIC_CHAIN_ENDPOINTS='https://proton.eoscafeblock.com, https://proton.greymass.com'
NEXT_PUBLIC_BLOCK_EXPLORER='https://proton.bloks.io/block/'
NEXT_PUBLIC_NFT_ENDPOINT='https://proton.api.atomicassets.io'
```

For testnet, your `.env` file should be:
```
NEXT_PUBLIC_NFT_ENDPOINT='https://test.proton.api.atomicassets.io'
NEXT_PUBLIC_CHAIN_ENDPOINTS='https://testnet.protonchain.com'
NEXT_PUBLIC_BLOCK_EXPLORER='https://proton-test.bloks.io/block/'
```

## Customize the Application

To view customizable components on Storybook:

```bash
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the
result.

### 1. Preview custom styles

You can start previewing your customizations by modifying the fields in the
**Controls** section below each component.

![proton-market-template-storybook](https://user-images.githubusercontent.com/32081352/122460328-d578a700-cf66-11eb-8a42-61040ec82f07.gif)

### 2. Preview custom typography

You can preview custom font selections on Storybook.

Currently, you have a selection of 12 fonts that can be previewed on Storybook.
If you would like us to add a specific font to Storybook for preview, please
contact us with the font name, specific font weight/styling, and a link to the
Google Font (i.e. "Open Sans (Regular 400 italic):
https://fonts.google.com/specimen/Open+Sans").

**Available fonts [(Google Fonts
link)](https://fonts.google.com/share?selection.family=Lato%7CMontserrat%7CNoto%20Sans%7CNoto%20Sans%20JP%7COpen%20Sans%7COswald%7CPoppins%7CRaleway%7CRoboto%7CRoboto%20Condensed%7CRoboto%20Mono%7CSource%20Sans%20Pro):**
- Lato (Regular 400)
- Montserrat (Regular 400)
- Noto Sans (Regular 400)
- Noto Sans JP (Regular 400)
- Open Sans (Regular 400)
- Oswald (Regular 400)
- Poppins (Regular 400)
- Raleway (Regular 400)
- Roboto (Regular 400)
- Roboto Condensed (Regular 400)
- Roboto Mono (Regular 400)
- Source Sans Pro (Regular 400)

**Note:** Only fonts on [Google Fonts](https://fonts.google.com/) are available
for font customization. Each Storybook component is a sandboxed environment -
this means, when customizing the `typography` prop, you'll need to copy + paste
the same `typography` object otherwise you will overwrite your own changes.

![proton-market-template-storybook-typography](https://user-images.githubusercontent.com/32081352/122600083-21d5ec80-d024-11eb-9c44-6885b163c004.gif)

### 3. Deploy custom styles and typography

Each component will have three customization fields: `___Text`, `___Styles`, and
`typography`. Each application only has **one** global `typography`
customization. Make sure you copy + paste the same `typography` object when
previewing any application-side typography customization, otherwise you will
overwrite your own changes.

In order to deploy your custom styles and typography, you can click the `RAW`
button to view the JSON properties generated for each component. 

<img width="800" alt="proton-market-template-click-raw"
src="https://user-images.githubusercontent.com/32081352/122802129-d87eda80-d279-11eb-9688-525cb88a857f.png">

Now you'll want to select and copy the JSON into the application's
`customization.ts` file. Each Storybook customization field has a corresponding
property in the `customization.ts` and `localization.ts` files (see below).

<img width="800" alt="proton-market-template-copy-customizations"
src="https://user-images.githubusercontent.com/32081352/122802136-da489e00-d279-11eb-8fd4-cfacd692f2c6.png">

#### Customization files: `customization.ts` and `localization.ts`

In this project, there is a folder named `custom` that includes two files:
`customization.ts` and `localization.ts`. These two files are used to customize
the styling and text of the application. To update and edit the text and
colors/font and various other styles of the site, please look through the
[Proton Market Templates
documentation](https://docs.google.com/document/d/12C-lWflPDy3J2mo35X_yE3JiM6mSz18mB1PUQpB4dRY).

In the `customization.ts` file, you'll find information about custom styles. You
can also customize the application's featured `collection` and the collection's
creator (referenced as `owner`). For the rest of the properties, you can copy +
paste the `RAW` JSON customization fields from Storybook.

**customization.ts:**

```ts
const customizationJson: ThemeProps = {
  collection: 'cryptocadets',
  owner: 'cryptocadets',
  typography: _____.
  navbar: _____,
  footer: _____,
  nftCard: _____,
  featuredSection: _____,
  header: _____,
  myItemsPage: _____,
  detailPage: _____,
};
```

In the `localization.ts` file, you'll find information about custom text. You
can specify different text for each language locale (i.e. `en` for English). For
the `header` field under `myItemsPage`, you can specify the text you would like
as the header for a user's personal collection page. For the rest of the
properties, you can copy + paste the `RAW` JSON customization fields from
Storybook.

**localization.ts:**

```ts
const localizationJson: LocalizationText = {
  en: {
    header: _____,
    navbar: _____,
    detailPage: _____,
    nftCard: _____,
    featuredSection: _____,
    myItemsPage: {
      header: 'MY ITEMS',
    };
  },
};
```

You can copy + paste your `raw` JSON for each customization field to fill
replace the properties of the `customizationJson` object in `customization.ts`
and the `localizationJson` in `localization.ts`.

Below are the customization fields and their corresponding property in the
`customization.ts` and `localization.ts` files:

**customization.ts:**

| Storybook Customization Field | Customization.ts Property |
| ----------------------------- | ------------------------- |
| `featuredSectionStyles`       | `featuredSection`         |
| `nftCardStyles`               | `nftCard`                 |
| `footerStyles`                | `footer`                  |
| `headerStyles`                | `header`                  |
| `navbarStyles`                | `navbar`                  |
| `detailPageStyles`            | `detailPage`              |

**localization.ts:**

| Storybook Customization Field | Localization.ts Property |
| ----------------------------- | ------------------------- |
| `featuredSectionText`         | `featuredSection`         |
| `nftCardText`                 | `nftCard`                 |
| `headerText`                  | `header`                  |
| `navbarText`                  | `navbar`                  |
| `detailPageText`              | `detailPage`              |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub
repository](https://github.com/vercel/next.js/) - your feedback and
contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel
Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment
documentation](https://nextjs.org/docs/deployment) for more details.
