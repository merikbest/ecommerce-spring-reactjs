import React, {FC} from 'react';
import {Redirect} from 'react-router-dom'

const OAuth2RedirectHandler: FC = () => {
    const url: Location = window.location;
    const token: string | null = new URLSearchParams(url.search).get('token');

    if (token) {
        localStorage.setItem("token", token);
    }

    return <Redirect to="/account"/>
};

export default OAuth2RedirectHandler;
