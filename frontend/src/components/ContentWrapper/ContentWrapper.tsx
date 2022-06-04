import React, { FC, ReactElement, ReactNode } from "react";
import { Layout } from "antd";

import "./ContentWrapper.css";

type PropsType = {
    children: ReactNode;
};

const ContentWrapper: FC<PropsType> = ({ children }): ReactElement => {
    return (
        <Layout>
            <Layout.Content className={"login-content"}>{children}</Layout.Content>
        </Layout>
    );
};

export default ContentWrapper;
