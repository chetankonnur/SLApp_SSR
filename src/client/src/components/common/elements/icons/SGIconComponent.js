import React from "react";

let style = { fontSize: "24px" };

const SGIconComponent = props => (
  <i
    disabled={props.disabled ? props.disabled : false}
    className={props.iconClassName}
    style={props.style === undefined ? style : props.style}
    onClick={event => {
      if (props.onClick !== undefined) {
        props.onClick(event);
      }
    }}
  />
);

export default SGIconComponent;
