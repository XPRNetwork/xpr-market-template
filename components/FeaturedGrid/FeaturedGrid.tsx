import { FC } from 'react';
import { Template } from '../../services/templates';
import { Container } from './FeaturedGrid.styled';
import { Card } from '../../components';
import { NftCardTextProps } from '../../custom/localization';
import { Typography, NftCardProps } from '../../custom/customization';

type FeaturedGridProps = {
  templates: Template[];
  type: 'user' | 'featured';
  nftCardText: NftCardTextProps;
  nftCardStyles: NftCardProps;
  typography: Typography;
};

export const FeaturedGrid: FC<FeaturedGridProps> = ({
  templates,
  type,
  nftCardText,
  nftCardStyles,
  typography,
}) => {
  return (
    <Container>
      {templates.map((template, i) => (
        <Card
          nftCardText={nftCardText}
          typography={typography}
          nftCardStyles={nftCardStyles}
          key={`${template.template_id}-${i}`}
          template={template}
          type={type}
        />
      ))}
    </Container>
  );
};
