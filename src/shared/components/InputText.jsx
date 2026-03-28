import "./InputText.css"
export const InputText = ({ label, id, name, value, onChange }) => (
  <div className="input-group">
    <label htmlFor={id}>
      <span>{label}</span>
    </label>
    <input type="text" id={id} name={name} value={value} onChange={onChange} />
  </div>
);

export const InputPassword = ({ label, id, name, value, onChange }) => (
  <div className="input-group">
    <label htmlFor={id}>
      <span>{label}</span>
    </label>
    <input type="password" id={id} name={name} value={value} onChange={onChange} />
  </div>
);