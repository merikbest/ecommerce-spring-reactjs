import React, {FC, ReactElement, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CheckCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Typography } from "antd";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import {selectCartItems, selectTotalPrice} from "../../redux-toolkit/cart/cart-selector";
import { selectIsOrderLoading, selectOrderErrors } from "../../redux-toolkit/order/order-selector";
import { resetOrderState, setOrderLoadingState } from "../../redux-toolkit/order/order-slice";
import { LoadingStatus } from "../../types/types";
import { addOrder } from "../../redux-toolkit/order/order-thunks";
import {resetCartState} from "../../redux-toolkit/cart/cart-slice";
import {fetchCart} from "../../redux-toolkit/cart/cart-thunks";
import OrderItem from "./OrderItem/OrderItem";

interface OrderFormData {
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    postIndex: string;
    email: string;
}

const Order: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();
    const usersData = useSelector(selectUserFromUserState);
    const perfumes = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const errors = useSelector(selectOrderErrors);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const [perfumesFromLocalStorage, setPerfumesFromLocalStorage] = useState<Map<number, number>>(new Map());

    useEffect(() => {
        const perfumesFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("perfumes") as string)
        );
        setPerfumesFromLocalStorage(perfumesFromLocalStorage);
        dispatch(setOrderLoadingState(LoadingStatus.LOADED));
        dispatch(fetchCart(Array.from(perfumesFromLocalStorage.keys())));

        if (usersData) {
            form.setFieldsValue(usersData);
        }

        return () => {
            dispatch(resetOrderState());
            dispatch(resetCartState());
        };
    }, []);

    const onFormSubmit = (order: OrderFormData): void => {
        const perfumesId = Object.fromEntries(new Map(JSON.parse(localStorage.getItem("perfumes") as string)));
        dispatch(addOrder({ order: { ...order, perfumesId }, history }));
    };

    return (
        <ContentWrapper>
            <div style={{ textAlign: "center" }}>
                <ContentTitle icon={<ShoppingOutlined />} title={"Ordering"} />
            </div>
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={32}>
                    <Col span={12}>
                        <FormInput
                            title={"Name:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"firstName"}
                            error={errors.firstNameError}
                            disabled={isOrderLoading}
                            placeholder={"Enter the first name"}
                        />
                        <FormInput
                            title={"Surname:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"lastName"}
                            error={errors.lastNameError}
                            disabled={isOrderLoading}
                            placeholder={"Enter the last name"}
                        />
                        <FormInput
                            title={"City:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"city"}
                            error={errors.cityError}
                            disabled={isOrderLoading}
                            placeholder={"Enter the city"}
                        />
                        <FormInput
                            title={"Address:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"address"}
                            error={errors.addressError}
                            disabled={isOrderLoading}
                            placeholder={"Enter the address"}
                        />
                        <FormInput
                            title={"Index:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"postIndex"}
                            error={errors.postIndexError}
                            disabled={isOrderLoading}
                            placeholder={"Enter the index"}
                        />
                        <FormInput
                            title={"Mobile:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"phoneNumber"}
                            error={errors.phoneNumberError}
                            disabled={isOrderLoading}
                            placeholder={"(___)-___-____"}
                        />
                        <FormInput
                            title={"Email:"}
                            titleSpan={5}
                            wrapperSpan={19}
                            name={"email"}
                            error={errors.emailError}
                            disabled={isOrderLoading}
                            placeholder={"example@gmail.com"}
                        />
                    </Col>
                    <Col span={12}>
                        <Row gutter={[32, 32]}>
                            {perfumes.map((perfume) => (
                                <OrderItem
                                    key={perfume.id}
                                    perfume={perfume}
                                    quantity={perfumesFromLocalStorage.get(perfume.id)}
                                />
                            ))}
                        </Row>
                        <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <Typography.Title level={3}>To pay : $ {totalPrice}.00</Typography.Title>
                            </Col>
                            <Col>
                                <Button
                                    htmlType={"submit"}
                                    loading={isOrderLoading}
                                    type="primary"
                                    size="large"
                                    icon={<CheckCircleOutlined />}
                                >
                                    Validate order
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </ContentWrapper>
    );
};

export default Order;
