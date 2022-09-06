import React, { useState } from "react"
import styles from '../../../styles/components/ui/match-summary/OddsFilter.module.css'

interface FilterProps {
    items: { name: string, id: string }[];
    onSelect: (item: { name: string, id: string }) => void;
}

const OddsFilter: React.FC<FilterProps> = (props) => {
    const {items, onSelect} = props
    const [selected, setSelected] = useState(items[0])

    function handleSelect(item: { name: string, id: string }) {
        onSelect(item);
        setSelected(item);
    }

    return (
        <div className={styles.container}>
            {items.map(item => (
                <div 
                    className={`${styles.filterItem} ${selected?.id == item.id && styles.filterActive}`}
                    key={item.id}
                    onClick={()=>setSelected(item)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    )
}

export default OddsFilter