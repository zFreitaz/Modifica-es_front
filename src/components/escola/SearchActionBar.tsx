import { Search, Plus } from "lucide-react";
import Button from "./button";

type SearchActionBarProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    searchPlaceholder?: string
    buttonLabel: string
    onButtonClick: () => void
}

export default function SearchActionBar({
    searchValue,
    onSearchChange,
    searchPlaceholder = "Buscar",
    buttonLabel,
    onButtonClick,
}: SearchActionBarProps){
    return(
        <div className="searchActionBar">
            <div className="searchBox">
                <Search size={18} className="searchIcon" />
                <input
                 type="text"
                 value={searchValue}
                 onChange={(e) => onSearchChange(e.target.value)}
                 placeholder={searchPlaceholder}
                 className="searchInput"
                />
            </div>

            <Button
                type="button"
                onClick={onButtonClick}
                className="actionButton"
             >
                <Plus size={18} className="plusIcon"/>
                <span>{buttonLabel}</span>
             </Button>
        </div>
    )
}