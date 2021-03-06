import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import './../assets/style/SearchBar.css'

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();
    function handleSubmit(event) {
        event.preventDefault();
        try {
            sessionStorage.setItem('searchValue', searchValue);
            history.push("/home/result");
            window.location.reload(false);
        } catch (e) {
           alert('Something went wrong')
        }
    }
    
    return (
            <div className="wrap">
            <div className="search">
                <input type="text" name="searchValue"  className="searchTerm" onChange={(e) => setSearchValue(e.target.value)} placeholder="What are you looking for?" />
                <button onClick={(e) => {handleSubmit(e)}}  type="submit" className="searchButton">
                    <i className="fa fa-search"></i>
                </button>
            </div>
            </div>
    )
}
