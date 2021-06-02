module.exports = {
  images: {
    domains: [
      'cloudflare-ipfs.com',
      'gateway.pinata.cloud',
      'ipfs.io',
      'bloks.io',
    ],
  },
  target: 'serverless',
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/',
        },
      },
      {
        test: /\.png$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              publicPath: '/',
            },
          },
        ],
      }
    );

    return config;
  },
};
