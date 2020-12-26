import React from 'react';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Contacts() {
    return (
        <div className="container mt-5">
            <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faInfoCircle}/>Контактная информация</h4>
            <br/>
            <p><b>Телефон:</b> (066) 696-66-23<br/>
                <b>E-mail:</b> merikbest2015@gmail.com</p>
            <br/>
            <h6>Режим работы</h6>
            <p>Интернет магазин работает c 08:00 до 20:00 без перерыва и выходных. <br/>
                Онлайн заказы принимаются круглосуточно.</p>
            <br/>
            <h6>Доставка</h6>
            <p>Доставка заказов происходит через курьерскую службу</p>
        </div>
    )
}

export default Contacts