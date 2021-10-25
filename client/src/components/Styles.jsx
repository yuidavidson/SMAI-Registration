import styled from 'styled-components';

/*
========== DropDown Styles ==========
*/

export const DropDownWrapper = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

export const StyledSelect = styled.select`
  max-width: 50%;
  height: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")};
`;


// At the moment this is not being used but keeping it for now, because it might come in handy later
export const StyledLabel = styled.label`
  margin-bottom: 1rem;
`;

// Similarly not being used, but even more likely that this will be handy later
export const StyledButton = styled.input`
  max-width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  border: solid 2px blue;
  padding: 0.5rem;
  border-radius: 1rem;
`;