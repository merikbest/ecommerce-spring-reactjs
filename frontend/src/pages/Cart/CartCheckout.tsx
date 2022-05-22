import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

import { ORDER } from "../../constants/routeConstants";

type PropsType = {
    totalPrice: number;
};

const CartCheckout: FC<PropsType> = ({ totalPrice }): ReactElement => {
    return (
        <div className="row">
            <div className="col-9">
                <p className="h5 text-right">
                    Total: $ <span>{totalPrice}</span>
                </p>
            </div>
            <div className="col-3">
                <div className="form-row">
                    <Link to={ORDER}>
                        <button className="btn btn-success">
                            <FontAwesomeIcon className="mr-2" icon={faShoppingBag} /> Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartCheckout;
