import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { UserEditRequest } from "../../../types/types";
import { updateUserInfo } from "../../../redux/user/user-thunks";
import Input from "../../../component/Input/Input";
import IconButton from "../../../component/IconButton/IconButton";
import { selectUserEditErrors, selectUserFromUserState } from "../../../redux/user/user-selector";
import { resetInputForm } from "../../../redux/user/user-actions";
import "./EditPersonalData.css";

const initialState = {
    id: 0,
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    phoneNumber: "",
    postIndex: ""
};

const EditPersonalData: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUserFromUserState);
    const errors = useSelector(selectUserEditErrors);
    const [user, setUser] = useState(initialState);
    const { id, firstName, lastName, city, address, phoneNumber, postIndex } = user;
    const { firstNameError, lastNameError } = errors;

    useEffect(() => {
        dispatch(resetInputForm());

        if (usersData) {
            setUser(usersData);
        }
    }, []);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userEdit: UserEditRequest = { id, firstName, lastName, city, address, phoneNumber, postIndex };
        dispatch(updateUserInfo(userEdit));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <form className="edit_personal_data" onSubmit={onFormSubmit}>
            <Input
                title={"First name"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                error={firstNameError}
                name={"firstName"}
                value={user?.firstName}
                onChange={handleInputChange}
            />
            <Input
                title={"Last name"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                error={lastNameError}
                name={"lastName"}
                value={user?.lastName}
                onChange={handleInputChange}
            />
            <Input
                title={"City"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                name={"city"}
                value={user?.city}
                onChange={handleInputChange}
            />
            <Input
                title={"Address"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                name={"address"}
                value={user?.address}
                onChange={handleInputChange}
            />
            <Input
                title={"Phone number"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                name={"phoneNumber"}
                value={user?.phoneNumber}
                onChange={handleInputChange}
            />
            <Input
                title={"Post index"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                name={"postIndex"}
                value={user?.postIndex}
                onChange={handleInputChange}
            />
            <IconButton buttonText={"Save"} icon={faCheck} iconClassName={"mr-2"} />
        </form>
    );
};

export default EditPersonalData;
