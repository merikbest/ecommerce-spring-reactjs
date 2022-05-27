import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

import App from "./App";
import { API_BASE_URL } from "./constants/urlConstants";
import { store } from "./store";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: API_BASE_URL,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById("root")
);
