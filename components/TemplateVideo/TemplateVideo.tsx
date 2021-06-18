/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, FC } from 'react';
import LazyLoad from 'react-lazyload';
import {
  VideoContainer,
  Video,
  CenterContainer,
  VideoError,
} from './TemplateVideo.styled';
import { useNavigatorUserAgent } from '../../hooks';
import { PlaceholderAsset } from '../Card/Card.styled';
import { useState } from 'react';

type Props = {
  src: string;
  borderRadius: string;
  secondaryBackgroundColor: string;
  autoPlay?: boolean;
  controls?: boolean;
  priceTag?: JSX.Element;
};

const IncompatibleVideoError = () => (
  <VideoError>
    Firefox does not support
    <br />
    Proton Market videos.
    <br />
    Please use another browser.
  </VideoError>
);

export const TemplateVideo: FC<Props> = ({
  src,
  priceTag,
  autoPlay = false,
  controls = true,
  borderRadius,
  secondaryBackgroundColor,
}) => {
  const { isDesktop, isBrowserVideoCompatible } = useNavigatorUserAgent();
  const refPlaceholder = useRef<HTMLDivElement>();
  const [hasControls, setHasControls] = useState(false);

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
    setTimeout(() => setHasControls(controls), 500);
  };

  return (
    <VideoContainer
      onClick={(e) => e.stopPropagation()}
      borderRadius={borderRadius}
      secondaryBackgroundColor={secondaryBackgroundColor}>
      <CenterContainer>
        {isBrowserVideoCompatible ? (
          <div>
            <PlaceholderAsset ref={refPlaceholder} />
            <LazyLoad height="100%" offset={100} once>
              <Video
                autoPlay={autoPlay}
                controls={hasControls}
                loop
                poster={isDesktop ? null : src}
                src={src}
                onLoadedData={removePlaceholder}
                onError={removePlaceholder}
              />
            </LazyLoad>
          </div>
        ) : (
          <IncompatibleVideoError />
        )}
        {priceTag}
      </CenterContainer>
    </VideoContainer>
  );
};
