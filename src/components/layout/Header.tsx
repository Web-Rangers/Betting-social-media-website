import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import styles from '../../styles/components/layout/Header.module.css'
import Dropdown from '../ui/Dropdown';

const links = [
    { href: '/sport', label: 'Football' },
    { href: '/sport', label: 'Basketball' },
    { href: '/sport', label: 'Hockey' },
    { href: '/sport', label: 'Handball' },
    { href: '/sport', label: 'Tennis' },
    { href: '/sport', label: 'Rugby' },
]

const Header: React.FC = () => {
    const router = useRouter()

    return (
        <>
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
                        {/* <Dropdown /> */}
                    </div>
                </nav>
            </div>
            <div className={styles.spacer} />
        </>
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

export default Header;