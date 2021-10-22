import React from 'react';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      currentCamper: props.currentCamper
    };
    this.editContactInfo = this.editContactInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  editContactInfo() {
    this.setState({step: 'Contact'});
  }

  handleChange(e) {
    let editedCamper = this.state.currentCamper;
    editedCamper.contact[e.target.name] = e.target.value;
    this.setState({currentCamper: editedCamper});
  }

  render() {
    if (!this.state.step) {
      return (
        <div>
          <div>Contact Information</div>
          <div>Last updated: A long time ago</div>
          <button onClick={this.editContactInfo}>Update Information</button>
        </div>
      )
    } else if (this.state.step === 'Contact') {
      return(
        <div>
          <div>Address</div>
          <input type='text' name='address' value={this.state.currentCamper.contact.address} onChange={this.handleChange}></input>
          <div>City</div>
          <input type='text' name='city' value={this.state.currentCamper.contact.city} onChange={this.handleChange}></input>
          <div>State</div>
          <input type='text' name='region' value={this.state.currentCamper.contact.region} onChange={this.handleChange}></input>
          <div>Zip</div>
          <input type='text' name='zip' value={this.state.currentCamper.contact.zip} onChange={this.handleChange}></input>
          <div>Country</div>
          <input type='text' name='country' value={this.state.currentCamper.contact.country} onChange={this.handleChange}></input>
          <div>Phone Number 1</div>
          <input type='text' name='phone1' value={this.state.currentCamper.contact.phone1} onChange={this.handleChange}></input>
          <div>Phone Number 2</div>
          <input type='text' name='phone2' value={this.state.currentCamper.contact.phone2} onChange={this.handleChange}></input>
          <div>Email 1</div>
          <input type='text' name='email1' value={this.state.currentCamper.contact.email1} onChange={this.handleChange}></input>
          <div>Email 2</div>
          <input type='text' name='email2' value={this.state.currentCamper.contact.email2} onChange={this.handleChange}></input>
          <button>Save</button>
        </div>
      )
    }
  }
}

export default ContactInfo;