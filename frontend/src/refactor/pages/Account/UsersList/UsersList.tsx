import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";
import { Table } from "antd";

import { selectAdminStateUsers, selectIsAdminStateLoading } from "../../../../redux-toolkit/admin/admin-selector";
import { fetchAllUsers } from "../../../../redux-toolkit/admin/admin-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import { User } from "../../../../types/types";
import { ACCOUNT_ADMIN_USERS } from "../../../../constants/routeConstants";

const UsersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const users = useSelector(selectAdminStateUsers);
    const isLoading = useSelector(selectIsAdminStateLoading);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    return (
        <div>
            <ContentTitle title={"List of all users"} titleLevel={4} icon={<TeamOutlined />} />
            <Table
                loading={isLoading}
                pagination={{ position: ["bottomRight", "topRight"] }}
                dataSource={users}
                columns={[
                    {
                        title: "Id",
                        dataIndex: "id",
                        key: "id"
                    },
                    {
                        title: "First name",
                        dataIndex: "firstName",
                        key: "firstName"
                    },
                    {
                        title: "E-mail",
                        dataIndex: "email",
                        key: "email"
                    },
                    {
                        title: "Role",
                        dataIndex: "roles",
                        key: "roles",
                        render: (_, user: User) => user.roles[0]
                    },
                    {
                        title: "Provider",
                        dataIndex: "provider",
                        key: "provider"
                    },
                    {
                        title: "Action",
                        dataIndex: "amount",
                        key: "amount",
                        render: (_, user: User) => <Link to={`${ACCOUNT_ADMIN_USERS}/${user.id}`}>Show more</Link>
                    }
                ]}
            />
        </div>
    );
};

export default UsersList;
