import React, {FC, FormEvent, useState} from 'react';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Perfume} from "../../types/types";

type PropsType = {
    data: Array<Perfume>
    searchByData: Array<{ label: string, value: string }>
    setFilteredData: (value: (((prevState: Array<Perfume>) => Array<Perfume>) | Array<Perfume>)) => void
    setSearching: (value: (((prevState: boolean) => boolean) | boolean)) => void
};

const SearchForm: FC<PropsType> = ({data, searchByData, setFilteredData, setSearching}) => {
    const [search, setSearch] = useState<string>("");
    const [searchFor, setSearchFor] = useState<string>("");
    const [searchBy, setSearchBy] = useState<string>(searchByData && searchByData.length > 0 ? searchByData[0].value : "");

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (search.trim() !== '') {
            setSearching(true);
            const copiedData: Array<Perfume> = [...data];
            const filtered: Array<Perfume> = copiedData.filter((perfumer: any) => {
                let searchKey: string = 'perfumer';
                if (searchByData && searchByData.length > 0) {
                    searchKey = searchBy;
                }
                return perfumer[searchKey].toLowerCase().includes(search.trim().toLowerCase());
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
        setSearchFor(search);
    };

    return (
        <form onSubmit={submitHandler} style={{justifyContent: 'center'}}>
            <div className="row">
                {searchByData && searchByData.length > 0 &&
                <div className="col-md-4">
                    <select className="form-control" value={searchBy}
                            onChange={(event) => setSearchBy(event.target.value)}>
                        {searchByData.map((data, index) => (
                            <option key={index} value={data.value}>{data.label}</option>
                        ))}
                    </select>
                </div>}
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}/>
                </div>
                <div className="col-md-5">
                    <button type="submit" className="btn btn-dark">
                        <FontAwesomeIcon icon={faSearch}/> Search</button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;
