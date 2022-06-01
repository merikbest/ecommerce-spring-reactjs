import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Layout, Pagination, RadioChangeEvent, Row, Typography } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useLocation } from "react-router-dom";
import "antd/dist/antd.css";

import MenuCheckboxSection from "./MenuSection/MenuCheckboxSection";
import { gender, perfumer, price } from "../../../pages/Menu/MenuData";
import { selectIsPerfumesLoading, selectPerfumes } from "../../../redux-toolkit/perfumes/perfumes-selector";
import { FilterParamsType } from "../../../types/types";
import "./Menu2.css";
import {
    fetchPerfumes,
    fetchPerfumesByFilterParams,
    fetchPerfumesByGender,
    fetchPerfumesByPerfumer
} from "../../../redux-toolkit/perfumes/perfumes-thunks";
import { resetPerfumesState } from "../../../redux-toolkit/perfumes/perfumes-slice";
import MenuRadioSection from "./MenuSection/MenuRadioSection";
import MenuSorter from "./MenuSorter/MenuSorter";
import PerfumeCard from "../../components/PerfumeCard/PerfumeCard";
import SelectSearchData from "../../components/SelectSearchData/SelectSearchData";
import InputSearch from "../../components/InputSearch/InputSearch";
import Spinner from "../../components/Spinner/Spinner";
import { MAX_PAGE_VALUE, usePagination } from "../../hooks/usePagination";

export enum CheckboxCategoryFilter {
    PERFUMERS = "PERFUMERS",
    GENDERS = "GENDERS"
}

const Menu2: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);
    const isPerfumesLoading = useSelector(selectIsPerfumesLoading);
    const location = useLocation<{ id: string }>();
    const [filterParams, setFilterParams] = useState<FilterParamsType>({
        perfumers: [],
        genders: [],
        prices: [1, 999]
    });
    const [sortByPrice, setSortByPrice] = useState<boolean | undefined>(undefined);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectValue, setSelectValue] = useState<string>("");
    const { currentPage, minPageValue, maxPageValue, handleChangePagination, resetPagination } = usePagination();

    useEffect(() => {
        const perfumeData = location.state.id;

        if (perfumeData === "female" || perfumeData === "male") {
            dispatch(fetchPerfumesByGender({ perfumeGender: perfumeData }));
        } else if (perfumeData === "all") {
            dispatch(fetchPerfumes());
        } else {
            dispatch(fetchPerfumesByPerfumer({ perfumer: perfumeData }));
        }
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetPerfumesState());
        };
    }, []);

    useEffect(() => {
        getProducts();
        resetPagination();
    }, [filterParams, sortByPrice]);

    const onChangeCheckbox = (checkedValues: CheckboxValueType[], category: CheckboxCategoryFilter): void => {
        if (CheckboxCategoryFilter.PERFUMERS === category) {
            setFilterParams((prevState) => ({
                ...prevState,
                perfumers: [...(checkedValues as string[])]
            }));
        } else if (CheckboxCategoryFilter.GENDERS === category) {
            setFilterParams((prevState) => ({
                ...prevState,
                genders: [...(checkedValues as string[])]
            }));
        }
    };

    const onChangeRadio = (event: RadioChangeEvent): void => {
        setFilterParams((prevState) => ({
            ...prevState,
            prices: event.target.value
        }));
    };

    const handleChangeSelect = (value: string): void => {
        setSelectValue(value);
    };

    const onSearch = (): void => {
        // TODO add search action
    };

    const handleChangeSortPrice = (event: RadioChangeEvent): void => {
        setSortByPrice(event.target.value);
    };

    const getProducts = (): void => {
        dispatch(fetchPerfumesByFilterParams({ ...filterParams, sortByPrice }));
    };

    return (
        <Layout>
            <Layout.Content className={"login-content"}>
                <Typography.Title level={2}>Perfumes</Typography.Title>
                <Row gutter={32}>
                    <Col span={6}>
                        <MenuCheckboxSection
                            title={"Brand"}
                            onChange={onChangeCheckbox}
                            data={perfumer}
                            category={CheckboxCategoryFilter.PERFUMERS}
                        />
                        <MenuCheckboxSection
                            title={"Gender"}
                            onChange={onChangeCheckbox}
                            data={gender}
                            category={CheckboxCategoryFilter.GENDERS}
                        />
                        <MenuRadioSection title={"Price"} onChange={onChangeRadio} data={price} />
                    </Col>
                    <Col span={18}>
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
                                    current={currentPage}
                                    pageSize={MAX_PAGE_VALUE}
                                    total={perfumes.length}
                                    showSizeChanger={false}
                                    onChange={handleChangePagination}
                                />
                            </Col>
                            <Col span={8}>
                                <MenuSorter onChange={handleChangeSortPrice} sortByPrice={sortByPrice} />
                            </Col>
                        </Row>
                        <Row gutter={[32, 32]}>
                            {isPerfumesLoading ? (
                                <Spinner />
                            ) : (
                                perfumes &&
                                perfumes.length > 0 &&
                                perfumes
                                    .slice(minPageValue, maxPageValue)
                                    .map((perfume, index) => <PerfumeCard key={index} perfume={perfume} colSpan={8} />)
                            )}
                        </Row>
                        <Row style={{ marginTop: 16, marginBottom: 16 }}>
                            <Pagination
                                current={currentPage}
                                pageSize={MAX_PAGE_VALUE}
                                total={perfumes.length}
                                showSizeChanger={false}
                                onChange={handleChangePagination}
                            />
                        </Row>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default Menu2;
