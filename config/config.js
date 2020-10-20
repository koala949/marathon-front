// ref: https://umijs.org/config/
export default {
  theme: {
    'icon-url': "'/src/font/Montserrat-Regular.otf'",
    'text-color': 'fade(#000, 90%)',
  },
  define: {
    'process.env.API_HOST': 'http://dev_host',
  },
  alias: {
    '@': './src',
  },
  targets: {
    ie: 11,
  },
};
