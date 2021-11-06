/*
organizer
startDate
endDate
regStartDate
regEndDate
minQuota
maxQuota
notes
lateRegFeename
*/

import React from 'react';
import axios from 'axios';

import EventList from './EventList.jsx';
import { BodyWrapper, StyledButton, ButtonWrapper } from './Styles.jsx';

class CampEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currently set as an array because later we expect to get multiple events information
      events: null,
    };
  }

  componentDidMount() {
    const dateConverter = (num) => {
      let months = {
        0: 'January',
        1: 'Febuary',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      };
      let dateString = new Date(num * 1000);
      let dateObj = {
        year: dateString.getFullYear(),
        month: months[dateString.getMonth()],
        date: dateString.getDate()
      };
      return dateObj;
    }

    axios.get(`https://smai.us/api/event/get?id=1`)
    .then((response) => {
      console.log(response);
      let data = response.data.data.values;
      const newData = [];
      newData.push(data);
      newData[0].startDate = dateConverter(newData[0].startDate);
      newData[0].endDate = dateConverter(newData[0].endDate);

      this.setState({events: newData});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    if (!this.state.events) {
      return null;
    }
    return(
      <BodyWrapper>
        <h1>UPCOMING Camps/Events</h1>
        <div>2022</div>
        <EventList
          events={this.state.events}
          switchAndSet={this.props.switchAndSet}
        ></EventList>
      </BodyWrapper>
    )
  }
}

export default CampEvents;