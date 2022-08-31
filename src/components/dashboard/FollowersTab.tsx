import React, { ChangeEvent, useState } from 'react'
import styles from '@styles/components/dashboard/FollowersTab.module.css'
import Image from 'next/image'
import { trpc } from 'src/utils/trpc'
import debounce from 'src/utils/debounce'
import { FollowersInfo } from 'src/types/queryTypes'
import { inferArrayElementType } from 'src/utils/inferArrayElementType'
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import Pagination from '@components/shared/TablePagination'
import shortenNumber from 'src/utils/shortenNumber'

const FollowersTab: React.FC = () => {
    const [searchString, setSearchString] = useState<string>('')
    const { data: searchResults, isLoading: searchResultsLoading } = trpc.useQuery(['user.searchFollowers', { searchString: searchString }])
    const { data, isLoading } = trpc.useQuery(['user.getFollowersInfo'])
    const [shouldShowSearchResuts, setShouldShowSearchResults] = useState(false)

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        if (value !== '') {
            setSearchString(value)
            setShouldShowSearchResults(true)
        } else {
            setShouldShowSearchResults(false)
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
                            <span className={data.difference > 0 ? styles.positive : styles.negative}>
                                {(data.difference * 100).toFixed(2)}%
                            </span>
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
            <FollowersTable
                followers={(shouldShowSearchResuts && searchResults && !searchResultsLoading) ? searchResults : data.followers}
                pageSize={10}
            />
        </div>
    )
}

const columnHelper = createColumnHelper<inferArrayElementType<FollowersInfo['followers']>>()

const columns = [
    columnHelper.accessor(row => ({ ...row }), {
        id: 'user',
        cell: info => {
            const { image, name } = info.getValue()
            return (
                <div className={styles.user}>
                    <div className={styles.avatar}>
                        <Image
                            src={image}
                            height={36}
                            width={36}
                        />
                    </div>
                    <span>{name}</span>
                </div>
            )
        },
        header: () => <span>Tipster</span>,
    }),
    columnHelper.accessor('follower_count', {
        cell: info => <span>
            {shortenNumber(info.getValue(), 0)} followers
        </span>,
    }),
    columnHelper.accessor('following', {
        cell: info => {
            const following = info.getValue()
            return (
                <button className={`${styles.followButton} ${following ? styles.following : styles.follow}`}>
                    {following ? 'Following' : 'Follow'}
                </button>
            )
        },
    }),
]

const FollowersTable: React.FC<{ followers: FollowersInfo['followers'], pageSize?: number }> = (props) => {
    const { followers, pageSize } = props;
    const _pageSize = pageSize ?? 20;

    const table = useReactTable({
        data: followers,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: _pageSize,
            },
        },
    })

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <tbody className={styles.body}>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className={styles.tableRow}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={styles.cell}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination table={table} pageCount={Math.ceil(followers.length / _pageSize)} />
        </div>
    )
}

export default FollowersTab