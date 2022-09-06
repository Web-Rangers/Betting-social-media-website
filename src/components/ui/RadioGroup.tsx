import React, { useState } from 'react'
import styles from '@styles/components/ui/RadioGroup.module.css'

interface RadioGroupProps {
    items: {
        id: string,
        name: string
    }[],
    onChange: (id: string) => void,
    groupName: string,
    defaultSelected?: string,
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
    const { items, onChange, groupName, defaultSelected } = props
    const [selected, setSelected] = useState(defaultSelected)

    function handleChange(id: string) {
        setSelected(id)
        onChange(id)
    }

    return (
        <div className={styles.container}>
            {items.map(({ id, name }) => (
                <div
                    className={styles.radio}
                    onClick={() => handleChange(id)}
                >
                    <input
                        type={'radio'}
                        name={groupName}
                        readOnly
                        checked={selected === id}
                    />
                    <span>{name}</span>
                </div>
            ))}
        </div>
    )
}

export default RadioGroup