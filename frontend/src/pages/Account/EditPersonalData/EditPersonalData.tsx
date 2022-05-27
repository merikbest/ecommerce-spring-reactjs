import React, { FC, FormEvent, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Input from "../../../component/Input/Input";
import IconButton from "../../../component/IconButton/IconButton";
import { selectUserEditErrors, selectUserFromUserState } from "../../../redux-toolkit/user/user-selector";
import { resetInputForm } from "../../../redux-toolkit/user/user-slice";
import { updateUserInfo } from "../../../redux-toolkit/user/user-thunks";
import { useInput } from "../../../hooks/useInput";
import "./EditPersonalData.css";

const EditPersonalData: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUserFromUserState);
    const errors = useSelector(selectUserEditErrors);
    const { inputValue, setInputValue, handleInputChange } = useInput({
        id: 0,
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        phoneNumber: "",
        postIndex: ""
    });
    const { id, firstName, lastName, city, address, phoneNumber, postIndex } = inputValue;
    const { firstNameError, lastNameError } = errors;

    useEffect(() => {
        dispatch(resetInputForm());

        if (usersData) {
            setInputValue(usersData);
        }
    }, []);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(
            updateUserInfo({
                id,
                firstName,
                lastName,
                city,
                address,
                phoneNumber,
                postIndex
            })
        );
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
                value={firstName}
                onChange={handleInputChange}
            />
            <Input
                title={"Last name"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                error={lastNameError}
                name={"lastName"}
                value={lastName}
                onChange={handleInputChange}
            />
            <Input
                title={"City"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                name={"city"}
                value={city}
                onChange={handleInputChange}
            />
            <Input
                title={"Address"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                name={"address"}
                value={address}
                onChange={handleInputChange}
            />
            <Input
                title={"Phone number"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                name={"phoneNumber"}
                value={phoneNumber}
                onChange={handleInputChange}
            />
            <Input
                title={"Post index"}
                titleClass={"col-sm-3"}
                wrapperClass={"col-sm-6"}
                type={"text"}
                name={"postIndex"}
                value={postIndex}
                onChange={handleInputChange}
            />
            <IconButton buttonText={"Save"} icon={faCheck} iconClassName={"mr-2"} />
        </form>
    );
};

export default EditPersonalData;
