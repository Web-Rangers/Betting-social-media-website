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

const links = [
    { href: '/tipster-rating', label: 'Tipsters' },
    { href: '/tipster-competition', label: 'Competition' },
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

export default TipsterHeader;