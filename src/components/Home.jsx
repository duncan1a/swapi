// this shows the table of people

import React from 'react'
import moment from 'moment'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const Home = ({ people, planets, setPlanet }) => {

  // default filter for headings
  const defaultFilter = (filter, row) =>{
    let exp = new RegExp(filter.value, 'i')
    return row[filter.id].match(exp)
  }

  // planets need a special filter
  const planetFilter = (filter, row) => {
    let exp = new RegExp(filter.value, 'i')
    if(planets[row[filter.id]]){
      return planets[row[filter.id]].name.match(exp)
    }
    return true
  }

  // set up the columns
  const columns = [
    {'Header': 'Name', 'accessor': 'name'},
    {'Header': 'Planet',
      id: 'planet',
      'accessor': d => {
          return  d.homeworld
        },
      'Cell': d => {
          if(planets[d.row.planet]){
            // don't link if unknown
            return  planets[d.row.planet].name === "unknown" ? planets[d.row.planet].name : (
              <a className="link" onClick={() => {
                setPlanet(d.row.planet)
              }} >{planets[d.row.planet].name}</a>
            )
          }
          // hasn't loaded yet
          return '...'
        },
      'filterMethod': planetFilter
      },
    {'Header': 'Height', id: 'height',  'accessor': d => d.height === 'unknown'? d.height : `${d.height}cm`}, // check if we need to add 'cm'
    {'Header': 'Mass', id: 'mass', 'accessor': d => d.mass === 'unknown'? d.mass : `${d.mass}kg`},  // check if we need to add 'kg'
    {'Header': 'Created','id': 'created', 'accessor': d => moment(d.created).format("MMM Do 'YY")},
    {'Header': 'Edited','id': 'edites', 'accessor': d => moment(d.edited).format("MMM Do 'YY")}
  ]

  return (
    <div className="content">
      <ReactTable columns={columns}  filterable
        defaultFilterMethod={defaultFilter}
        data={people} />
    </div>
  )
}


Home.defaultProps = {
  people: {},
  planets: {}
}


export default Home
