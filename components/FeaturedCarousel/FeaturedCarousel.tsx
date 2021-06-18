import { useState, useEffect, FC } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import { Template } from '../../services/templates';
import { Card } from '../../components';
import {
  CarouselContainer,
  CarouselStyleFix,
  ButtonBackContainer,
  ButtonNextContainer,
} from './FeaturedCarousel.styled';
import { useWindowSize } from '../../hooks';
import {
  FeaturedSectionProps,
  NftCardProps,
  Typography,
} from '../../custom/customization';
import { NftCardTextProps } from '../../custom/localization';

type FeaturedCarouselProps = {
  templates: Template[];
  styles: FeaturedSectionProps;
  nftCardText: NftCardTextProps;
  nftCardStyles: NftCardProps;
  typography: Typography;
};

export const FeaturedCarousel: FC<FeaturedCarouselProps> = ({
  templates,
  styles,
  nftCardText,
  nftCardStyles,
  typography,
}) => {
  const [slideStep, setSlideStep] = useState<number>(4);
  const [visibleSlides, setVisibleSlides] = useState<number>(4);
  const { isDesktop, isLaptop, isTablet, isMobile } = useWindowSize();

  useEffect(() => {
    if (isDesktop) {
      setVisibleSlides(4);
      setSlideStep(4);
    } else if (isLaptop) {
      setVisibleSlides(3);
      setSlideStep(3);
    } else if (isTablet) {
      setVisibleSlides(2);
      setSlideStep(2);
    } else {
      setVisibleSlides(1);
      setSlideStep(1);
    }
  }, [isDesktop, isLaptop, isTablet, isMobile]);

  return (
    <CarouselContainer>
      <CarouselStyleFix>
        <CarouselProvider
          naturalSlideWidth={320}
          naturalSlideHeight={504}
          isIntrinsicHeight
          step={slideStep}
          dragStep={slideStep}
          visibleSlides={visibleSlides}
          infinite
          totalSlides={templates.length}
          dragEnabled={true}>
          <Slider>
            {templates.map((template, i) => (
              <Slide index={i} key={`${template.template_id}-${i}`}>
                <Card
                  nftCardText={nftCardText}
                  template={template}
                  type="featured"
                  nftCardStyles={nftCardStyles}
                  typography={typography}
                  isCarousel
                />
              </Slide>
            ))}
          </Slider>
          <ButtonBackContainer
            isVisible={templates.length > visibleSlides}
            carouselButtonsBackgroundColor={
              styles.carouselButtonsBackgroundColor
            }
            carouselButtonsBorderColor={styles.carouselButtonsBorderColor}>
            <ButtonBack>
              <img src="/chevron-right.svg" alt="arrow" />
            </ButtonBack>
          </ButtonBackContainer>
          <ButtonNextContainer
            isVisible={templates.length > visibleSlides}
            carouselButtonsBackgroundColor={
              styles.carouselButtonsBackgroundColor
            }
            carouselButtonsBorderColor={styles.carouselButtonsBorderColor}>
            <ButtonNext>
              <img src="/chevron-right.svg" alt="arrow" />
            </ButtonNext>
          </ButtonNextContainer>
        </CarouselProvider>
      </CarouselStyleFix>
    </CarouselContainer>
  );
};
