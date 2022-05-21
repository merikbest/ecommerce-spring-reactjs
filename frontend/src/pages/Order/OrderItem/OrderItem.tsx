import React, { FC, ReactElement } from "react";

import { Perfume } from "../../../types/types";

type PropsType = {
    perfume: Perfume;
    quantity?: number;
};

const OrderItem: FC<PropsType> = ({ perfume, quantity }): ReactElement => {
    return (
        <div key={perfume.id} className="col-lg-6 d-flex align-items-stretch">
            <div className="card mb-5">
                <img src={perfume.filename} className="rounded mx-auto w-50" />
                <div className="card-body text-center">
                    <h5>{perfume.perfumeTitle}</h5>
                    <h6>{perfume.perfumer}</h6>
                    <h6>
                        <span>Price: $ {perfume.price}</span>.00
                    </h6>
                    <h6>
                        <span>Quantity: {quantity}</span>
                    </h6>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
