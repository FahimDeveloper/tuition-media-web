import { type ReactNode, useMemo } from "react";
import { ConfigProvider } from "antd";
import { getAntdTheme } from "@/config/theme";
import { useTheme } from "@/hooks/useTheme";

type ThemedConfigProviderProps = {
  children: ReactNode;
};

const ThemedConfigProvider = ({ children }: ThemedConfigProviderProps) => {
  const { theme } = useTheme();
  const antdTheme = useMemo(() => getAntdTheme(theme), [theme]);

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
};

export default ThemedConfigProvider;
