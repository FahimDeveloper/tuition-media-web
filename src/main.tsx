import {Fragment} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import {ConfigProvider} from 'antd';
import {PersistGate} from 'redux-persist/integration/react';
import {RouterProvider} from 'react-router-dom';
import router from './routers';
import {appTheme} from './config/theme';

createRoot(document.getElementById('root')!).render(
  <Fragment>
    <Provider store={store}>
      <ConfigProvider theme={appTheme}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </Fragment>,
);
