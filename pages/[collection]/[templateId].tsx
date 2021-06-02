import { FC } from 'react';
import { useRouter } from 'next/router';
import { NftDetails } from '../../components/NftDetails/NftDetails';
import { Nft } from '../../components/Nft/Nft';
import { useFetchNft } from '../../hooks';
import { NftPageContainer } from '../../styles/templateId.styled';

interface RouterQuery {
  [query: string]: string;
}

const NftDetailPage: FC = () => {
  const router = useRouter();
  const { collection: caseSensitiveCollection, templateId } =
    router.query as RouterQuery;
  const collection = caseSensitiveCollection
    ? caseSensitiveCollection.toLowerCase()
    : '';
  const { template, isLoading, error } = useFetchNft({
    collection,
    templateId,
  });

  if (isLoading || error) {
    return null;
  }

  const { name, image, video } = template.immutable_data;
  return (
    <NftPageContainer>
      <Nft name={name} image={image} video={video} />
      <NftDetails template={template} />
    </NftPageContainer>
  );
};

export default NftDetailPage;
