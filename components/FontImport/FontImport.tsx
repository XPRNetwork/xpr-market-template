import { FC } from 'react';
import Head from 'next/head';
import { generateFontImportLink, Typography } from '../../custom/customization';

export const FontImport: FC<{
  typography: Typography;
}> = ({ typography }) => {
  const fontImportLink = generateFontImportLink(Object.values(typography));
  return (
    <Head>
      <link
        key="preconnect"
        rel="preconnect"
        href="https://fonts.gstatic.com"
      />
      <link key="font" href={fontImportLink} rel="stylesheet" />
    </Head>
  );
};
