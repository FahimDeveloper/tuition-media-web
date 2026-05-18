import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import router from "@/routers";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppWrapper } from "@/components/common/PageMeta";
import ThemedConfigProvider from "@/components/common/ThemedConfigProvider";

createRoot(document.getElementById("root")!).render(
  <Fragment>
    <ThemeProvider>
      <AppWrapper>
        <Provider store={store}>
          <ThemedConfigProvider>
            <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router} />
            </PersistGate>
          </ThemedConfigProvider>
        </Provider>
      </AppWrapper>
    </ThemeProvider>
  </Fragment>,
);
