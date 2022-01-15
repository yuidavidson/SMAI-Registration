import React, { useState} from "react";
import api from "../api/api";

const CamperSearch = (props) => {

  let [results, setResults] = useState([]);
  let [isSearching, setIsSearching] = useState('');
  let [error, setError] = useState('');
  let [sentInvite, setSentInvite] = useState(false);

  // TODO: currently this sets the clicked camper to the party, but what we want is the send a request to the api to send an email and an invitation to that camper
  const onSelected = (camper) => {
    // props.onSelected(camper);
    // TODO: uncomment and change the path to correct invitation when it is created on the backend and delete setSentInvite, located after the api call
    // api.run('camper/invite', {id: camper.camoerId})
    // .then((response) => {
    //   console.log(response);
    //   setSentInvite(true);
    // })
    // .catch((error) => {
    //   console.log(error);
    // })

    setSentInvite(true);

  };

  const search = (ev) => {
    ev.preventDefault();
    setIsSearching('inprogress');

    api.run('camper/find', {firstName: ev.target.searchText.value})
      .then((response) => {
        if (response.errors) {
          setError(response.errors);
          setResults([]);
        } else {
          setResults(response.data);
          setError('');
        }
        setIsSearching('done');
      })
      .catch((error) => {
        setError(error.message);
        setResults([]);
        setIsSearching('done');
        console.log(error);
      })
  };

  return (
    <form onSubmit={search}>
      <h3>Find Campers...</h3>
      <div>test first names:
        Bridgette, Eleanor, Carlena, Mckinley, Opal, Ellan, Garfield, Robby, Randa, Neva, Athena, Etsuko, Matthew, Sophie, Carlee, Kandice, Lewis, Lezlie, Keeley, Roselee
      </div>
      <div>test last names: Bucher, Gray, Morriss, Shedd, Feth, Kemp, Lieb, Burdette, Tyrell, Maranto, Jarboe, Miers,
        Rippe, Coach, Dozier, Ballenger, Simpkins, Henriquez, Chesson, Meiser
      </div>
      <input name='searchText' placeholder='type in a first or last name' />
      <input type='submit' value='Search' />
      {error && <div>{error}</div>}
      {isSearching === 'done' &&
      <div>Results:
        {results.map(camper =>
          <div key={camper.id} onClick={onSelected.bind(this, camper)}>
            {camper.firstName} {camper.lastName}
          </div>
        )}
      </div>
      }
      {isSearching === 'inprogress' &&
        <div>searching ...</div>
      }
      {sentInvite ? <div>An email and invitation has been sent. You can register this camper after they have accepted your invitation.</div> : null}
    </form>
  )
};

export default CamperSearch;