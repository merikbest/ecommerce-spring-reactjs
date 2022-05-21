import React, { FC, ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { faAddressCard, faEdit, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import EditPersonalData from "../EditPersonalData/EditPersonalData";
import AccountDataItem from "../../../component/AccountDataItem/AccountDataItem";
import IconButton from "../../../component/IconButton/IconButton";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import { selectUserFromUserState } from "../../../redux/user/user-selector";
import "./PersonalData.css";

const PersonalData: FC = (): ReactElement => {
    const usersData = useSelector(selectUserFromUserState);
    const [showUserData, setShowUserData] = useState<boolean>(false);

    const onClickShowUserData = (): void => {
        setShowUserData((prevState) => !prevState);
    };

    return (
        <div className="row">
            <div className="personal_data col-md-5">
                <InfoTitle
                    iconClass={"ml-2 mr-2"}
                    icon={faAddressCard}
                    titleClass={"personal_data_title"}
                    title={"Personal data"}
                />
                <AccountDataItem title={"Email"} text={usersData?.email} />
                <AccountDataItem title={"First name"} text={usersData?.firstName} />
                <AccountDataItem title={"Last name"} text={usersData?.lastName} />
                <AccountDataItem title={"City"} text={usersData?.city} />
                <AccountDataItem title={"Address"} text={usersData?.address} />
                <AccountDataItem title={"Phone number"} text={usersData?.phoneNumber} />
                <AccountDataItem title={"Post index"} text={usersData?.postIndex} />
                <IconButton
                    buttonText={showUserData ? "Hide" : "Edit"}
                    buttonClassName={"personal_data_btn"}
                    icon={showUserData ? faEyeSlash : faEdit}
                    iconClassName={"mr-2"}
                    onClick={onClickShowUserData}
                />
            </div>
            <div className="col-md-7">{showUserData && <EditPersonalData />}</div>
        </div>
    );
};

export default PersonalData;
