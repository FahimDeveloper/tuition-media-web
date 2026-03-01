import type {ThemeConfig} from 'antd';

export const appTheme: ThemeConfig = {
  token: {
    colorPrimary: '#3F72AF',
    colorInfo: '#3F72AF',
    colorTextBase: '#112D4E',
    colorBgBase: '#F9F7F7',
    colorBorder: '#DBE2EF',
    fontFamily: 'Manrope',
  },
  components: {
    Layout: {
      headerBg: '#F9F7F7',
      bodyBg: '#F9F7F7',
      footerBg: '#F9F7F7',
    },
    Button: {
      colorPrimary: '#3F72AF',
      colorPrimaryHover: '#355F92',
      colorPrimaryActive: '#2A4B74',
    },
    Typography: {
      colorText: '#112D4E',
      colorTextSecondary: '#3F72AF',
    },
  },
};
