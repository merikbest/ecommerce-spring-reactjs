import React, { FC, ReactElement } from "react";
import { Spin } from "antd";

import "./Spinner.css";

const Spinner: FC = (): ReactElement => {
    return <Spin size={"large"} className={"spinner"} />;
};

export default Spinner;
