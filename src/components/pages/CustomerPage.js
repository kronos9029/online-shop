import React from 'react'
import CustomerNav from '../CustomerNav'
import ProductCard from '../ProductCard'
import SearchBar from '../SearchBar'

export default function CustomerPage() {
    return (
      <>
         <CustomerNav/>
         <SearchBar/>
         <ProductCard/>
      </>
    )
}
