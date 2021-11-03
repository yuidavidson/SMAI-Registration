import React from 'react';
import axios from 'axios';

import UnsavedWarning from './UnsavedWarning.jsx';
import Overlay from './Overlay.jsx';
import { BodyWrapper, StyledButton, ButtonWrapper } from './Styles.jsx';

export default class CamperInfoStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      camperId: props.camperId,
      data: props.data,
      hasChanged: false,
      isEditMode: false,
      currentModal: null
    };

    this.step = props.step;
    this.gotoStep = props.gotoStep;
    this.onSavedData = props.onSavedData;
    this.leaveStep = props.leaveStep;

    this.editToggle = this.editToggle.bind(this);
    this.editForceCancel = this.editForceCancel.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.save = this.save.bind(this);

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  editToggle(newState) {
    if (!newState && this.state.hasChanged) {
      this.showModal('unsavedWarning');
      return;
    }
    this.setState({isEditMode: newState, hasChanged: false});
  }

  editForceCancel() {
    this.setState({isEditMode: false, hasChanged: false});
    this.hideModal();
  }

  onEdit(e) {
    let editedData = this.state.data;
    if (editedData[e.target.name] === e.target.value) {
      return;
    }
    editedData[e.target.name] = e.target.value;
    this.setState({data: editedData, hasChanged: true});
  }

  save() {
    let dataEncoded = Object.entries(this.state.data).map(e => encodeURIComponent(e[0])+'='+encodeURIComponent(e[1])).join('&');
    dataEncoded += `&id=${this.state.camperId}`;

    if (!this.state.hasChanged) {
      console.log('no changes detected to be saved!');
    } else {
      axios({
        method: 'POST',
        url: 'https://smai.us/api/camper/update',
        data: dataEncoded,
      })
      .then((response)  => {
        console.log(response);
        if (response.data.status === 'success') {
          this.onSavedData(this.step, this.state.data);
          this.setState({hasChanged: false, isEditMode: false, saveError: ''});
        } else {
          this.setState({saveError: response.error});
        }
      })
      .catch((error) => {
        this.setState({saveError: error.message});
      })
    }
  }

  showModal(id=null) {
    this.setState({currentModal: id});
  }
  hideModal() {
    this.setState({currentModal: null});
  }

  render() {
    return (
      <BodyWrapper>
        <div>{this.step.label}</div>
        <div>Last updated: A long time ago</div>
        {
            this.step.fields.map(fieldName =>
              <div key={fieldName}>
                  <div>{fieldName}</div>
                {this.state.isEditMode ?
                    <input type='text'
                           name={fieldName}
                           value={this.state.data[fieldName]}
                           onChange={this.onEdit}
                    /> :
                    <div>{this.state.data[fieldName]}</div>
                }
              </div>
            )
        }

        <Overlay
            myId='unsavedWarning'
            currentId={this.state.currentModal}
            close={this.hideModal}
        >
          <UnsavedWarning noFn={this.hideModal} yesFn={this.editForceCancel}/>
        </Overlay>

        <ButtonWrapper>
          {this.state.isEditMode ?
              <StyledButton onClick={this.save} disabled={!this.state.hasChanged}>Save</StyledButton> :
              <StyledButton onClick={this.editToggle.bind(this, true)}>Update</StyledButton>
          }
          {this.state.isEditMode ?
              <StyledButton onClick={this.editToggle.bind(this, false)}>Cancel</StyledButton> :
              <StyledButton onClick={this.leaveStep}>Return to Table of Contents</StyledButton>
          }
        </ButtonWrapper>
      </BodyWrapper>
    );
  }
}