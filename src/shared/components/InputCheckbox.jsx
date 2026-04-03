export const InputCheckbox = ({
  label,
  id,
  name,
  checked,
  value,
  onChange,
  disabled = false,
  helperText = "",
  className = "",
  size = "md",       // xs | sm | md | lg
  color = "primary", // primary | secondary | success | error...
  rounded = "md",    // none | sm | md | lg | full
}) => {
  const resolvedChecked = checked ?? value ?? false;

  const sizeClass = `checkbox-${size}`;
  const colorClass = `checkbox-${color}`;

  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div className={`form-control ${className}`}>
      <label className="label cursor-pointer justify-start gap-3" htmlFor={id}>
        <input
          className={`checkbox ${colorClass} ${sizeClass} ${roundedMap[rounded]}`}
          type="checkbox"
          id={id}
          name={name}
          checked={resolvedChecked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="label-text">{label}</span>
      </label>

      {helperText && (
        <label className="label">
          <span className="label-text-alt text-base-content/70">
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
};