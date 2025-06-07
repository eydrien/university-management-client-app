// src/components/SearchBar.tsx
import { Search } from "lucide-react" 

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

/**
 * Barra de búsqueda reutilizable 
 */
const SearchBar = ({ value, onChange, placeholder = "Buscar..." }: SearchBarProps) => {
  return (
    <div className="relative w-full mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  )
}

export default SearchBar
