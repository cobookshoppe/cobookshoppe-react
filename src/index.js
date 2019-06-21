import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './AppWrapper';
import 'babel-polyfill';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

//import { I18nextProvider } from 'react-i18next';

import './i18n';

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
