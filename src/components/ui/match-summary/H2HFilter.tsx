import React, { useState } from "react"
import styles from '../../../styles/components/ui/match-summary/H2HFilter.module.css'

interface FilterProps {
    items: { name: string, id: string }[];
    onSelect: (item: { name: string, id: string }) => void;
}

const H2HFilter: React.FC<FilterProps> = (props) => {
    const {items, onSelect} = props
    const [selected, setSelected] = useState(items[0])

    function handleSelect(item: { name: string, id: string }) {
        onSelect(item);
        setSelected(item);
    }

    return (
        <>
            {items.map(item => (
                <div 
                    className={`${styles.filterItem} ${selected?.id == item.id && styles.filterActive}`}
                    key={item.id}
                    onClick={()=>handleSelect(item)}
                >
                    {item.name}
                </div>
            ))}
        </>
    )
}

export default H2HFilter