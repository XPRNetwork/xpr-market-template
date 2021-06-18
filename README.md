## Documentation for Editing and Updating Proton Market Template

To update and edit the text and colors/font and various other styles of the site, please look through the documentation [here](https://docs.google.com/document/d/12C-lWflPDy3J2mo35X_yE3JiM6mSz18mB1PUQpB4dRY/edit?usp=sharing).

## Getting Started

This runs on v15.0.0 Node. Please make sure you have Node installed before trying to install this repo.

To get started:

```
git clone https://github.com/ProtonProtocol/proton-market-template.git

yarn install
```

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Customization

To view customizable components on Storybook:

```bash
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

You can start previewing your customizations by modifying the fields in the **Controls** section below each component.

![proton-market-template-storybook](https://user-images.githubusercontent.com/32081352/122460328-d578a700-cf66-11eb-8a42-61040ec82f07.gif)

Note: only fonts on [Google Fonts](https://fonts.google.com/) are available for font customization.

## .env

Please create a `.env` file that uses either the Testnet or the Mainnet variables in the `.env.template` file.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
