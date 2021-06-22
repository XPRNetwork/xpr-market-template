FROM node:16-alpine

ARG NEXT_PUBLIC_CHAIN_ENDPOINTS
ARG NEXT_PUBLIC_BLOCK_EXPLORER
ARG NEXT_PUBLIC_NFT_ENDPOINT
ENV NEXT_PUBLIC_CHAIN_ENDPOINTS=$NEXT_PUBLIC_CHAIN_ENDPOINTS
ENV NEXT_PUBLIC_BLOCK_EXPLORER=$NEXT_PUBLIC_BLOCK_EXPLORER
ENV NEXT_PUBLIC_NFT_ENDPOINT=$NEXT_PUBLIC_NFT_ENDPOINT

# COPY .npmrc .npmrc
COPY package.json .
COPY custom custom
COPY components components
COPY hooks hooks
COPY pages pages
COPY public public
COPY services services
COPY styles styles
COPY types types
COPY utils utils
COPY tsconfig.json .
COPY next.config.js .
COPY next-env.d.ts .
COPY babel.config.json .
COPY yarn.lock .
COPY .storybook .storybook
COPY .prettierrc.js .
COPY .eslintrc.json .

RUN yarn && yarn build-storybook

EXPOSE 8080

CMD [ "yarn", "preview-build-storybook" ]
