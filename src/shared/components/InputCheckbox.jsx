import "./InputCheckbox.css"

export const InputCheckbox = ({ label, id, name, value, onChange }) => (
  <div className="checkbox-group">
    <input className="checkbox" type="checkbox" id={id} name={name} value={value} onChange={onChange} />
    <label htmlFor={id}>{label}</label>
  </div>
);
