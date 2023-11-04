import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import store from '../../client/src/store/index';
import { DrawerProvider } from '../../client/src/context/drawer-context';
import { ModalProvider } from '../../client/src/context/modal-context';
import { ThemeProvider } from '../../client/src/context/theme-context';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const apolloClient = new ApolloClient({
  uri: '',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ModalProvider>
          <DrawerProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </DrawerProvider>
        </ModalProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
