import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styles from '@styles/components/layout/Header.module.css'
import Dropdown from '@components/ui/Dropdown'

const SettingsVariants = {
    open: {
        opacity: 1,
        y: [-10, 0],
        transition: {
            duration: 0.2,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    },
    closed: {
        opacity: 0,
        y: [0, -10],
        transition: {
            duration: 0.2,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    }
}

const Settings: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

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
        <div className={styles.settings} ref={dropdownRef}>
            <div
                className={styles.settingsIcon}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image
                    src="/icons/settings.svg"
                    height={24}
                    width={24}
                />
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className={styles.settingsMenu}
                        variants={SettingsVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className={styles.settingItem}>
                            <h3>Odds format</h3>
                            <div className={styles.settingsItemContent}>
                                <SettingsOdds text='American +125' />
                                <SettingsOdds text='Decimal +1.25' active />
                                <SettingsOdds text='Fractional +1/2' />
                            </div>
                        </div>
                        <div className={styles.settingItem}>
                            <h3>Choose your language</h3>
                            <div className={styles.settingsItemContent}>
                                <Dropdown
                                    items={[
                                        {
                                            name: 'English',
                                            id: '1',
                                            label: <Image
                                                src={'/icons/flags/en.svg'}
                                                height={30}
                                                width={30}
                                            />
                                        },
                                        {
                                            name: 'Russian',
                                            id: '2',
                                            label: <Image
                                                src={'/icons/flags/ru.svg'}
                                                height={30}
                                                width={30}
                                            />
                                        },
                                        {
                                            name: 'Spanish',
                                            id: '3',
                                            label: <Image
                                                src={'/icons/flags/sp.svg'}
                                                height={30}
                                                width={30}
                                            />
                                        },
                                        {
                                            name: 'German',
                                            id: '4',
                                            label: <Image
                                                src={'/icons/flags/ger.svg'}
                                                height={30}
                                                width={30}
                                            />
                                        },
                                    ]}
                                    onSelect={(id) => { console.log(id) }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

interface SettingsOddsProps {
    text: string;
    active?: boolean;
}

const SettingsOdds: React.FC<SettingsOddsProps> = (props) => {
    const { text, active } = props;

    return (
        <div className={`${styles.oddsFormat} ${active && styles.active}`}>
            {text}
        </div>
    )
}

export default Settings;