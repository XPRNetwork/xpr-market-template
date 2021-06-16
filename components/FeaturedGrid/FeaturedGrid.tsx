import { FC } from 'react';
import { Template } from '../../services/templates';
import { Container } from './FeaturedGrid.styled';
import { Card } from '../../components';
import { NftCardTextProps } from '../../custom/localization';

type FeaturedGridProps = {
  templates: Template[];
  type: 'user' | 'featured';
  nftCardText: NftCardTextProps;
};

export const FeaturedGrid: FC<FeaturedGridProps> = ({
  templates,
  type,
  nftCardText,
}) => {
  return (
    <Container>
      {templates.map((template) => (
        <Card
          nftCardText={nftCardText}
          key={template.template_id}
          template={template}
          type={type}
        />
      ))}
    </Container>
  );
};
