import React from "react";
import { DropDownWrapper, StyledSelect, StyledOption,
} from "./Styles.jsx";

export function DropDown(props) {
  return (
    <DropDownWrapper
      action={props.action}
      onChange={props.onChange}
    >
      <StyledSelect>
        {props.children}
      </StyledSelect>
    </DropDownWrapper>
  );
}

// EDIT: would be nice to refactor this later using a list and maping it so it's more easily reusable

export function Option(props) {
  return (
    <StyledOption value={props.value} name={props.name} selected={props.selected}>
      {props.name}
    </StyledOption>
  );
}