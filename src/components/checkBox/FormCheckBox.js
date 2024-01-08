import React from "react";
import { Style } from "./style.js";

const FormCheckBox = (props) => {
  const {
    starProps,
    Label,
    labelStyle,
    checkBoxStyle,
    mainContainerStyle,
    checked,
    handleChangeCheck = () => {},
    disable,
    ...def
  } = props;

  const onChangeCheck = () => {
    handleChangeCheck(!checked);
  };

  return (
    <div
      style={Object.assign(
        {},
        Style.checkBoxMainContainerStyle
      )}
    >
      <input
        {...def}
        style={Object.assign({}, Style.checkBoxStyle)}
        type="checkbox"
        checked={checked === true ? true : false}
        disabled={disable ? true : false}
        onChange={onChangeCheck}
      />
      <label
        onClick={!disable && onChangeCheck}
        style={Object.assign({}, Style.labelStyle)}
      >
        {" "}
        {Label}{" "}
      </label>
    </div>
  );
};

export default FormCheckBox;
