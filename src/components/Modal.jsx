import React from 'react'
import { Link } from 'react-router-dom'
import CloseImg from '../images/close.svg'
import './styles/modal.css'

const Modal = ({setPlanet, planet }) => {
  console.log('modal!');
  const back = (e) => {
    setPlanet(null)
  }
  return (
    <div
      onClick={back}
      className="backdrop"
    >
      <div className='modal'>
      <Link className="back" onClick={back} to="/"><img src={CloseImg} alt="Back" /></Link>
        
        <h1 className="mdc-card__title mdc-card__title--large">{planet.name}</h1>
          <section className="mdc-card__supporting-text">
            Page: <Link to={`/planet?url=${planet.url}`} >/planet?url={planet.url}</Link>
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

export default Modal
