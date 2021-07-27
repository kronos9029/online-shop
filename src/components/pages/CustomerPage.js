import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CustomerNav from '../CustomerNav'
import ProductCard from '../ProductCard'
import ResultCard from '../ResultCard';
import SearchBar from '../SearchBar'


export default function CustomerPage() {
  return (
    <>
      <CustomerNav />
      <SearchBar />
      <Router>
        <Switch>
          <Route path='/home/main' component={ProductCard} />
          <Route path='/home/result' component={ResultCard} />
        </Switch>
      </Router>
    </>
  )
}
