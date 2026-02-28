import type {ThemeConfig} from 'antd';

export const appTheme: ThemeConfig = {
  token: {
    colorPrimary: '#6D8C85',
    fontFamily: 'Manrope',
  },
  components: {
    Layout: {
      headerBg: '#FFFFFF',
      bodyBg: '#F5F8F7',
      footerBg: '#FFFFFF',
    },
    Button: {
      colorPrimary: '#6D8C85',
    },
    Typography: {
      colorText: '#07133D',
      colorTextSecondary: '#9CB7B0',
    },
  },
};
