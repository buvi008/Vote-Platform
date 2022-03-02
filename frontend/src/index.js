/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SnackbarProvider } from 'notistack';

ReactDOM.render((
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={2}
          // preventDuplicate
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <App />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
