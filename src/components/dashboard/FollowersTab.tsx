import React, { ChangeEvent, useState } from 'react'
import styles from '@styles/components/dashboard/FollowersTab.module.css'
import Image from 'next/image'
import { trpc } from 'src/utils/trpc'
import debounce from 'src/utils/debounce'

const FollowersTab: React.FC = () => {
    const [searchString, setSearchString] = useState<string>('')
    const { data: searchResults, isLoading: searchResultsLoading } = trpc.useQuery(['user.searchFollowers', { searchString: searchString }])
    const { data, isLoading } = trpc.useQuery(['user.getFollowersInfo'])

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        if (value !== '') {
            setSearchString(value)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>Error...</div>
    }

    return (
        <div className={styles.followersTab}>
            <div className={styles.row}>
                <div
                    id={styles.followers}
                    className={`${styles.block} ${styles.wide} ${styles.positive}`}
                >
                    <div className={styles.image}>
                        <Image
                            src='/images/dashboard/followers.svg'
                            height={80}
                            width={80}
                        />
                    </div>
                    <div className={styles.text}>
                        <div>
                            <h3>Followers</h3>
                            <h2>{data.count}</h2>
                        </div>
                        <div>
                            <h4>From last month</h4>
                            <span>{(data.difference * 100).toFixed(2)}%</span>
                        </div>
                    </div>
                    <div className={styles.search}>
                        <input
                            type={'text'}
                            placeholder="Search"
                            onChange={debounce(handleSearch, 1000)}
                        />
                        <div className={styles.icon}>
                            <Image
                                src='/icons/search-white.svg'
                                height={24}
                                width={24}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowersTab