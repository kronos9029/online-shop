import React from 'react'
import './../assets/style/SearchBar.css'

export default function SearchBar() {
    return (
            <div className="wrap">
            <div className="search">
                <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
                <button type="submit" className="searchButton">
                    <i className="fa fa-search"></i>
                </button>
            </div>
            </div>
    )
}
