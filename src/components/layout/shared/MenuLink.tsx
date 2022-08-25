import React from 'react'
import styles from '@styles/components/layout/Header.module.css'
import Link from 'next/link';

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

export default MenuLink;