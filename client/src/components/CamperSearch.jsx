import React, { useState} from "react";
import api from "../api/api";

const CamperSearch = (props) => {
  const onSelected = (camper) => {
    props.onSelected(camper);
  };

  let [results, setResults] = useState([]);
  let [isSearching, setIsSearching] = useState('');
  let [error, setError] = useState('');

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
        {results.map(r =>
          <div key={r.camperId} onClick={onSelected.bind(this, r)}>
            {r.firstName} {r.lastName}
          </div>
        )}
      </div>
      }
      {isSearching === 'inprogress' &&
        <div>searching ...</div>
      }
    </form>
  )
};

export default CamperSearch;