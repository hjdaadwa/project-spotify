import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthUserProvider from './contexts/auth/AuthUserProvider';
import PlayerProvider from './contexts/player/PlayerProvider';
import App from './App';

import './index.css';


ReactDOM.render(
  <AuthUserProvider>
    <PlayerProvider>
      <Router>
        <App />
      </Router>
    </PlayerProvider>
  </AuthUserProvider>,
  document.getElementById('root')
);
