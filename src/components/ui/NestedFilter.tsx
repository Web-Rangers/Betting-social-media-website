import React, { useState } from 'react'
import { LeaguesByCountry } from 'src/types/queryTypes'
import styles from '@styles/components/ui/NestedFilter.module.css'
import Image from 'next/image'
import { inferArrayElementType } from 'src/utils/inferArrayElementType'
import { motion } from 'framer-motion'

const NestedFilter: React.FC<{ items: LeaguesByCountry, h3?: string, h2?: string, onChange: (ids: string[]) => void }> = (props) => {
    const { items, onChange, h2, h3 } = props
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    function handleSelect(id: string) {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((_id) => _id !== id))
            onChange(selectedItems.filter((_id) => _id !== id))
        } else {
            setSelectedItems([...selectedItems, id])
            onChange([...selectedItems, id])
        }
    }

    return (
        <div className={styles.container}>
            {(h2 || h3) &&
                <div className={styles.header}>
                    {h3 && <h3>{h3}</h3>}
                    {h2 && <h2>{h2}</h2>}
                </div>
            }
            <div className={styles.items}>
                {items.map((item) => (
                    <Item
                        key={`nested_filter_item_${item.id}`}
                        {...item}
                        selectedItems={selectedItems}
                        onSelect={(id) => handleSelect(id)}
                    />
                ))}
            </div>
        </div>
    )
}

interface ItemType extends inferArrayElementType<LeaguesByCountry> {
    onSelect: (id: string) => void,
    selectedItems: string[]
}

const SubItemsVariants = {
    open: {
        height: 'auto',
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    },
    closed: {
        height: 0,
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    }
}

const Item: React.FC<ItemType> = (props) => {
    const { count, id, image, name, selectedItems, onSelect, leagues } = props
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.itemContainer}>
            <div className={`${styles.item} ${selectedItems.includes(id) && styles.active}`}>
                <div className={styles.info}>
                    <div className={styles.image}>
                        <Image
                            src={image}
                            height={34}
                            width={34}
                        />
                    </div>
                    <span
                        className={styles.name}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {name}
                    </span>
                </div>
                <div className={styles.count} onClick={() => onSelect(id)}>
                    {count}
                </div>
            </div>
            <motion.div
                className={styles.subItems}
                variants={SubItemsVariants}
                animate={isOpen ? 'open' : 'closed'}
                initial={false}
            >
                {leagues.map(({ count, id, image, name }) => (
                    <div
                        className={`${styles.subItem} ${selectedItems.includes(id) && styles.active}`}
                        key={`nested_filter_item_${id} `}
                    >
                        <div className={styles.info}>
                            <div className={styles.image}>
                                <Image
                                    src={image}
                                    height={34}
                                    width={34}
                                />
                            </div>
                            <span className={styles.name}>{name}</span>
                        </div>
                        <div className={styles.count} onClick={() => onSelect(id)}>
                            +{count}
                            <input
                                type={'checkbox'}
                                checked={selectedItems.includes(id)}
                                readOnly
                            />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export default NestedFilter
