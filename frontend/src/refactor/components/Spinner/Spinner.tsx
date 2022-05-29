import React, { FC, ReactElement } from "react";
import { Spin } from "antd";

import "./Spinner.css";

const Spinner: FC = (): ReactElement => {
    return (
        <div className={"spinner"}>
            <Spin size={"large"} />
        </div>
    );
};

export default Spinner;
