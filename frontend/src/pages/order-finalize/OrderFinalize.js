import React, {useEffect, useState} from 'react';
import ShopService from "../../services/ShopService";

function OrderFinalize(props) {
    const [orderIndex, setOrderIndex] = useState("");

    useEffect(() => {
        ShopService.finalizeOrder()
            .then((response) => {
                setOrderIndex(response.data)
            })

    },[])

    return (
        <div className="container text-center mt-5">
            <h2>Спасибо за заказ!</h2>
            <p>Ваш номер заказа: <span>{orderIndex}</span></p>
        </div>
    );
}

export default OrderFinalize;