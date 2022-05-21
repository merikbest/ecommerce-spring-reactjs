import React, { FC } from "react";
import { Redirect } from "react-router-dom";

import { ACCOUNT } from "../../constants/routeConstants";

const OAuth2RedirectHandler: FC = () => {
    const url: Location = window.location;
    const token: string | null = new URLSearchParams(url.search).get("token");

    if (token) {
        localStorage.setItem("token", token);
    }

    return <Redirect to={ACCOUNT} />;
};

export default OAuth2RedirectHandler;
