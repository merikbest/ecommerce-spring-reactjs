import React, {FC, ReactElement, useState} from 'react';
import {useSelector} from "react-redux";
import {faAddressCard, faEdit, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import EditPersonalData from "../EditPersonalData/EditPersonalData";
import AccountDataItem from "../../../component/AccountDataItem/AccountDataItem";
import IconButton from "../../../component/IconButton/IconButton";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import {selectUserFromUserState} from "../../../redux/user/user-selector";
import "./PersonalData.css";

const PersonalData: FC = (): ReactElement => {
    const usersData = useSelector(selectUserFromUserState);
    const [showUserData, setShowUserData] = useState<boolean>(false);
    const {email, firstName, lastName, city, address, phoneNumber, postIndex} = usersData;
    
    const onClickShowUserData = (): void => {
        setShowUserData(prevState => !prevState);
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
                <AccountDataItem title={"Email"} text={email}/>
                <AccountDataItem title={"First name"} text={firstName}/>
                <AccountDataItem title={"Last name"} text={lastName}/>
                <AccountDataItem title={"City"} text={city}/>
                <AccountDataItem title={"Address"} text={address}/>
                <AccountDataItem title={"Phone number"} text={phoneNumber}/>
                <AccountDataItem title={"Post index"} text={postIndex}/>
                <IconButton
                    buttonText={showUserData ? "Hide" : "Edit"}
                    buttonClassName={"personal_data_btn"}
                    icon={showUserData ? faEyeSlash : faEdit}
                    iconClassName={"mr-2"}
                    onClick={onClickShowUserData}
                />
            </div>
            <div className="col-md-7">
                {showUserData && <EditPersonalData/>}
            </div>
        </div>
    );
};

export default PersonalData;
