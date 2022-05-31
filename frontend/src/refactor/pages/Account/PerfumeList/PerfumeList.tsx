import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Col, notification, Pagination, Row } from "antd";

import { selectIsPerfumeDeleted } from "../../../../redux-toolkit/admin/admin-selector";
import { selectPerfumes } from "../../../../redux-toolkit/perfumes/perfumes-selector";
import { fetchPerfumes } from "../../../../redux-toolkit/perfumes/perfumes-thunks";
import { resetPerfumesState } from "../../../../redux-toolkit/perfumes/perfumes-slice";
import { resetAdminState } from "../../../../redux-toolkit/admin/admin-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import SelectSearchData from "../../../components/SelectSearchData/SelectSearchData";
import InputSearch from "../../../components/InputSearch/InputSearch";
import PerfumeCard from "../../../components/PerfumeCard/PerfumeCard";
import { deletePerfume } from "../../../../redux-toolkit/admin/admin-thunks";
import { Perfume } from "../../../../types/types";
import DeleteModal from "./DeleteModal/DeleteModal";
import "./PerfumeList.css";

const MAX_PAGE_VALUE = 15;

const PerfumeList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);
    const isPerfumeDeleted = useSelector(selectIsPerfumeDeleted);
    const [selectValue, setSelectValue] = useState<string>("");
    const [minPageValue, setMinPageValue] = useState<number>(0);
    const [maxPageValue, setMaxPageValue] = useState<number>(MAX_PAGE_VALUE);
    const [perfumeInfo, setPerfumeInfo] = useState<Perfume>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchPerfumes());

        return () => {
            dispatch(resetPerfumesState());
            dispatch(resetAdminState());
        };
    }, []);

    useEffect(() => {
        if (isPerfumeDeleted) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Perfume deleted",
                description: "Perfume successfully deleted!"
            });
        }
    }, [isPerfumeDeleted]);

    const handleChangeSelect = (value: string): void => {
        setSelectValue(value);
    };

    const onSearch = (): void => {
        // TODO add search action
    };

    const handleChangePagination = (page: number, pageSize: number): void => {
        setMinPageValue((page - 1) * MAX_PAGE_VALUE);
        setMaxPageValue(page * MAX_PAGE_VALUE);
    };

    const showDeleteModalWindow = (perfume: Perfume): void => {
        setIsModalVisible(true);
        setPerfumeInfo(perfume);
    };

    const deletePerfumeHandler = (): void => {
        dispatch(deletePerfume(perfumeInfo?.id!));
    };

    const handleCancel = (): void => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <ContentTitle title={"List of perfumes"} titleLevel={4} icon={<UnorderedListOutlined />} />
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={9}>
                            <SelectSearchData handleChangeSelect={handleChangeSelect} />
                        </Col>
                        <Col span={10}>
                            <InputSearch onSearch={onSearch} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16, marginBottom: 16 }}>
                        <Col span={16}>
                            <Pagination
                                defaultCurrent={1}
                                pageSize={MAX_PAGE_VALUE}
                                total={perfumes.length}
                                showSizeChanger={false}
                                onChange={handleChangePagination}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[32, 32]}>
                        {perfumes &&
                            perfumes.length > 0 &&
                            perfumes
                                .slice(minPageValue, maxPageValue)
                                .map((perfume, index) => (
                                    <PerfumeCard
                                        key={index}
                                        perfume={perfume}
                                        colSpan={8}
                                        onOpenDelete={showDeleteModalWindow}
                                        edit
                                    />
                                ))}
                    </Row>
                    <Row style={{ marginTop: 16, marginBottom: 16 }}>
                        <Pagination
                            defaultCurrent={1}
                            pageSize={MAX_PAGE_VALUE}
                            total={perfumes.length}
                            showSizeChanger={false}
                            onChange={handleChangePagination}
                        />
                    </Row>
                </Col>
            </Row>
            <DeleteModal
                visible={isModalVisible}
                deletePerfumeHandler={deletePerfumeHandler}
                handleCancel={handleCancel}
                perfumeInfo={perfumeInfo}
            />
        </div>
    );
};

export default PerfumeList;
