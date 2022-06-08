import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthUserProvider from './contexts/auth/AuthUserProvider';
import App from './App';

import './index.css';

ReactDOM.render(
  <AuthUserProvider>
    <Router>
      <App />
    </Router>
  </AuthUserProvider>,
  document.getElementById('root')
);
