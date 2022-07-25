import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Col, notification, Pagination, Row } from "antd";

import { selectIsPerfumeDeleted } from "../../../redux-toolkit/admin/admin-selector";
import { selectIsPerfumesLoading, selectPerfumes } from "../../../redux-toolkit/perfumes/perfumes-selector";
import { fetchPerfumes, fetchPerfumesByInputText } from "../../../redux-toolkit/perfumes/perfumes-thunks";
import { resetPerfumesState } from "../../../redux-toolkit/perfumes/perfumes-slice";
import { resetAdminState } from "../../../redux-toolkit/admin/admin-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import SelectSearchData from "../../../components/SelectSearchData/SelectSearchData";
import InputSearch from "../../../components/InputSearch/InputSearch";
import PerfumeCard from "../../../components/PerfumeCard/PerfumeCard";
import { deletePerfume } from "../../../redux-toolkit/admin/admin-thunks";
import { LoadingStatus, PerfumeResponse } from "../../../types/types";
import DeleteModal from "./DeleteModal/DeleteModal";
import Spinner from "../../../components/Spinner/Spinner";
import { MAX_PAGE_VALUE, usePagination } from "../../../hooks/usePagination";
import { useSearch } from "../../../hooks/useSearch";
import "./PerfumeList.css";

const PerfumeList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);
    const isPerfumesLoading = useSelector(selectIsPerfumesLoading);
    const isPerfumeDeleted = useSelector(selectIsPerfumeDeleted);
    const [perfumeInfo, setPerfumeInfo] = useState<PerfumeResponse>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const { currentPage, totalElements, handleChangePagination } = usePagination();
    const { searchValue, searchTypeValue, onSearch, handleChangeSelect } = useSearch();

    useEffect(() => {
        dispatch(fetchPerfumes(0));

        return () => {
            dispatch(resetPerfumesState());
            dispatch(resetAdminState(LoadingStatus.LOADING));
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

    const changePagination = (page: number, pageSize: number): void => {
        if (searchValue) {
            dispatch(
                fetchPerfumesByInputText({ searchType: searchTypeValue, text: searchValue, currentPage: page - 1 })
            );
        } else {
            dispatch(fetchPerfumes(page - 1));
        }
        handleChangePagination(page, pageSize);
    };

    const showDeleteModalWindow = (perfume: PerfumeResponse): void => {
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
                    {isPerfumesLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <Row style={{ marginTop: 16, marginBottom: 16 }}>
                                <Col span={16}>
                                    <Pagination
                                        current={currentPage}
                                        pageSize={MAX_PAGE_VALUE}
                                        total={totalElements}
                                        showSizeChanger={false}
                                        onChange={changePagination}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[32, 32]}>
                                {perfumes.map((perfume) => (
                                    <PerfumeCard
                                        key={perfume.id}
                                        perfume={perfume}
                                        colSpan={8}
                                        onOpenDelete={showDeleteModalWindow}
                                        edit
                                    />
                                ))}
                            </Row>
                            <Row style={{ marginTop: 16, marginBottom: 16 }}>
                                <Pagination
                                    current={currentPage}
                                    pageSize={MAX_PAGE_VALUE}
                                    total={totalElements}
                                    showSizeChanger={false}
                                    onChange={changePagination}
                                />
                            </Row>
                        </>
                    )}
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
