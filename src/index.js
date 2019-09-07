import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Vetoad from './components/Vetoad';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(<Router><Vetoad /></Router>, document.getElementById('root'));

serviceWorker.unregister();
