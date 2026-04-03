import { useState } from "react";
import { InputCheckbox } from "./InputCheckbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const getInputStateClass = ({ error, success }) => {
  if (error) return "input-error";
  if (success) return "input-success";
  return "";
};

const getMessage = ({ error, errorMessage, success, successMessage, helperText }) => {
  if (error && errorMessage) return { text: errorMessage, className: "text-error" };
  if (success && successMessage) return { text: successMessage, className: "text-success" };
  if (helperText) return { text: helperText, className: "text-base-content/70" };
  return null;
};

export const InputText = ({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder = "",
  disabled = false,
  required = false,
  error = false,
  success = false,
  errorMessage = "",
  successMessage = "",
  helperText = "",
  rightIcon = null,
  className = "",
  inputClassName = "",
}) => {
  const message = getMessage({
    error,
    errorMessage,
    success,
    successMessage,
    helperText,
  });

  return (
    <div className={`form-control w-full ${className}`}>
      {label && (
        <label className="label" htmlFor={id}>
          <span className="label-text">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}

      <div className="relative">
        <input
          className={`input input-bordered w-full pr-10 ${getInputStateClass({
            error,
            success,
          })} ${inputClassName}`}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={error}
          aria-describedby={message ? `${id}-message` : undefined}
        />

        {rightIcon && (
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {message && (
        <label className="label" id={`${id}-message`}>
          <span className={`label-text-alt ${message.className}`}>
            {message.text}
          </span>
        </label>
      )}
    </div>
  );
};

export const InputPassword = ({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  disabled = false,
  required = false,
  error = false,
  success = false,
  errorMessage = "",
  successMessage = "",
  helperText = "",
  className = "",
  inputClassName = "",
  checkboxLabel = "Mostrar contraseña",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const icon = showPassword ? (
    <EyeIcon className="size-5 text-base-content/70" />
  ) : (
    <EyeSlashIcon className="size-5 text-base-content/70" />
  );

  return (
    <div className={className}>
      <InputText
        label={label}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        error={error}
        success={success}
        errorMessage={errorMessage}
        successMessage={successMessage}
        helperText={helperText}
        rightIcon={icon}
        inputClassName={inputClassName}
      />

      <div className="mt-2">
        <InputCheckbox
          label={checkboxLabel}
          id={`${id}-checkbox`}
          name={`${name}-checkbox`}
          checked={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
        />
      </div>
    </div>
  );
};