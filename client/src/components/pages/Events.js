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
            startDate: new Date(item.startDate).toLocaleDateString(),
            endDate: new Date(item.startDate).toLocaleDateString(),
            regStartDate: new Date(item.startDate).toLocaleDateString(),
            regEndDate: new Date(item.startDate).toLocaleDateString()
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
      {event.name} ({event.startDate} - {event.endDate})
    </div>)}
  </section>
};

export default Events;