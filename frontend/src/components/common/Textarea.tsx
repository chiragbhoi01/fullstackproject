export default function Textarea({
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  ...props
}: any) {
  return (
    <div className="w-full">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-['Space_Grotesk',sans-serif] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
    </div>
  );
}
