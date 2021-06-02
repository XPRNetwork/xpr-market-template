import { useState, useEffect } from 'react';
import { Template, getTemplateDetails } from '../services/templates';

const defaultTemplate = {
  lowestPrice: '',
  lowestPriceSaleId: '',
  max_supply: '',
  collection: {
    name: '',
  },
  immutable_data: {
    image: '',
    name: '',
    series: 0,
    desc: '',
  },
};

export const useFetchNft = ({
  collection,
  templateId,
}: {
  collection: string;
  templateId: string;
}): {
  template: Template;
  isLoading: boolean;
  error: string;
} => {
  const [template, setTemplate] = useState<Template>(defaultTemplate);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (!templateId || !collection) {
        return;
      }

      setIsLoading(true);
      try {
        const templateDetails = await getTemplateDetails(
          collection,
          templateId
        );
        setTemplate(templateDetails);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    })();
  }, [templateId, collection]);

  return {
    template,
    isLoading,
    error,
  };
};
