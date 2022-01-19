import React, {useEffect, useState} from 'react';
import api from "../../api/api";

import CampModel from "../../models/camp";

const Events = () => {
  /**
   * @param {Array<CampModel>} events
   */
  const [eventList, setEvents] = useState([]);
  useEffect(() => {
    api.run('event/getall', null, true)
      .then((response) => {
        let data = response.data.map(item => ({
            ...item,
            startDate: new Date(item.startDate * 1000).toLocaleDateString(),
            endDate: new Date(item.endDate * 1000).toLocaleDateString(),
            regStartDate: new Date(item.regStartDate * 1000).toLocaleDateString(),
            regEndDate: new Date(item.regEndDate * 1000).toLocaleDateString()
        }));
        setEvents(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return <section>
    <h1>Events/Camps</h1>
    {eventList.map(/** @param {CampModel} event */ (event) =>
    <div key={event.name}>
      <h2>{event.name} </h2>
      <div>{event.startDate} - {event.endDate}</div>
      <div>{event.maxQuota} campers max</div>
      <br/><br/>
    </div>)}
  </section>
};

export default Events;