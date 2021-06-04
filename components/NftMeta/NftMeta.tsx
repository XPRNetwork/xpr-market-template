import { FC } from 'react';
import Head from 'next/head';
import { IPFS_RESOLVER } from '../../utils/constants';
import { capitalize } from '../../utils';

type Props = {
  templateName?: string;
  collectionName: string;
  collectionDisplayName?: string;
  collectionAuthor: string;
  image?: string;
  video?: string;
};

export const NftMeta: FC<Props> = ({
  templateName,
  collectionName,
  collectionDisplayName,
  collectionAuthor,
  image,
  video,
}) => {
  const title = templateName || 'NFT';
  const description = `${
    collectionDisplayName || collectionName
  } by ${collectionAuthor}`;

  let metas = [
    {
      key: 'ogtitle',
      name: 'og:title',
      content: title,
    },
    {
      key: 'twtitle',
      name: 'twitter:title',
      content: title,
    },
    {
      key: 'ogdescription',
      name: 'og:description',
      content: description,
    },
    {
      key: 'twdescription',
      name: 'twitter:description',
      content: description,
    },
  ];

  if (video) {
    const videoUrl = `${IPFS_RESOLVER}${video}`;
    const videoWidth = '480';
    const videoHeight = '480';

    metas = metas.concat([
      {
        key: 'twcard',
        name: 'twitter:card',
        content: 'player',
      },
      {
        key: 'twplayer',
        name: 'twitter:player',
        content: videoUrl,
      },
      {
        key: 'twplayerheight',
        name: 'twitter:player:height',
        content: videoHeight,
      },
      {
        key: 'twplayerwidth',
        name: 'twitter:player:width',
        content: videoWidth,
      },
      {
        key: 'ogvideo',
        name: 'og:video',
        content: videoUrl,
      },
      {
        key: 'ogvideoheight',
        name: 'og:video:height',
        content: videoHeight,
      },
      {
        key: 'ogvideowidth',
        name: 'og:video:width',
        content: videoWidth,
      },
      {
        key: 'ogtype',
        name: 'og:type',
        content: 'video',
      },
    ]);
  } else if (image) {
    const imageUrl = `${IPFS_RESOLVER}${image}`;

    metas = metas.concat([
      {
        key: 'twcard',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        key: 'twimage',
        name: 'twitter:image',
        content: imageUrl,
      },
      {
        key: 'ogimage',
        name: 'og:image',
        content: imageUrl,
      },
    ]);
  }

  return (
    <Head>
      <title>
        {capitalize(collectionName)} - {templateName}
      </title>
      {metas.map((meta) => (
        <meta key={meta.key} name={meta.name} content={meta.content} />
      ))}
    </Head>
  );
};
