import React, {FC} from 'react';
import {Link, Route, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, faEdit, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

import {User} from "../../../types/types";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import EditPersonalData from "../EditPersonalData/EditPersonalData";
import "./PersonalData.css";

const PersonalData: FC = () => {
    const usersData: Partial<User> = useSelector((state: AppStateType) => state.user.user);
    const {email, firstName, lastName, city, address, phoneNumber, postIndex} = usersData;
    const location = useLocation();

    return (
        <div className="row">
            <div className="personal_data col-md-5">
                <h4 className="personal_data_title">
                    <FontAwesomeIcon className="ml-2 mr-2" icon={faAddressCard}/>Thông tin cá nhân
                </h4>
                <p className="personal_data_item">Email:
                    <span className="personal_data_text">{email}</span>
                </p>
                <p className="personal_data_item">Họ đệm:
                    <span className="personal_data_text">{firstName}</span>
                </p>
                <p className="personal_data_item">Tên:
                    <span className="personal_data_text">{lastName}</span>
                </p>
                <p className="personal_data_item">Thành phố:
                    <span className="personal_data_text">{city}</span>
                </p>
                <p className="personal_data_item">Địa chỉ:
                    <span className="personal_data_text">{address}</span>
                </p>
                <p className="personal_data_item">Số điện thoại:
                    <span className="personal_data_text">{phoneNumber}</span>
                </p>
                <p className="personal_data_item">Mã bưu điện:
                    <span className="personal_data_text">{postIndex}</span>
                </p>
                {location.pathname === "/account/user/info" ?
                    <Link to={"/account/user/info/edit"} className="btn btn-dark personal_data_btn">
                        <FontAwesomeIcon className="mr-2" icon={faEdit}/> Chỉnh sửa
                    </Link> :
                    <Link to={"/account/user/info"} className="btn btn-dark personal_data_btn">
                        <FontAwesomeIcon className="mr-2" icon={faEyeSlash}/> Ẩn
                    </Link>}
            </div>
            <div className="col-md-7">
                <Route path="/account/user/info/edit" component={() => <EditPersonalData/>}/>
            </div>
        </div>
    );
};

export default PersonalData;
