import { useState, useEffect, FC } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import { ReactComponent as Arrow } from '../../public/chevron-right.svg';
import { Template } from '../../services/templates';
import { Card } from '../../components';
import {
  CarouselContainer,
  CarouselStyleFix,
  ButtonBackContainer,
  ButtonNextContainer,
} from './FeaturedCarousel.styled';
import { useWindowSize } from '../../hooks';

type FeaturedCarouselProps = {
  templates: Template[];
};

export const FeaturedCarousel: FC<FeaturedCarouselProps> = ({ templates }) => {
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
            {templates.map((template, i) => {
              return (
                <Slide index={i} key={template.template_id}>
                  <Card template={template} type="featured" />
                </Slide>
              );
            })}
          </Slider>
          <ButtonBackContainer isVisible={templates.length > visibleSlides}>
            <ButtonBack>
              <Arrow />
            </ButtonBack>
          </ButtonBackContainer>
          <ButtonNextContainer isVisible={templates.length > visibleSlides}>
            <ButtonNext>
              <Arrow />
            </ButtonNext>
          </ButtonNextContainer>
        </CarouselProvider>
      </CarouselStyleFix>
    </CarouselContainer>
  );
};
