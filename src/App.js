import React, { useState, useEffect } from 'react'
import './App.css';

export default function App() {
  const [people, setPeople] = useState([])

  // Fetch ipdata.co client info
  useEffect(() => {
    const url = 'https://randomuser.me/api/?nat=us&results=10'
    fetch(url)
      .then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(data => {
        console.log('%c data ', 'background: red; color: white', data)
        setPeople(data.results)
      })
  }, [])

  console.log('%c people ', 'background: red; color: white', people)

  const peopleList = people.map((person, index) => {
    return(
      <Person
        key={index}
        person={person}
      />
    )
  })

  console.log('%c peopleList ', 'background: red; color: white', peopleList);

  return (
    <div>
      <h2>People - Ejected</h2>
      <p>Images from <a href="https://randomuser.me/" target="_blank" rel="noopener noreferrer" >
      Random User API</a>, a free API for generating random user data</p>
      <div className="people-container">
        {peopleList}
      </div>
    </div>
  )
}

function Person(props) {
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, ((txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    }))
  }

  return(
      <div className="card">
        <img src={props.person.picture.large} alt={props.person.name.first}></img>
        <h3 className="big-text">{toTitleCase(props.person.name.first)}</h3>
        <p className="fine-print"><i>from</i></p>
        <p>{toTitleCase(props.person.location.state)}</p>
      </div>
  )
}
