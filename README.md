## Documentation for Customizing the Proton Market Template

To update, edit text, fonts, and various other styles of the site, please look
through the [Proton Market Templates Documentation].

To view the interactive tool that allows you to customize each of the components listed in the documentation, please visit the [Proton Market Template Sandbox].

CodeSandBox: [Link](https://codesandbox.io/s/young-hooks-37k2bv)

## Getting Started

The Proton Market Template runs on Node v16.0.0. Please make sure you have Node
installed before trying to install this repo.

To get started:

```
git clone https://github.com/ProtonProtocol/proton-market-template.git

yarn install
```

## Environment Variables

Please create a `.env` file that uses either Testnet or Mainnet variables within
the `.env.template` file.

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

## Application Preview

The [Proton Market Template Sandbox] and the [Proton Market Template
Documentation] display the site broken down into sections and component forms.
To preview the application as a whole you must start up the development server:

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) within a browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page
auto-updates as you edit the files.

![homepage](https://user-images.githubusercontent.com/18355075/122977725-97a2c680-d34a-11eb-8ef5-7a7be5e7be19.png)

![my-items](https://user-images.githubusercontent.com/18355075/122977648-81950600-d34a-11eb-8c68-924896e26c12.png)

![buy-item](https://user-images.githubusercontent.com/18355075/122977850-b86b1c00-d34a-11eb-8274-29c122c9d55b.png)

![sell-item](https://user-images.githubusercontent.com/18355075/122977855-b903b280-d34a-11eb-8671-19ffe2e4fdff.png)

## Customize the Application

To view customizable components on Storybook:

```bash
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) within a browser to see the
result.

### 1. Preview custom styles

To preview customization, start by modifying the fields in the **Controls**
section below each component. You can access a deployed version of Storybook
here: https://sandbox.protonmarket.com. You can also access Storybook locally by
running `yarn storybook` and visiting
[http://localhost:6006](http://localhost:6006).

![proton-market-template-storybook](https://user-images.githubusercontent.com/32081352/122460328-d578a700-cf66-11eb-8a42-61040ec82f07.gif)

**Note:** In the `Navbar` component, a toggle may be used and founded in the
`isLoggedIn` field to preview the `Navbar` in the logged-in and not logged-in
states. This can be used to observe the `Navbar` as an authenticated user or
unauthenticated visitor.

### 2. Preview custom typography

Custom fonts may be previewed on Storybook.

Currently, a selection of 12 fonts may be previewed on Storybook by default. To
request a custom font to be added to Storybook for preview, please contact us
with the font name, specific font weight/styling, and a link to the Google Font
(i.e. "Open Sans (Regular 400 italic):
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
customization. Make sure to copy + paste the same `typography` object when
previewing any application-wide typography customization, otherwise you will
overwrite the changes made.

In order to deploy your custom styles and typography, the `RAW` button may be
clicked to view the JSON properties generated for each component. 

<img width="800" alt="proton-market-template-click-raw"
src="https://user-images.githubusercontent.com/32081352/122802129-d87eda80-d279-11eb-9688-525cb88a857f.png">

Now select and copy the JSON into the application's `customization.ts` file.
Each Storybook customization field has a corresponding property in the
`customization.ts` and `localization.ts` files (see below).

<img width="800" alt="proton-market-template-copy-customizations"
src="https://user-images.githubusercontent.com/32081352/122802136-da489e00-d279-11eb-8fd4-cfacd692f2c6.png">

#### Customization files: `customization.ts` and `localization.ts`

This project includes a folder named `custom` that contains two files:
`customization.ts` and `localization.ts`. These two files are used to customize
the styling and text of the application. To update, edit text, colors, font, and
various other styles of the site, please look through the [Proton Market
Templates Documentation].

In the `customization.ts` file, information about custom styles will be
provided. Featured collections may also be customized under `collection` along
with the collection's creator (referenced as `owner`). For the rest of the
properties, copy + paste the `RAW` JSON customization fields from Storybook.

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

In the `localization.ts` file, information about custom text may be found. This
may also be used to specify different text for each language locale (i.e. `en`
for English). For the `header` field under `myItemsPage`, this can be used to
specify the text used for the header of a user's personal collection page. For
the rest of the properties, copy + paste the `RAW` JSON customization fields
from Storybook.

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

Copy + paste the `RAW` JSON for each customization field to replace the
properties of the `customizationJson` object in `customization.ts` and the
`localizationJson` in `localization.ts`.

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

Check out the [Next.js deployment
documentation](https://nextjs.org/docs/deployment) for more details.

[Proton Market Templates
Documentation]: https://docs.google.com/document/d/12C-lWflPDy3J2mo35X_yE3JiM6mSz18mB1PUQpB4dRY
[Proton Market Template Sandbox]: https://sandbox.protonmarket.com
[API routes]: https://nextjs.org/docs/api-routes/introduction
