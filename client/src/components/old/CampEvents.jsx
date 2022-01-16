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

import EventList from './EventList.jsx';
import { BodyWrapper, HeaderWrapper, StyledButton, ButtonWrapper, ContentWrapper, StyledHead } from './Styles.jsx';

import api from "../api/api";

class CampEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currently set as an array because later we expect to get multiple events information
      events: null,
      modalState: '',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalType) {
    this.setState({modalState: modalType})
  }

  closeModal() {
    this.setState({ modalState: ''});
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


    // dummy date entry
    // this.setState({events: [{
    //   name: 'SMAI 2022',
    //   organizer: 'Jesus',
    //   maxQuota: 333,
    //   notes: 'Have fun!',
    //   startDate: {year: 2022, month: 'May', date: 10},
    //   endDate: {year: 2022, month: 'May', date: 19},
    //   regStartDate: {year: 2022, month: 'May', date: 10},
    //   regEndDate: {year: 2022, month: 'May', date: 10},
    // }]})
    api.run('event/getall')
    .then((response) => {
      let data = response.data;
      const newData = [];
      // console.log(response);
      for (let i = 0; i < data.length; i++) {
        let info = data[i];
        data[i].startDate = dateConverter(data[i].startDate);
        data[i].endDate = dateConverter(data[i].endDate);
        data[i].regStartDate = dateConverter(data[i].regStartDate);
        data[i].regEndDate = dateConverter(data[i].regEndDate);
        newData.push(data[i]);
      }

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
        <StyledHead fontSize={30}>Upcoming Camps and Events</StyledHead>
        <ContentWrapper>
          <EventList
            events={this.state.events}
            switchAndSet={this.props.switchAndSet}
            openModal={this.openModal}
            closeModal={this.closeModal}
            modalState={this.state.modalState}
          ></EventList>

        </ContentWrapper>
      </BodyWrapper>
    )
  }
}

export default CampEvents;