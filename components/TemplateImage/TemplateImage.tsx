import { useRef, FC } from 'react';
import LazyLoad from 'react-lazyload';
import { ImageContainer, DefaultImage, Image } from './TemplateImage.styled';
import { PlaceholderAsset } from '../Card/Card.styled';

type Props = {
  borderRadius: string;
  secondaryBackgroundColor: string;
  templateImgSrc?: string;
  fallbackImgSrc?: string;
  templateName: string;
  priceTag?: JSX.Element;
};

const TemplateImageChild = ({
  templateName,
  templateImgSrc,
  fallbackImgSrc,
}: {
  templateName: string;
  templateImgSrc: string;
  fallbackImgSrc: string;
}): JSX.Element => {
  const refPlaceholder = useRef<HTMLDivElement>();

  const removePlaceholder = () => refPlaceholder.current.remove();

  if (!templateImgSrc) {
    return (
      <DefaultImage>
        <img src="/placeholder-template-icon.svg" alt="placeholder" />
      </DefaultImage>
    );
  }

  return (
    <div>
      <PlaceholderAsset ref={refPlaceholder} />
      <LazyLoad height="100%" offset={100} once>
        <Image
          src={templateImgSrc}
          alt={templateName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImgSrc;
            removePlaceholder();
          }}
          onLoad={removePlaceholder}
        />
      </LazyLoad>
    </div>
  );
};

export const TemplateImage: FC<Props> = ({
  templateName,
  templateImgSrc,
  priceTag,
  fallbackImgSrc,
  borderRadius,
  secondaryBackgroundColor,
}) => {
  if (!fallbackImgSrc) {
    fallbackImgSrc = '/placeholder-template-image.png';
  }

  return (
    <ImageContainer
      className="template-image-container"
      borderRadius={borderRadius}
      secondaryBackgroundColor={secondaryBackgroundColor}>
      <TemplateImageChild
        templateName={templateName}
        fallbackImgSrc={fallbackImgSrc}
        templateImgSrc={templateImgSrc}
      />
      {priceTag}
    </ImageContainer>
  );
};
