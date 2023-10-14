import { createI18n } from 'vue-i18n';
// import { i18nData } from './i18nData';

const i18n = createI18n({
  locale: 'vi',
  messages: {
    vi: {
      NavBar: {
        Dashboard: 'Tổng quát1',
      },
    },
  },
});

export default i18n;
