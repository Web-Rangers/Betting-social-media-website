import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from '@styles/components/layout/Header.module.css'
import Dropdown from '@components/ui/Dropdown';
import { useSession } from 'next-auth/react';
import UserProfile from '@components/layout/shared/UserProfile';
import Settings from '@components/layout/shared/Settings';
import MenuLink from '@components/layout/shared/MenuLink';
import 'moment-timezone';
import Moment from 'react-moment';

const links = [
    { href: '/tipster-rating', label: 'Tipsters' },
    { href: '/tipster-competition', label: 'Competition' },
]

const Timezones = [
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} tz={'America/New_York'} format={'DD.MM Z'} />, id: '1', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} format={'HH:mm'} /> },
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" })} tz={'Europe/Moscow'} format={'DD.MM Z'} />, id: '2', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" })} format={'HH:mm'} /> },
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" })} tz={'Asia/Tokyo'} format={'DD.MM Z'} />, id: '3', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" })} format={'HH:mm'} /> },
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Atlantic/South_Georgia" })} tz={'Atlantic/South_Georgia'} format={'DD.MM Z'} />, id: '4', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Atlantic/South_Georgia" })} format={'HH:mm'} /> },
    { name: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })} tz={'Europe/Amsterdam'} format={'DD.MM Z'} />, id: '5', label: <Moment date={new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })} format={'HH:mm'} /> },
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

export default TipsterHeader;