import React, { useState, useEffect } from 'react'
import CountryDisplay from './components/CountryDisplay'
import axios from 'axios'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ searchTerm, setSearchTerm ] = useState('')

    const fetchCountry = () => {
        console.log('fetching country data')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }
    useEffect(fetchCountry, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const countriesToShow = searchTerm == ''
        ? countries
        : countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const displayResults = () => {
        if (searchTerm == '') {
            return(<div></div>)
        } else {
            return(<CountryDisplay countries={countriesToShow} setSearchTerm={setSearchTerm} />)
        }
    }

    return(
        <div>
            <form>
                <div>find countries: <input value={searchTerm} onChange={handleSearchChange}></input></div>
            </form>
            {displayResults()}
        </div>
    )
}

export default App