import {theme as antdTheme, type ThemeConfig} from 'antd';
import type {Theme} from '@/context/theme-store';

const LIGHT_SURFACE = '#F9F7F7';
const LIGHT_SURFACE_SUBTLE = '#DBE2EF';
const LIGHT_TEXT = '#112D4E';
const DARK_SURFACE = '#101828';
const DARK_SURFACE_SUBTLE = '#1F2937';
const DARK_TEXT = '#F3F4F6';

export const getAntdTheme = (mode: Theme): ThemeConfig => {
  const isDarkMode = mode === 'dark';

  return {
    algorithm: isDarkMode
      ? antdTheme.darkAlgorithm
      : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#3F72AF',
      colorInfo: '#3F72AF',
      colorTextBase: isDarkMode ? DARK_TEXT : LIGHT_TEXT,
      colorBgBase: isDarkMode ? DARK_SURFACE : LIGHT_SURFACE,
      colorBorder: isDarkMode ? DARK_SURFACE_SUBTLE : LIGHT_SURFACE_SUBTLE,
      colorFillSecondary: isDarkMode ? 'rgba(255,255,255,0.08)' : '#F2F7FC',
      colorTextPlaceholder: isDarkMode
        ? 'rgba(243, 244, 246, 0.45)'
        : 'rgba(17, 45, 78, 0.45)',
      colorTextSecondary: isDarkMode
        ? 'rgba(243, 244, 246, 0.72)'
        : 'rgba(17, 45, 78, 0.75)',
      colorBgContainer: isDarkMode ? 'rgba(255,255,255,0.03)' : LIGHT_SURFACE,
      fontFamily: 'Manrope',
      borderRadius: 12,
    },
    components: {
      Layout: {
        headerBg: isDarkMode ? DARK_SURFACE : LIGHT_SURFACE,
        bodyBg: isDarkMode ? DARK_SURFACE : LIGHT_SURFACE,
        footerBg: isDarkMode ? DARK_SURFACE : LIGHT_SURFACE,
      },
      Button: {
        colorPrimary: '#3F72AF',
        colorPrimaryHover: '#355F92',
        colorPrimaryActive: '#2A4B74',
        defaultBg: isDarkMode ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
        defaultBorderColor: isDarkMode ? '#1F2937' : '#DBE2EF',
        defaultColor: isDarkMode ? 'rgba(243,244,246,0.9)' : LIGHT_TEXT,
      },
      Input: {
        activeBorderColor: '#3F72AF',
        hoverBorderColor: '#4F84BE',
      },
      Select: {
        activeBorderColor: '#3F72AF',
        hoverBorderColor: '#4F84BE',
      },
      Typography: {
        colorText: isDarkMode ? DARK_TEXT : LIGHT_TEXT,
        colorTextSecondary: isDarkMode ? 'rgba(243,244,246,0.72)' : '#3F72AF',
      },
    },
  };
};
