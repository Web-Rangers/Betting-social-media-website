import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from '@styles/components/layout/Header.module.css'
import Dropdown from '@components/ui/Dropdown';
import { useSession } from 'next-auth/react';
import UserProfile from '@components/ui/UserProfile';

const links = [
    { href: '/tisters', label: 'Tipsters' },
    { href: '/competition', label: 'Competition' },
]

const TipsterHeader: React.FC = () => {
    const router = useRouter()
    const { data: session } = useSession()

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image
                    src="/logo.svg"
                    height={32}
                    width={188}
                />
            </div>
            <nav>
                <div className={styles.links}>
                    {
                        links.map(({ href, label }) => (
                            <MenuLink
                                key={label}
                                href={href}
                                label={label}
                                active={router.pathname.includes(href)}
                            />
                        ))
                    }
                </div>
                <div className={styles.controls}>
                    <Dropdown
                        items={[
                            { name: 'GMT+1', id: '1', label: '13:00' },
                            { name: 'GMT+2', id: '2', label: '14:00' },
                            { name: 'GMT+3', id: '3', label: '15:00' },
                            { name: 'GMT+4', id: '4', label: '16:00' },
                            { name: 'GMT+5', id: '5', label: '17:00' },
                        ]}
                        onSelect={(id) => { }}
                    />
                    <Settings />
                    {
                        !session
                            ? <button className={styles.button}>
                                Sign In
                            </button>
                            : <UserProfile />
                    }
                </div>
            </nav>
        </div>
    );
}

interface LinkProps {
    href: string;
    label: string;
    active?: boolean;
    newPosts?: boolean
}

const MenuLink: React.FC<LinkProps> = (props) => {
    const { href, label, active, newPosts } = props;

    return (
        <Link href={href} key={label}>
            <a className={`${styles.link} ${active && styles.active}`}>
                {label}
            </a>
        </Link>
    )
}

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
    const dropdownRef = React.useRef<HTMLDivElement>(null)

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

export default TipsterHeader;