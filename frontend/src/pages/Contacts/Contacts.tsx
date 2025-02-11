import React, {FC, ReactElement, useEffect} from "react";
import { Col, Row, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";

const Contacts: FC = (): ReactElement => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <ContentWrapper>
            <ContentTitle icon={<InfoCircleOutlined />} title={"Contacts"} />
            <Row gutter={32}>
                <Col span={12}>
                    <div>
                        <Typography.Text strong>{"Мобилен номер: "}</Typography.Text>
                        <Typography.Text>(+359) 897631393</Typography.Text>



                      
                    </div>
                    <div>

                          <Typography.Text strong>{"Адрес: "}</Typography.Text>
                        <Typography.Text>Кв.Манастирски Ливади Ул.Казбек 57</Typography.Text>

                    </div>
                    <div>
                        <Typography.Text strong>{"E-mail: "}</Typography.Text>
                        <Typography.Text>denicristals@gmail.com</Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Работно време</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>
                            От 08:00 до 20:00 без Неделя. <br />
                            Онлайн поръчките се приемат постоянно.
                        </Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Доставка</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>Доставка с Еконт и Спиди.</Typography.Text>
                    </div>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Contacts;
