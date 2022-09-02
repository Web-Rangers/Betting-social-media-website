import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from '../../styles/components/ui/Dropdown.module.css'
import Image from 'next/image';

interface DropdownProps {
    items: { name: string | ReactNode, id: string, label?: string | ReactNode }[];
    label?: string,
    onSelect: (id: string) => void;
}

const DropdownVariants = {
    open: {
        height: 'auto',
    },
    closed: {
        height: 0,
    },
}

const ChevronVariants = {
    open: {
        rotate: 180,
    },
    closed: {
        rotate: 0,
    }
}

const Dropdown: React.FC<DropdownProps> = (props) => {
    const { items, onSelect, label } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(items[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    function handleSelect(id: string) {
        onSelect(id);
        setSelected(items.find(item => item.id === id));
        setIsOpen(false);
    }

    const closeIfNotDropdown = (e: MouseEvent) => {
        if ((e.target != dropdownRef.current) && (!dropdownRef.current?.contains(e.target as Node))) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (window)
            window.addEventListener('click', closeIfNotDropdown)
        return () => {
            window.removeEventListener('click', closeIfNotDropdown)
        }
    }, [])

    return (
        <div className={styles.container} ref={dropdownRef}>
            <div
                className={styles.activeItem}
                onClick={() => setIsOpen(!isOpen)}
            >
                {label && <span className={styles.mainLabel}>{label}</span>}
                <div className={styles.activeName}>
                    {
                        selected?.label && (
                            <span className={styles.label}>
                                {selected?.label}
                            </span>
                        )
                    }
                    <span>
                        {selected?.name}
                    </span>
                </div>
                <motion.span
                    className={styles.chevron}
                    variants={ChevronVariants}
                    initial={false}
                    animate={isOpen ? 'open' : 'closed'}
                >
                    <Image
                        src="/icons/chevron.svg"
                        height={16}
                        width={16}
                    />
                </motion.span>
            </div>
            <motion.div
                className={styles.dropdown}
                variants={DropdownVariants}
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
            >
                {
                    items.map(({ name, id, label }) => (
                        <Item
                            key={id}
                            name={name}
                            id={id}
                            label={label}
                            onClick={() => handleSelect(id)}
                        />
                    ))
                }
            </motion.div>
        </div>
    )
}

interface ItemProps {
    name: string | ReactNode;
    id: string;
    label?: string | ReactNode;
    onClick: () => void;
}

const Item: React.FC<ItemProps> = (props) => {
    const { name, id, label, onClick } = props;

    return (
        <div
            className={styles.item}
            key={id}
            onClick={onClick}
        >
            {
                label && (
                    <span className={styles.label}>
                        {label}
                    </span>
                )
            }
            <span>
                {name}
            </span>
        </div>
    )
}

export default Dropdown;