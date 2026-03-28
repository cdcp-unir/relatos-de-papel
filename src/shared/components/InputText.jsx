import { useState } from "react";
import "./InputText.css"
import { InputCheckbox } from "./InputCheckbox";

export const InputText = ({ label, id, name, value, onChange }) => (
  <div className="input-group">
    <label htmlFor={id}>
      <span>{label}</span>
    </label>
    <input type="text" id={id} name={name} value={value} onChange={onChange} />
  </div>
);

export const InputPassword = ({ label, id, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(true);

  return (<div className="input-group">
    <label htmlFor={id}>
      <span>{label}</span>
    </label>
    <input type={showPassword ? "password" : "text"} id={id} name={name} value={value} onChange={onChange} />
    <InputCheckbox label="Mostrar contraseña" id={id + "-checkbox"} name={name + "-checkbox"} value={showPassword} onChange={_ => setShowPassword(!showPassword)} />
  </div>
  )
}

