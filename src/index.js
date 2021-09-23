import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './common/containers/App';
import './styles/_main.scss';
import Routes from './routes';

import ColorModeContextProvider from './context/colorModeContext';

ReactDOM.render(
  <ColorModeContextProvider>
    <AppContainer>
      <Routes />
    </AppContainer>
  </ColorModeContextProvider>,
  document.getElementById('root')
);
