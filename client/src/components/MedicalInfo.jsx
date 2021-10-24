import React from 'react';
import axios from 'axios';

const EmergencyInfo = () => {
return (
  <div>
    <div>Emergency Information</div>
  {/* not sure if last updated is necessary or there are records of it but either fix this later to read from db or delete later */}
    <div>Last updated 3.16.18</div>
    <button>Update Information</button>
  </div>
  )
};

export default EmergencyInfo;