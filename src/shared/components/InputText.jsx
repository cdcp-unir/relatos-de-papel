import { useState } from "react";
import { InputCheckbox } from "./InputCheckbox";

export const InputText = ({ label, id, name, value, onChange }) => (
  <div className="flex flex-col items-center justify-center w-full">
    <label className="block w-full mb-2" htmlFor={id}>
      <span>{label}</span>
    </label>
    <input
      className="w-full input outline-none"
      type="text"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const InputPassword = ({ label, id, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label className="block w-full mb-2" htmlFor={id}>
        <span>{label}</span>
      </label>
      <input
        className="w-full input outline-none mb-2"
        type={showPassword ? "password" : "text"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <InputCheckbox
        label="Mostrar contraseña"
        id={id + "-checkbox"}
        name={name + "-checkbox"}
        value={showPassword}
        className="w-full"
        onChange={_ => setShowPassword(!showPassword)}
      />
    </div>
  )
}

