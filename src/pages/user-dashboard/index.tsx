import { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import styles from '@styles/pages/UserDashboard.module.css'
import { trpc } from 'src/utils/trpc'
import { UserInfo } from 'src/types/queryTypes'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

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
    const memoizedPage = useMemo(() => {
        switch (currentPage) {
            case Tabs.Dashboard:
                return <DashboardTab />
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
    }, [currentPage])

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

const DashboardTab: React.FC = () => {
    const { data, isLoading } = trpc.useQuery(['user.getDashboardInfo'])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>Error...</div>
    }

    return (
        <div className={styles.dashboardTab}>
            <div className={styles.row}>
                <div
                    id={styles.profit}
                    className={`${styles.block} ${styles.narrow} ${data.avgProfit > 0 ? styles.positive : styles.negative}`}
                >
                    <div className={styles.image}>
                        <Image
                            src='/images/dashboard/wallet.svg'
                            height={60}
                            width={60}
                        />
                    </div>
                    <div className={styles.text}>
                        <h5>Avg. Monthly Profit</h5>
                        <span>$ {data.avgProfit}</span>
                    </div>
                </div>
                <div
                    id={styles.stats}
                    className={`${styles.block} ${styles.wide}`}
                >
                    <div className={styles.stat}>
                        <h3>ROI</h3>
                        <span>{data.roi * 100}%</span>
                    </div>
                    <div className={styles.stat}>
                        <h3>Tips Per Month</h3>
                        <span>{data.tips_per_month}</span>
                    </div>
                    <div className={styles.stat}>
                        <h3>Hit rate</h3>
                        <span>{data.winrate * 100}%</span>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div
                    id={styles.coins}
                    className={`${styles.block} ${styles.wide}`}
                >
                    <div className={styles.info}>
                        <div className={styles.image}>
                            <Image
                                src='/images/dashboard/piggy-bank.svg'
                                height={60}
                                width={60}
                            />
                        </div>
                        <div className={styles.count}>
                            <h4>Coins</h4>
                            <span>{data.coins.count}</span>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <span>
                            If you want to know more about the local currency and how to get it,
                            visit the “About Coin” page
                        </span>
                        <Link href="/about-coins">
                            <a>
                                View more about coin
                            </a>
                        </Link>
                    </div>
                </div>
                <div
                    id={styles.bookmaker}
                    className={`${styles.block} ${styles.narrow}`}
                >
                    <h5>Favorite Bookmaker</h5>
                    <Image
                        src={data.favoriteBookmaker.image}
                        height={50}
                        width={140}
                        objectFit="contain"
                    />
                </div>
            </div>
            <div className={styles.row}>
                <div
                    id={styles.sport}
                    className={`${styles.block} ${styles.small}`}
                >
                    <Image
                        src={data.favoriteSport.image}
                        height={60}
                        width={60}
                    />
                    <div className={styles.info}>
                        <h5>Favorite Sport</h5>
                        <h2>{data.favoriteSport.name}</h2>
                    </div>
                </div>
                <div
                    id={styles.odds}
                    className={`${styles.block} ${styles.narrow}`}
                >
                    <div className={styles.info}>
                        <div className={styles.image}>
                            <Image
                                src="/images/dashboard/chart-bubble.svg"
                                height={60}
                                width={60}
                            />
                        </div>
                        <div className={styles.text}>
                            <h5>Average Odds</h5>
                            <span>{data.odds.avg}</span>
                        </div>
                    </div>
                    <StatisticsChart data={data.odds.history} />
                </div>
                <div
                    id={styles.unit}
                    className={`${styles.block} ${styles.narrow}`}
                >
                    <div className={styles.info}>
                        <h5>All Time Average Unit Rate</h5>
                        <div className={styles.detailed}>
                            <div className={styles.image}>
                                <Image
                                    src="/images/dashboard/coin.svg"
                                    height={60}
                                    width={60}
                                />
                            </div>
                            <div className={styles.text}>
                                <h4>Coins</h4>
                                <span>{data.coins.count}</span>
                            </div>
                        </div>
                    </div>
                    <StatisticsChart data={data.coins.history} />
                </div>
            </div>
            <div className={styles.row}>
                <div
                    id={styles.bets}
                    className={`${styles.block} ${styles.wide}`}
                >
                    <div className={`${styles.progressBar} ${styles.won}`}>
                        <CircularProgressbarWithChildren
                            value={(data.bets.won / data.bets.total) * 360}
                            maxValue={360}
                            styles={{
                                path: {
                                    strokeLinecap: 'round',
                                    strokeWidth: '2px',
                                    stroke: '#7F3FFC',
                                },
                            }}
                        >
                            <h3>Won</h3>
                            <span>{data.bets.won}</span>
                        </CircularProgressbarWithChildren>
                    </div>
                    <div className={`${styles.progressBar} ${styles.pending}`}>
                        <CircularProgressbarWithChildren
                            value={(data.bets.pending / data.bets.total) * 360}
                            maxValue={360}
                            styles={{
                                path: {
                                    strokeLinecap: 'round',
                                    strokeWidth: '2px',
                                    stroke: '#FFB82D'
                                },
                                root: {
                                    transform: `rotate(${360 - (data.bets.won / data.bets.total) * 360}deg)`
                                }
                            }}
                        >
                            <h3>Pending</h3>
                            <span>{data.bets.pending}</span>
                        </CircularProgressbarWithChildren>
                    </div>
                    <div className={`${styles.progressBar} ${styles.lost}`}>
                        <CircularProgressbarWithChildren
                            value={(data.bets.lost / data.bets.total) * 360}
                            maxValue={360}
                            styles={{
                                path: {
                                    strokeLinecap: 'round',
                                    strokeWidth: '2px',
                                    stroke: '#FF5018'
                                },
                                root: {
                                    transform: `rotate(${360 - (data.bets.lost / data.bets.total) * 360}deg)`,
                                }
                            }}
                        >
                            <h3>Lost</h3>
                            <span>{data.bets.lost}</span>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
                <div className={`${styles.block} ${styles.narrow} ${styles.hidden}`} />
            </div>
        </div>
    )
}

const StatisticsChart: React.FC<{ data: { time: number, value: number }[] }> = (props) => {
    const { data } = props

    return (
        <ResponsiveContainer
            height={100}
            width='100%'
        >
            <LineChart
                data={data}
            >
                <Line
                    type='linear'
                    dataKey="value"
                    stroke="#7F3FFC"
                    strokeWidth={2}
                    dot={false}
                    strokeLinecap="round"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default UserDashboard;
