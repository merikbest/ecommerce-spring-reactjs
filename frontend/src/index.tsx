import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client"

import App from './pages/App/App';
import store from "./store";
import {API_BASE_URL} from "./utils/constants/url";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: API_BASE_URL,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>, document.getElementById('root')
);
