export default function FilterDropdown({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <select
      className="p-2 border rounded bg-black text-white"
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
    >
      <option value="">All {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
