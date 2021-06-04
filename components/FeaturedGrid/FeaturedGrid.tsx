import { FC } from 'react';
import { Template } from '../../services/templates';
import { Container } from './FeaturedGrid.styled';
import { Card } from '../../components';

type FeaturedGridProps = {
  templates: Template[];
};

export const FeaturedGrid: FC<FeaturedGridProps> = ({ templates }) => {
  return (
    <Container>
      {templates.map((template) => (
        <Card key={template.template_id} template={template} />
      ))}
    </Container>
  );
};
