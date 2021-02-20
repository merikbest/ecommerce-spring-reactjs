import React, {FC} from 'react';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Contacts: FC = () => {
    return (
        <div className="container mt-5">
            <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faInfoCircle}/>Contacts</h4>
            <br/>
            <p><b>Mobile:</b> (066) 696-66-23<br/>
                <b>E-mail:</b> merikbest2015@gmail.com</p>
            <br/>
            <h6>Working time</h6>
            <p>The online store is open from 08:00 to 20:00 without breaks and weekends. <br/>
                Online orders are accepted around the clock.</p>
            <br/>
            <h6>Delivery</h6>
            <p>Delivery of orders come through courier service.</p>
        </div>
    );
};

export default Contacts
