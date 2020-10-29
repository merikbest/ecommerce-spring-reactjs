import React, {Component} from 'react';

class Contacts extends Component {

    render() {
        return (
            <div className="container mt-5">
                <h5>Контактная информация</h5>
                <br/>
                <p><b>Телефон:</b> (066) 573-89-96<br/>
                    <b>E-mail:</b> merikbest2015@gmail.com</p>
                <br/>
                <h6>Режим работы</h6>
                <p>Интернет магазин работает c 08:00 до 20:00 без перерыва и выходных. <br/>
                    Онлайн заказы принимаются круглосуточно.</p>
                <br/>
                <h6>Доставка</h6>
                <p>Доставка заказов происходит через курьерскую службу</p>
            </div>
        );
    }
}

export default Contacts;