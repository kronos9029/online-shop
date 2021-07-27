import React from 'react'
import '../../../assets/style/AdminSearchBar.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function AdminSearchBar() {

    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();
    function handleSubmit(event) {
        try {
            sessionStorage.setItem('searchValue', searchValue);
            history.push("/Admin/result");
            window.location.reload(false);
        } catch (e) {
           alert('Something went wrong')
        }
    }

    return (
        <div className="wrap">
        <div className="search">
            <input type="text" className="searchTerm" onChange={(e) => setSearchValue(e.target.value)} placeholder="What are you looking for?"/>
            <button onClick={(e) => {handleSubmit(e)}} type="submit" className="searchButton">
                <i className="fa fa-search"></i>
            </button>
        </div>
        </div>
    )
}
