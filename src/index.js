import React from 'react';
import ReactDOM from 'react-dom';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import store from './js/store/redux';
import App from './js/components/App/App';
import { TOASTR_DURATION } from './js/constants/misc';
import './index.css';

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
  document.getElementById('root')
);
