import { theme as antdTheme, type ThemeConfig } from "antd";
import type { Theme } from "@/context/theme-store";

const colorVar = (name: string) => `var(--color-${name})`;

export const getAntdTheme = (mode: Theme): ThemeConfig => {
  const isDarkMode = mode === "dark";

  return {
    algorithm: isDarkMode
      ? antdTheme.darkAlgorithm
      : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: colorVar("brand-600"),
      colorInfo: colorVar("brand-600"),
      colorSuccess: colorVar("success-500"),
      colorWarning: colorVar("warning-500"),
      colorError: colorVar("error-500"),
      colorTextBase: colorVar("text-strong"),
      colorText: colorVar("text-strong"),
      colorTextSecondary: colorVar("text-muted"),
      colorTextPlaceholder: colorVar("text-soft"),
      colorBgBase: colorVar("page"),
      colorBgContainer: colorVar("surface-elevated"),
      colorBgElevated: colorVar("surface-elevated"),
      colorFillSecondary: colorVar("surface-muted"),
      colorFillTertiary: colorVar("surface-subtle"),
      colorBorder: colorVar("border"),
      colorBorderSecondary: colorVar("border"),
      colorSplit: colorVar("border"),
      colorPrimaryBorder: colorVar("brand-300"),
      colorPrimaryBorderHover: colorVar("brand-400"),
      controlItemBgActive: colorVar("brand-50"),
      controlItemBgActiveHover: colorVar("brand-100"),
      controlOutline: "var(--color-focus-ring)",
      controlOutlineWidth: 2,
      boxShadow: "var(--shadow-theme-sm)",
      boxShadowSecondary: "var(--shadow-theme-lg)",
      fontFamily: "Manrope",
    },
    components: {
      Layout: {
        headerBg: colorVar("surface-elevated"),
        bodyBg: colorVar("page"),
        footerBg: colorVar("surface-elevated"),
        siderBg: colorVar("surface-elevated"),
        triggerBg: colorVar("surface-strong"),
      },
      Button: {
        colorPrimary: colorVar("brand-600"),
        colorPrimaryHover: colorVar("brand-700"),
        colorPrimaryActive: colorVar("brand-800"),
        primaryShadow: "var(--shadow-theme-xs)",
        defaultBg: colorVar("surface-elevated"),
        defaultBorderColor: colorVar("border"),
        defaultColor: colorVar("text-strong"),
      },
      Input: {
        colorBgContainer: colorVar("surface-elevated"),
        colorBorder: colorVar("border"),
        hoverBorderColor: colorVar("brand-400"),
        activeBorderColor: colorVar("brand-500"),
      },
      Select: {
        colorBgContainer: colorVar("surface-elevated"),
        colorBorder: colorVar("border"),
        optionSelectedBg: colorVar("brand-50"),
        hoverBorderColor: colorVar("brand-400"),
        activeBorderColor: colorVar("brand-500"),
      },
      Drawer: {
        colorBgElevated: colorVar("surface-elevated"),
        colorBgMask: "var(--color-overlay-strong)",
      },
      Card: {
        colorBgContainer: colorVar("surface-elevated"),
      },
      Modal: {
        contentBg: colorVar("surface-elevated"),
        headerBg: colorVar("surface-elevated"),
      },
      Typography: {
        colorText: colorVar("text-strong"),
        colorTextSecondary: colorVar("text-muted"),
      },
    },
  };
};
