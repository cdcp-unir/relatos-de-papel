export const InputCheckbox = ({ label, id, name, value, onChange, className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <input className="w-6" type="checkbox" id={id} name={name} checked={value} onChange={onChange} />
    <label className="w-auto shrink-0 grow-0" htmlFor={id}>{label}</label>
  </div>
);
