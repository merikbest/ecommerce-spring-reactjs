import React, { FC, ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row } from "antd";
import { EditOutlined, EyeInvisibleOutlined, ProfileOutlined } from "@ant-design/icons";

import { selectUserFromUserState } from "../../../../redux-toolkit/user/user-selector";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AccountDataItem from "./AccountDataItem/AccountDataItem";

const PersonalData: FC = (): ReactElement => {
    const usersData = useSelector(selectUserFromUserState);
    const [showUserData, setShowUserData] = useState<boolean>(false);

    const onClickShowUserData = (): void => {
        setShowUserData((prevState) => !prevState);
    };

    return (
        <Row>
            <Col span={12}>
                <ContentTitle title={"My Account"} titleLevel={4} icon={<ProfileOutlined />} />
                <AccountDataItem title={"Email"} text={usersData?.email} />
                <AccountDataItem title={"First name"} text={usersData?.firstName} />
                <AccountDataItem title={"Last name"} text={usersData?.lastName} />
                <AccountDataItem title={"City"} text={usersData?.city} />
                <AccountDataItem title={"Address"} text={usersData?.address} />
                <AccountDataItem title={"Phone number"} text={usersData?.phoneNumber} />
                <AccountDataItem title={"Post index"} text={usersData?.postIndex} />
                <Button 
                    type={"primary"} 
                    onClick={onClickShowUserData}
                    icon={showUserData ? <EyeInvisibleOutlined /> : <EditOutlined /> }
                >
                    {showUserData ? "Hide" : "Edit"}
                </Button>
            </Col>
            <Col span={12}></Col>
        </Row>
    );
};

export default PersonalData;
