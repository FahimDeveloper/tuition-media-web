import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { ConfigProvider } from "antd";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import router from "./routers";

createRoot(document.getElementById("root")!).render(
  <Fragment>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#6D8C85",
            borderRadius: 5,
            fontFamily: "Manrope",
          },
          components: {
            Menu: {
              itemHoverBg: "#6D8C85",
              itemHoverColor: "#ffffff",
              itemColor: "#4B4B4B",
              itemSelectedBg: "#6D8C85",
              itemSelectedColor: "#ffffff",
              horizontalItemSelectedColor: "#6D8C85",
            },
          },
        }}
      >
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </Fragment>,
);
