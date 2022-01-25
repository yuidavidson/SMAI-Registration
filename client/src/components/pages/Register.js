import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import api from "../../api/api";
import {makeUrl} from "../../utils/nav-utils";
import CampModel from "../../models/camp";
import RegistrationModel from "../../models/registration";

const Register = ({}) => {
  let urlParams = useParams();
  const [/** @type {CampModel} event */ event, setEvent] = useState(null);

  useEffect(() => {
    api.run('events', null, true)
      .then((response) => {
        let eventMatch = null;
        response.data.filter(item => item.urlName === urlParams.eventId).some(item => {
          eventMatch = new CampModel({
            ...item,
            startDate: new Date(item.startDate * 1000).toLocaleDateString(),
            endDate: new Date(item.endDate * 1000).toLocaleDateString(),
            regStartDate: new Date(item.regStartDate * 1000).toLocaleDateString(),
            regEndDate: new Date(item.regEndDate * 1000).toLocaleDateString()
          });
          return true;
        });
        setEvent(eventMatch);
      })
      .catch((error) => {
        alert(error);
      })
  }, []);

  const [/** @type {RegistrationModel} registration */ registration, setRegistration] = useState(null);
  const [isGoing, setGoing] = useState({});
  useEffect(() => {
    if (!event || !event.id) {
      return;
    }
    api.run('registration', {eventId: event.id}, true)
      .then((response) => {
        setRegistration(response.data);
        setGoing(Object.fromEntries(response.data.party.map(camper => [camper.id, false])));
      })
      .catch((error) => {
        console.log(error);
      })
  }, [event]);

  const onSetGoingClick = (camperId, state) => {
    setGoing({...isGoing, [camperId]: state});
  };
  return <section>
    {event && <React.Fragment>
      <h1>Register for {event.name}</h1>
      <div>{event.startDate} - {event.endDate}</div>
      <div>{event.maxQuota} campers max</div>

      <div>
        <h2>My Party</h2>
        <ul>{registration && registration.party.map(/** @type {CamperModel} camper */ camper =>
          <li key={camper.id}>
            <div><strong>{camper.firstName} {camper.lastName}: </strong></div>
            <ul>
              <li>Is {camper.firstName} going?
                <button type='button' className={'yes ' + (isGoing[camper.id] && ' selected')} onClick={e => onSetGoingClick(camper.id, true)}>Yes</button><button type='button' className={'no ' + (!isGoing[camper.id] && ' selected')} onClick={e => onSetGoingClick(camper.id, false)}>No</button>
              </li>
              {isGoing[camper.id] && <React.Fragment>
              <li><Link to={makeUrl(`/register/${event.id}/${camper.id}`)}>update info</Link></li>
              <li><Link to={makeUrl(`/register/${event.id}/${camper.id}`)}>select sessions</Link></li>
              </React.Fragment>}
            </ul>

          </li>
        )}</ul>
      </div>
    </React.Fragment>}
  </section>
};

export default Register;