import React, { useState } from 'react'

const SingleCountry = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            capital: {props.capital}
            population: {props.population}

            <h2>languages</h2>
            <ul>
                {props.languages.map((language) =>
                    <li>{language.name}</li>
                )}
            </ul>
            <img src={props.image} />
        </div>
    )
}

const App = () => {

    return(
        <div>

        </div>
    )
}