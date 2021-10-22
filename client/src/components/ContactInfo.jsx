import React from 'react';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      currentCamper: props.currentCamper
    };
    this.EditContactInfo = this.EditContactInfo.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
  }

  EditContactInfo() {
    this.setState({step: 'Contact'});
  }

  HandleChange(e) {
    let editedCamper = this.state.currentCamper;
    editedCamper.contact[e.target.name] = e.target.value;
    this.setState({currentCamper: editedCamper, change: true});
  }

  render() {
    if (!this.state.step) {
      return (
        <div>
          <div>Contact Information</div>
          <div>Last updated: A long time ago</div>
          <button onClick={this.EditContactInfo}>Update Information</button>
        </div>
      )
    } else if (this.state.step === 'Contact') {
      return (
        <div>
          <div>Address</div>
          <input type='text' name='address' value={this.state.currentCamper.contact.address} onChange={this.HandleChange}></input>
          <div>City</div>
          <input type='text' name='city' value={this.state.currentCamper.contact.city} onChange={this.HandleChange}></input>
          <div>State</div>
          <input type='text' name='region' value={this.state.currentCamper.contact.region} onChange={this.HandleChange}></input>
          <div>Zip</div>
          <input type='text' name='zip' value={this.state.currentCamper.contact.zip} onChange={this.HandleChange}></input>
          <div>Country</div>
          <input type='text' name='country' value={this.state.currentCamper.contact.country} onChange={this.HandleChange}></input>
          <div>Phone Number 1</div>
          <input type='text' name='phone1' value={this.state.currentCamper.contact.phone1} onChange={this.HandleChange}></input>
          <div>Phone Number 2</div>
          <input type='text' name='phone2' value={this.state.currentCamper.contact.phone2} onChange={this.HandleChange}></input>
          <div>Email 1</div>
          <input type='text' name='email1' value={this.state.currentCamper.contact.email1} onChange={this.HandleChange}></input>
          <div>Email 2</div>
          <input type='text' name='email2' value={this.state.currentCamper.contact.email2} onChange={this.HandleChange}></input>
          <button>Save</button>
        </div>
      )
    }
  }
}

export default ContactInfo;