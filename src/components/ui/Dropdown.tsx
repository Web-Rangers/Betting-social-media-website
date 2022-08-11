import React from 'react'
import styles from '../../styles/components/ui/Dropdown.module.css'

interface DropdownProps {
    items: { name: string, id: string }[];
    onSelect: (id: string) => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
    const { items, onSelect } = props;

    return (
        <div className={styles.container}>
            <div className={styles.activeItem}>
                Active
            </div>
            <div className={styles.dropdown}>
                {
                    items.map(({ name, id }) => (
                        <div className={styles.item} key={id} onClick={() => onSelect(id)}>
                            {name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dropdown;