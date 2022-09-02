import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import styles from '@styles/components/layout/Header.module.css'
import Dropdown from '@components/ui/Dropdown';
import TextField from '@components/ui/TextField';
import Fuse from 'fuse.js'
import UserProfile from '@components/layout/shared/UserProfile';
import { signIn, useSession } from 'next-auth/react';
import Settings from '@components/layout/shared/Settings';
import MenuLink from '@components/layout/shared/MenuLink';
import { trpc } from 'src/utils/trpc';
import Moment from 'react-moment';
import 'moment-timezone';

const Timezones = [
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} tz={'America/New_York'} format={'DD.MM Z'} />, id: '1', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} format={'HH:mm'} /> },
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" })} tz={'Europe/Moscow'} format={'DD.MM Z'} />, id: '2', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" })} format={'HH:mm'} /> },
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" })} tz={'Asia/Tokyo'} format={'DD.MM Z'} />, id: '3', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" })} format={'HH:mm'} /> },
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Atlantic/South_Georgia" })} tz={'Atlantic/South_Georgia'} format={'DD.MM Z'} />, id: '4', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Atlantic/South_Georgia" })} format={'HH:mm'} /> },
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })} tz={'Europe/Amsterdam'} format={'DD.MM Z'} />, id: '5', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })} format={'HH:mm'} /> },
]

const Header: React.FC = () => {
    const router = useRouter()
    const { data: links, isLoading: linksLoading } = trpc.useQuery(['navigation.getSports'])

    return (
        <div className={styles.container}>
            <Link href={'/'}>
                <a className={styles.logo}>
                    <Image
                        src="/logo.svg"
                        height={32}
                        width={188}
                    />
                </a>
            </Link>
            <nav>
                {links && <div className={styles.links}>
                    {
                        links.slice(0, 6).map((link) => (
                            <MenuLink
                                key={link.label}
                                {...link}
                                active={router.pathname.includes(link.href)}
                            />
                        ))
                    }
                    <More items={links.slice(6)} />
                </div>}
                <div className={styles.controls}>
                    <Dropdown
                        items={Timezones}
                        onSelect={(id) => { }}
                        minWidth={200}
                    />
                    <Settings />
                    <UserProfile />
                </div>
            </nav>
        </div>
    );
}



interface MoreProps {
    items: { href: string, label: string }[];
}

const MoreItemsVariants = {
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

const More: React.FC<MoreProps> = (props) => {
    const { items } = props;
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [filteredItems, setFilteredItems] = useState<MoreProps['items']>(items)

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > 0) {
            const options = {
                includeScore: false,
                includeRefIndex: false,
                threshold: 0.3,
                keys: ['label']
            }
            const fuse = new Fuse(items, options)
            const result = fuse.search(e.target.value).map(item => item.item)
            setFilteredItems(result)
        } else {
            setFilteredItems(items)
        }
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
        <div className={styles.more} ref={dropdownRef}>
            <div
                className={styles.moreIcon}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image
                    src="/icons/more.svg"
                    height={24}
                    width={24}
                />
            </div>
            <AnimatePresence initial={false}>
                {
                    isOpen && (
                        <motion.div
                            className={styles.moreItems}
                            variants={MoreItemsVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <TextField
                                placeholder='Search'
                                onChange={handleSearch}
                            />
                            {
                                filteredItems.map((item) => (
                                    <Link href={item.href} key={item.label}>
                                        <a className={styles.moreItem}>
                                            {item.label}
                                        </a>
                                    </Link>
                                ))
                            }
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default Header;