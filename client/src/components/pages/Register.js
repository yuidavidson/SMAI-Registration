import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import api from "../../api/api";
import CampModel from "../../models/camp";

const Register = ({}) => {
  let urlParams = useParams();
  /**
   */
  const [/** @type {CampModel} event */ event, setEvent] = useState(null);

  useEffect(() => {
    api.run('event/getall', null, true)
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
        console.log(error);
      })
  }, []);

  return <section>
    {event && <React.Fragment>
      <h1>Register for {event.name}</h1>
      <div>{event.startDate} - {event.endDate}</div>
      <div>{event.maxQuota} campers max</div>
    </React.Fragment>}
  </section>
};

export default Register;