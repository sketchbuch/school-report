import React from 'react';
import ReactDOM from 'react-dom';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import store from './js/store';
import App from './js/components/App/App';
import './index.css';

const TOASTR_DURATION = 2500;


ReactDOM.render(
  <Provider store={store}>
    <div className="App__frame">
      <App />
      <ReduxToastr
        timeOut={TOASTR_DURATION}
        newestOnTop={false}
        preventDuplicates
        position="bottom-center"
        transitionIn="bounceIn"
        transitionOut="fadeOut"
      />
    </div>
  </Provider>,
  document.getElementById('root'),
);
