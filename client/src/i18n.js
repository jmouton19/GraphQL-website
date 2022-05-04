import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    backend: {
      allowMultiLoading: true,
      loadPath: `/assets/translations/{{lng}}.json`,
    },
    react: {
      wait: true,
    },
  });

export default i18n;
