import React, { ChangeEvent, FC, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

import { Perfume } from "../../types/types";

type PropsType = {
    perfume: Perfume;
    perfumeInCart: Map<any, any>;
    onChangePerfumeItemCount: (perfumeId: number, perfumeCondition: boolean) => void;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>, perfumeId: number) => void;
    deleteFromCart: (perfumeId: number) => void;
};

const CartItem: FC<PropsType> = ({
    perfume,
    perfumeInCart,
    onChangePerfumeItemCount,
    handleInputChange,
    deleteFromCart
}): ReactElement => {
    return (
        <div key={perfume.id} className="card mb-3 mx-auto perfume_item_wrapper">
            <div className="row no-gutters">
                <div className="col-2 mx-3 my-3">
                    <img src={perfume.filename} className="img-fluid" />
                </div>
                <div className="col-6">
                    <div className="card-body">
                        <h4 className="card-title">{perfume.perfumer + " " + perfume.perfumeTitle}</h4>
                        <p className="card-text">{perfume.type}</p>
                        <p className="card-text">
                            <span>{perfume.volume}</span> ml.
                        </p>
                    </div>
                </div>
                <div className="col-1 mt-3">
                    <button
                        className="btn btn-default"
                        disabled={perfumeInCart.get(perfume.id) === 99}
                        onClick={() => onChangePerfumeItemCount(perfume.id, true)}
                    >
                        <FontAwesomeIcon size="lg" icon={faChevronUp} />
                    </button>
                    <input
                        type="text"
                        className="form-control input-number perfume_input_count"
                        value={perfumeInCart.get(perfume.id)}
                        onChange={(event) => handleInputChange(event, perfume.id)}
                    />
                    <button
                        className="btn btn-default"
                        disabled={perfumeInCart.get(perfume.id) === 1}
                        onClick={() => onChangePerfumeItemCount(perfume.id, false)}
                    >
                        <FontAwesomeIcon size="lg" icon={faChevronDown} />
                    </button>
                </div>
                <div className="col-2">
                    <div className="card-body">
                        <h5 className="card-title">
                            <span>$ {perfume.price * perfumeInCart.get(perfume.id)}</span>
                        </h5>
                        <button className="btn btn-warning mb-2" onClick={() => deleteFromCart(perfume.id)}>
                            <FontAwesomeIcon className="mr-2" icon={faMinusSquare} /> Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
