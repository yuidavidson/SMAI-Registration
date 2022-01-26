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
            startDateStr: new Date(item.startDate * 1000).toLocaleDateString(),
            endDateStr: new Date(item.endDate * 1000).toLocaleDateString(),
            regStartDateStr: new Date(item.regStartDate * 1000).toLocaleDateString(),
            regStartDate: new Date(item.regStartDate * 1000),
            regEndDateStr: new Date(item.regEndDate * 1000).toLocaleDateString()
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
  const [isInfoComplete, setInfoComplete] = useState({});
  useEffect(() => {
    if (!event || !event.id) {
      return;
    }
    api.run('registration', {eventId: event.id}, true)
      .then((response) => {
        setRegistration(response.data);
        setGoing(Object.fromEntries(response.data.party.map(camper => [camper.id, false])));
        setInfoComplete(Object.fromEntries(response.data.party.map(camper => {
          const date = camper.lastReviewedAndConfirmed ? new Date(camper.lastReviewedAndConfirmed * 1000) : null;
          return [camper.id, {
            date: date ? date.toLocaleDateString() : '2019',
            isComplete: date && date.getTime() > event.regStartDate.getTime()
          }];
        })));
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
      <div>{event.startDateStr} - {event.endDateStr}</div>
      <div>registration is open from {event.regStartDateStr} to {event.regEndDateStr}</div>
      <div>{event.maxQuota} campers max</div>

      <div>
        <h2>My Party</h2>
        <ul>{registration && registration.party.map(/** @type {CamperModel} camper */ camper =>
          <li key={camper.id}>
            <div><strong>{camper.firstName} {camper.lastName}</strong>&nbsp;
              {registration.partyHeadId === camper.id && <span style={{backgrounColor: 'gold'}}>party head</span>}&nbsp;
              {registration.currentCamperId === camper.id && <span style={{backgrounColor: 'blue'}}>(ME)</span>}
            </div>
            <ul>
              <li>Is {camper.firstName} going?
                <button type='button' className={'yes ' + (isGoing[camper.id] && ' selected')} onClick={e => onSetGoingClick(camper.id, true)}>Yes</button><button type='button' className={'no ' + (!isGoing[camper.id] && ' selected')} onClick={e => onSetGoingClick(camper.id, false)}>No</button>
              </li>
              {isGoing[camper.id] && <React.Fragment>
              <li>
                <Link to={makeUrl(`/register/${event.id}/${camper.id}/info`)}>update info</Link> &nbsp;
                {(isInfoComplete[camper.id] && !isInfoComplete[camper.id].isComplete) && <span style={{color: 'red'}}>needs review</span>} &nbsp;
                {isInfoComplete[camper.id] && <span style={{color: 'blue'}}>last reviewed: {isInfoComplete[camper.id].date}</span>}

              </li>
              <li>
                <Link to={makeUrl(`/register/${event.id}/${camper.id}/sessions`)}>select sessions</Link>
              </li>
              </React.Fragment>}
            </ul>

          </li>
        )}</ul>

        <h3>Want to change your party?</h3>
        <p>Would you like to add or remove folks from your party?</p>
        <p>Would you like to join a different party or perhaps start your own?</p>
        <p><strong>Please talk to or <a href='#contact-form'>write</a> to Josh or a registrar!</strong></p>
      </div>
    </React.Fragment>}
  </section>
};

export default Register;