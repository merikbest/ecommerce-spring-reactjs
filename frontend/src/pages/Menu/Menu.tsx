import React, {FC, useEffect, useState} from "react";
import {Route, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Checkbox from "../../component/CheckBox/Checkbox";
import CheckboxRadio from "../../component/CheckboxRadio/CheckboxRadio";
import MenuCards from "../../component/MenuCards/MenuCards";
import {gender, perfumer, price} from "./MenuData";
import {
    fetchPerfumes,
    fetchPerfumesByFilterParams,
    fetchPerfumesByGender,
    fetchPerfumesByPerfumer
} from "../../redux/thunks/perfume-thunks";
import "./MenuStyle.css";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {FilterParamsType, Perfume} from "../../types/types";
import ScrollButton from "../../component/ScrollButton/ScrollButton";

const Menu: FC = () => {
    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.perfumes);
    const loading: boolean = useSelector((state: AppStateType) => state.perfume.isPerfumeLoading);
    const [filterParams, setFilterParams] = useState<FilterParamsType>({
        perfumers: [],
        genders: [],
        prices: []
    });
    const [sortByPrice, setSortByPrice] = useState<boolean>();
    const {state} = useLocation<{ id: string }>();

    useEffect(() => {
        const perfumeData: string = state.id;

        if (perfumeData === "female" || perfumeData === "male") {
            dispatch(fetchPerfumesByGender({perfumeGender: perfumeData}));
            window.scrollTo(0, 0);
        } else if (perfumeData === "all") {
            dispatch(fetchPerfumes());
            window.scrollTo(0, 0);
        } else {
            dispatch(fetchPerfumesByPerfumer({perfumer: perfumeData}));
            window.scrollTo(0, 0);
        }
    }, []);

    const getProducts = (variables: FilterParamsType): void => {
        dispatch(fetchPerfumesByFilterParams(variables));
    };

    const handlePrice = (value: number): Array<number> => {
        let find = price.find((item) => item.id == value);
        return find!.array;
    };

    const handleFilters = (filters: Array<string> | number, category: string): void => {
        const newFilters: any = filterParams;
        newFilters[category] = filters;

        if (category === "prices") {
            let priceValues = handlePrice(filters as number);
            newFilters[category] = priceValues;
        }
        getProducts({...newFilters, sortByPrice})
        setFilterParams(newFilters);
    };

    const handleSortByPrice = (sortedBy: boolean, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        event.preventDefault();

        setSortByPrice(sortedBy);
        getProducts({...filterParams, sortByPrice: sortedBy});
    };

    return (
        <div className="container d-flex">
            <ScrollButton/>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Perfumes</h3>
                </div>
                <ul className="list-unstyled components">
                    <h5>Brand</h5>
                    <li className="active mb-2" id="homeSubmenu">
                        <Checkbox list={perfumer}
                                  handleFilters={(filters) => handleFilters(filters, "perfumers")}/>
                    </li>
                    <h5>Gender</h5>
                    <li className="active mb-2">
                        <Checkbox list={gender}
                                  handleFilters={(filters) => handleFilters(filters, "genders")}/>
                    </li>
                    <h5>Price</h5>
                    <li className="active mb-2">
                        <CheckboxRadio list={price}
                                       handleFilters={(filters) => handleFilters(filters, "prices")}/>
                    </li>
                </ul>
            </nav>
            <Route exact component={() =>
                <MenuCards
                    data={perfumes}
                    loading={loading}
                    itemsPerPage={16}
                    searchByData={[
                        {label: 'Brand', value: 'perfumer'},
                        {label: 'Perfume title', value: 'perfumeTitle'},
                        {label: 'Manufacturer country', value: 'country'}]}
                    sortByPrice={sortByPrice}
                    handleSortByPrice={handleSortByPrice}/>}/>
        </div>
    );
};

export default Menu;
