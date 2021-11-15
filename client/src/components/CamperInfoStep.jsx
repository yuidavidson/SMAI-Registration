import React from 'react';
import axios from 'axios';

import UnsavedWarning from './UnsavedWarning.jsx';
import Overlay from './Overlay.jsx';
import {DropDown, Option} from "./DropDownMenu.jsx";
import { BodyWrapper, StyledButton, ButtonWrapper, FooterWrapper,  StyledStringError, StyledObjectError, InputErrorWrapper } from './Styles.jsx';

import dictionaryConfig  from '../models/dictionary-config.js';
import fieldsConfig  from '../models/config.js';


export default class CamperInfoStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      camperId: props.camperId,
      localData: {},
      hasChanged: false,
      isEditMode: false,
      currentModal: null,
      saveError: null,
    };

    this.data = props.data;
    this.oldData = {};
    Object.assign(this.oldData, props.data);

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

    // is binding these methods necessary?
    this.isString = this.isString.bind(this);
    this.isObject = this.isObject.bind(this);
  }

  editToggle(newState) {
    if (!newState && this.state.hasChanged) {
      this.showModal('unsavedWarning');
      return;
    }
    this.setState({isEditMode: newState, hasChanged: false});
  }

  editForceCancel() {
    this.data = Object.assign({}, this.oldData); // revert to old data
    this.setState({isEditMode: false, hasChanged: false});
    this.hideModal();
  }

  onEdit(e) {
    if (this.data[e.target.name] === e.target.value) {
      return;
    }
    this.data[e.target.name] = e.target.value;
    this.setState({hasChanged: true});
  }

  save() {
    let dataEncoded = Object.entries(this.data).map(e => encodeURIComponent(e[0])+'='+encodeURIComponent(e[1])).join('&');
    dataEncoded += `&id=${this.state.camperId}`;

    if (!this.state.hasChanged) {
      console.log('no changes detected to be saved!');
    } else {
      axios({
        method: 'POST',
        url: 'https://smai.us/index.php?option=com_smapi&api=camper/update',
        data: dataEncoded,
      })
      .then((response)  => {
        console.log(response);
        if (response.data.status === 'success') {
          this.onSavedData(this.step, this.data);
          this.setState({hasChanged: false, isEditMode: false, saveError: ''});
        } else {
          /* TODO
          * response.data.errors can be:
          *  a string (i.e. a general error)
          *  or an hash of errors by field name ({phone1: "too short", name: "empty"})
          * */
          this.setState({saveError: response.data.errors});
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

  isString(s) {

    return typeof s === 'string' && s.length > 0;
  }

  isObject(o, f) {
    return o && typeof o === 'object' && this.state.saveError.hasOwnProperty(f);
  }

  render() {
    return (
      <BodyWrapper>
        <div>{this.step.label}</div>
        {
            this.step.fields.map(fieldName =>
              <div key={fieldName}>
                  <strong>{fieldName.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/(^| )[a-z]/, s => s.toUpperCase())}</strong>:&nbsp;
                {this.state.isEditMode ?
                    (
                        fieldsConfig.camper[fieldName].type === 'text' ?
                        <InputErrorWrapper>
                          <input type='text'
                                name={fieldName}
                                value={this.data[fieldName]}
                                onChange={this.onEdit}
                          />
                          {this.isObject(this.state.saveError, fieldName) ? <StyledObjectError>{this.state.saveError[fieldName]}</StyledObjectError> : null}
                        </InputErrorWrapper> :
                        <DropDown onChange={this.onEdit} name={fieldName}>
                          <Option value='0' name={'Choose a '+fieldName} />
                          {Object.entries(dictionaryConfig[fieldName]).map(([value, name]) =>
                              <Option key={value} value={value} name={name} />
                          )}
                        </DropDown>
                    )
                     :
                    <span>{fieldsConfig.camper[fieldName].type === 'dict' ? dictionaryConfig[fieldName][this.data[fieldName]] : this.data[fieldName]}</span>
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
        <FooterWrapper>
          {this.isString(this.state.saveError) ? <StyledStringError>{this.state.saveError}</StyledStringError> : null}
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
        </FooterWrapper>
      </BodyWrapper>
    );
  }
}