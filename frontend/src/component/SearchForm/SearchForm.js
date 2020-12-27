import React, {useState} from 'react';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SearchForm = ({data, searchByData, setFilteredData, setSearching}) => {
    const [search, setSearch] = useState('');
    const [searchFor, setSearchFor] = useState('');
    const [searchBy, setSearchBy] = useState(searchByData && searchByData.length > 0 ? searchByData[0].value : '');

    const submitHandler = (event) => {
        event.preventDefault();

        if (search.trim() !== '') {
            setSearching(true);
            const copiedData = [...data];
            const filtered = copiedData.filter(perfumer => {
                let searchKey = 'perfumer';
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
    }

    return (
        <form onSubmit={submitHandler} style={{justifyContent: 'center'}}>
            <div className="row">
                {searchByData && searchByData.length > 0 &&
                <div className="col-sm-6">
                    <select className="form-control" value={searchBy}
                            onChange={(event) => setSearchBy(event.target.value)}>
                        {searchByData.map((data, index) => (
                            <option key={index} value={data.value}>{data.label}</option>
                        ))}
                    </select>
                </div>}
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}/>
                </div>
                <button type="submit" className="btn btn-dark">
                    <FontAwesomeIcon icon={faSearch}/> Search</button>
            </div>
        </form>
    );
};

export default SearchForm;