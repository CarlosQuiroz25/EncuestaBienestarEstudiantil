
export const Input = ({label, type, value, onChange, placeholder}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg font-semibold text-jet" >{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="border border-gray-400 p-2 rounded-lg bg-gray-100"
      />
    </div>
  )
}