import React from 'react'

const SingleCountry = ({ country }) => {
    
    return (
        <div>
            <h1>{country.name}</h1>
            capital: {country.capital} <br/>
            population: {country.population}

            <h2>languages</h2>
            <ul>
                {country.languages.map((language) =>
                    <li key={language.name}>{language.name}</li>
                )}
            </ul>
            <img src={country.flag} height="200" width="200" />
        </div>
    )
}

const CountryName = ({ name, handleClick}) => {
    return (
        <div>
            <li>
                {name} <button onClick={handleClick}>show</button>
            </li>
        </div>
    )
}

const CountryDisplay = ({ countries, setSearchTerm }) => {

    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (countries.length < 11 && countries.length > 1) {
        return (
            <div>
                <ul>
                    {countries.map((country) => 
                        <CountryName key={country.name} name={country.name} handleClick={() => setSearchTerm(country.name)} />
                    )}
                </ul>
            </div>
        )
    } else if (countries.length == 0) {
        return (
            <div>No matches found</div>
        )
    } else if (countries.length == 1) {
        return (
            <SingleCountry country={countries[0]} />
        )
    }
}

export default CountryDisplay