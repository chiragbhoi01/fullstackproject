interface IInput {
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "tel" | "number" | "url" | "checkbox";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  [key: string]: any;
}

export default function Input({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
  disabled = false,
  required = false,
  ...props
}: IInput) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-['Space_Grotesk',sans-serif] ${
        error ? "border-red-500" : "border-gray-300"
      } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  );
}
