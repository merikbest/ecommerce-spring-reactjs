import React, { FC, ReactElement } from "react";
import { Button } from "antd";

import "./SocialButton.css";

type PropsType = {
    socialNetwork: string;
    image: string;
};

const SocialButton: FC<PropsType> = ({ socialNetwork, image }): ReactElement => {
    return (
        <a href={`http://localhost:8080/oauth2/authorize/${socialNetwork}`}>
            <Button className={`social-btn ${socialNetwork}`} size="large" block>
                <img src={image} alt={socialNetwork} />
                {`Log in with ${socialNetwork.charAt(0).toUpperCase() + socialNetwork.slice(1)}`}
            </Button>
        </a>
    );
};

export default SocialButton;
