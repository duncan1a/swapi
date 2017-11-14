import React from 'react'
import { Link } from 'react-router-dom'
import BackImg from '../images/back.svg'

const Planet = ({ planet }) => {

    return (
      <div className="content">
        <div className="mdc-card ">
          <Link className="back" to="/"><img src={BackImg} alt="Back" /></Link>
          <h1 className="mdc-card__title mdc-card__title--large">{planet.name}</h1>
            <section className="mdc-card__supporting-text">
            <table>
              <tbody>
                <tr>
                  <th>Diameter</th>
                  <td>{planet.diameter}km</td>
                </tr>
                <tr>
                  <th>Population</th>
                  <td>{planet.population}</td>
                </tr>
                <tr>
                  <th>Climate</th>
                  <td>{planet.climate}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    )
}


Planet.defaultProps = {
  planet: {}
}


export default Planet
