import React, {ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

import {User, UserEdit, UserEditErrors} from "../../../types/types";
import {AppStateType} from "../../../redux/root-reducer";
import {resetForm, updateUserInfo} from '../../../redux/user/user-thunks';
import EditInput from "../../../component/EditInput/EditInput";
import IconButton from "../../../component/IconButton/IconButton";
import "./EditPersonalData.css";
import {selectUserEditErrors, selectUserFromUserState} from "../../../redux/user/user-selector";

const EditPersonalData: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUserFromUserState);
    const errors = useSelector(selectUserEditErrors);
    const [user, setUser] = useState<Partial<User>>(usersData);
    const {id, firstName, lastName, city, address, phoneNumber, postIndex} = user;
    const {firstNameError, lastNameError} = errors;

    useEffect(() => {
        dispatch(resetForm());
        setUser(usersData);
    }, []);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userEdit: UserEdit = {id, firstName, lastName, city, address, phoneNumber, postIndex};
        dispatch(updateUserInfo(userEdit));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    return (
        <>
            <form className="edit_personal_data" onSubmit={onFormSubmit}>
                <EditInput
                    title={"First name"}
                    titleClass={"col-sm-3"}
                    wrapperClass={"col-sm-6"}
                    error={firstNameError}
                    name={"firstName"}
                    value={firstName}
                    onChange={handleInputChange}
                />
                <EditInput
                    title={"Last name"}
                    titleClass={"col-sm-3"}
                    wrapperClass={"col-sm-6"}
                    error={lastNameError}
                    name={"lastName"}
                    value={lastName}
                    onChange={handleInputChange}
                />
                <EditInput
                    title={"City"}
                    titleClass={"col-sm-3"}
                    wrapperClass={"col-sm-6"}
                    name={"city"}
                    value={city}
                    onChange={handleInputChange}
                />
                <EditInput
                    title={"Address"}
                    titleClass={"col-sm-3"}
                    wrapperClass={"col-sm-6"}
                    name={"address"}
                    value={address}
                    onChange={handleInputChange}
                />
                <EditInput
                    title={"Phone number"}
                    titleClass={"col-sm-3"}
                    wrapperClass={"col-sm-6"}
                    name={"phoneNumber"}
                    value={phoneNumber}
                    onChange={handleInputChange}
                />
                <EditInput
                    title={"Post index"}
                    titleClass={"col-sm-3"}
                    wrapperClass={"col-sm-6"}
                    name={"postIndex"}
                    value={postIndex}
                    onChange={handleInputChange}
                />
                <IconButton
                    buttonText={"Save"}
                    icon={faCheck}
                    iconClassName={"mr-2"}
                />
            </form>
        </>
    );
};

export default EditPersonalData;
