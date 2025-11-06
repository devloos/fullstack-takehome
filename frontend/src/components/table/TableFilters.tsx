type TableFiltersProps = {
    searchValue: string
    setSearchValue: (value: string) => void
}

export const TableFilters = ({ searchValue, setSearchValue }: TableFiltersProps) => {
    return (
        <div>
            <input className="border border-gray-300 rounded-xs px-2 py-1" type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
    )
}