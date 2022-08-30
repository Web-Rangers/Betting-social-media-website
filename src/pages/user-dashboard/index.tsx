import { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import styles from '@styles/pages/UserDashboard.module.css'
import { trpc } from 'src/utils/trpc'
import { UserInfo } from 'src/types/queryTypes'
import Image from 'next/image'

enum Tabs {
    Dashboard = 'Dashboard',
    Withdraw = 'Withdraw',
    Subscription = 'Subscription',
    TrackingTips = 'Tracking Tips',
    PendingTips = 'Pending Tips',
    HistoricalTips = 'Historical Tips',
    Settings = 'Profile Settings'
}

const NavigationItems = [
    {
        page: Tabs.Dashboard,
        icon: '/icons/dashboard/dashboard.svg',
        activeIcon: '/icons/dashboard/dashboard-white.svg',
    },
    {
        page: Tabs.Withdraw,
        icon: '/icons/dashboard/withdraw.svg',
        activeIcon: '/icons/dashboard/withdraw-white.svg',
    },
    {
        page: Tabs.Subscription,
        icon: '/icons/dashboard/subscription.svg',
        activeIcon: '/icons/dashboard/subscription-white.svg',
    },
    {
        page: Tabs.TrackingTips,
        icon: '/icons/dashboard/tracking-tips.svg',
        activeIcon: '/icons/dashboard/tracking-tips-white.svg',
    },
    {
        page: Tabs.PendingTips,
        icon: '/icons/dashboard/pending-tips.svg',
        activeIcon: '/icons/dashboard/pending-tips-white.svg',
    },
    {
        page: Tabs.HistoricalTips,
        icon: '/icons/dashboard/historical-tips.svg',
        activeIcon: '/icons/dashboard/historical-tips-white.svg',
    },
    {
        page: Tabs.Settings,
        icon: '/icons/dashboard/settings.svg',
        activeIcon: '/icons/dashboard/settings-white.svg',
    }
]

const UserDashboard: NextPage = () => {
    const { data: userInfo, isLoading: userInfoLoading } = trpc.useQuery(['user.getInfo'])
    const [currentPage, setCurrentPage] = useState(Tabs.Dashboard)
    const memoizedPage = useMemo(() => getPage(currentPage), [currentPage])

    function getPage(page: Tabs) {
        switch (page) {
            case Tabs.Dashboard:
                return <>Dashboard</>
            case Tabs.Withdraw:
                return <>Withdraw</>
            case Tabs.Subscription:
                return <>Subscription</>
            case Tabs.TrackingTips:
                return <>Tracking Tips</>
            case Tabs.PendingTips:
                return <>Pending Tips</>
            case Tabs.HistoricalTips:
                return <>Historical Tips</>
            case Tabs.Settings:
                return <>Profile Settings</>
            default:
                return <></>
        }
    }

    if (userInfoLoading) {
        return <div>Loading...</div>
    }

    if (!userInfo) {
        return <div>Error...</div>
    }

    return (
        <>
            <div className={styles.sideColumn}>
                <div className={styles.navigationContainer}>
                    <Navigation
                        userInfo={userInfo}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
            <div className={styles.mainColumn}>
                {memoizedPage}
            </div>
        </>
    )
}

const Navigation: React.FC<{ userInfo: UserInfo, currentPage: Tabs, onPageChange: (page: Tabs) => void }> = (props) => {
    const { userInfo, currentPage, onPageChange } = props

    return (
        <div className={styles.navigation}>
            <div className={styles.userInfo}>
                <div className={styles.user}>
                    <div className={`${styles.avatar} ${userInfo.verified && styles.verified}`}>
                        <Image
                            src={userInfo.image}
                            height={80}
                            width={80}
                        />
                    </div>
                    <div className={styles.details}>
                        <span className={styles.name}>
                            {userInfo.name}
                        </span>
                        <span className={styles.rank}>
                            <Image
                                src='/icons/star.svg'
                                height={16}
                                width={16}
                            />
                            <span>Rank <b>{userInfo.rank}</b></span>
                        </span>
                    </div>
                </div>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <h5>Followers</h5>
                        <span>{userInfo.follower_count}</span>
                    </div>
                    <div className={styles.stat}>
                        <h5>Following</h5>
                        <span>{userInfo.following_count}</span>
                    </div>
                </div>
            </div>
            <nav>
                {NavigationItems.map(({ icon, activeIcon, page }) => (
                    <MenuItem
                        key={page}
                        page={page}
                        icon={icon}
                        activeIcon={activeIcon}
                        active={currentPage === page}
                        onNavigate={() => onPageChange(page)}
                        counter={page === Tabs.TrackingTips
                            ? userInfo.tips.tracking_count
                            : page === Tabs.PendingTips
                                ? userInfo.tips.pending_count
                                : undefined
                        }
                    />
                ))}
            </nav>
        </div>
    )
}

const MenuItem: React.FC<{ page: Tabs, onNavigate: () => void, active: boolean, icon: string, activeIcon: string, counter?: number }> = (props) => {
    const { active, onNavigate, page, icon, activeIcon, counter } = props

    return (
        <span
            className={`${styles.menuItem} ${active && styles.active}`}
            onClick={onNavigate}
        >
            <div>
                <Image
                    src={active ? activeIcon : icon}
                    height={24}
                    width={24}
                />
                <span className={styles.name}>{page}</span>
            </div>
            {counter && <span className={styles.counter}>{counter}</span>}
        </span>
    )
}

export default UserDashboard;
