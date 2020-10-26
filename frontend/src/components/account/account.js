import React, {Component} from 'react';

export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav">
                        {/*USER*/}
                        <li className="nav-item active">
                            <a className="nav-link text-light mx-3" href="/user/edit">Изменить пароль</a>
                        </li>
                        {/*USER*/}
                        <li className="nav-item">
                            <a className="nav-link text-light mx-3" href="/userOrders">Список заказов</a>
                        </li>
                    </ul>


                    {/*<ul className="navbar-nav">*/}
                    {/*    /!*ADMIN*!/*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link text-light mx-3" href="/orders">Список всех заказов</a>*/}
                    {/*    </li>*/}
                    {/*    /!*ADMIN*!/*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <form action="/user" method="get">*/}
                    {/*            <a className="nav-link text-light mx-3" href="/user">Список пользователей</a>*/}
                    {/*        </form>*/}
                    {/*    </li>*/}
                    {/*    /!*ADMIN*!/*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <form action="/user/add" method="get">*/}
                    {/*            <a className="nav-link text-light mx-3" href="/user/add">Добавить товар</a>*/}
                    {/*        </form>*/}
                    {/*    </li>*/}
                    {/*    /!*ADMIN*!/*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <form action="/user/productlist" method="get">*/}
                    {/*            <a className="nav-link text-light mx-3" href="/user/productlist">Список товаров</a>*/}
                    {/*        </form>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </nav>
            </div>
        );
    }
}
