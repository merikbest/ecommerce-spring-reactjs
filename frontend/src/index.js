import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/App';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>, document.getElementById('root'));