import React, {FC} from 'react';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Contacts: FC = () => {
    return (
        <div className="container mt-5">
            <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faInfoCircle}/>Liên hệ</h4>
            <br/>
            <p><b>Điện thoại:</b> (0356 027 937<br/>
                <b>E-mail:</b> tuananh301099@gmail.com</p>
            <br/>
            <h6>Giờ làm việc</h6>
            <p>Shop online mở cửa từ 08:00 to 20:00 vào tất cả các ngày trong tuần. <br/>
                Đơn đặt hàng online được duyệt liên tục.</p>
            <br/>
            <h6>Vận chuyển</h6>
            <p>Vận chuyển thông qua các dịch vụ chuyển phát nhanh</p>
        </div>
    );
};

export default Contacts
