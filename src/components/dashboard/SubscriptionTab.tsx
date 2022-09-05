import React, { ChangeEvent, useState } from 'react'
import styles from '@styles/components/dashboard/SubscriptionTab.module.css'
import sharedStyles from '@styles/components/dashboard/shared.module.css'
import { trpc } from 'src/utils/trpc'
import Image from 'next/image'
import debounce from 'src/utils/debounce'
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { inferArrayElementType } from 'src/utils/inferArrayElementType'
import { SubscriptionInfo } from 'src/types/queryTypes'
import Pagination from '@components/shared/TablePagination'
import Moment from 'react-moment'

const SubscriptionTab: React.FC = () => {
    const [searchString, setSearchString] = useState<string>('')
    const { data, isLoading } = trpc.useQuery(['user.getSubscriptionInfo'])
    const { data: searchResults, isLoading: searchResultsLoading } = trpc.useQuery(['user.searchSubscribers', { searchString: searchString }])
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
        <div className={styles.subscriptionTab}>
            <div className={sharedStyles.row}>
                <div
                    id={styles.subscribers}
                    className={`${sharedStyles.block} ${sharedStyles.wide} ${sharedStyles.positive}`}
                >
                    <div className={sharedStyles.image}>
                        <Image
                            src='/images/dashboard/subscribers.svg'
                            height={80}
                            width={80}
                        />
                    </div>
                    <div className={styles.text}>
                        <div>
                            <h3>Subscribers</h3>
                            <h2>{data.subscribers_count}</h2>
                        </div>
                        <div>
                            <h4>From last month</h4>
                            <span className={data.subscribers_difference > 0 ? styles.positive : styles.negative}>
                                {(data.subscribers_difference * 100).toFixed(2)}%
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
            <SubscribersTable
                followers={(shouldShowSearchResuts && searchResults && !searchResultsLoading) ? searchResults : data.subscribers}
                pageSize={10}
            />
        </div>
    )
}

const columnHelper = createColumnHelper<inferArrayElementType<SubscriptionInfo['subscribers']>>()

const columns = [
    columnHelper.accessor((row) => ({ ...row }), {
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
        }
    }),
    columnHelper.accessor('amount', {
        cell: info => <span className={styles.price}>$ {info.getValue()}</span>
    }),
    columnHelper.accessor((row) => ({ ...row }), {
        id: 'duration',
        cell: info => {
            const { endsOn, startedOn } = info.getValue()
            return (
                <div className={styles.duration}>
                    <Moment format='DD MMM YYYY'>{startedOn}</Moment>
                    <div className={styles.progress}>
                        <div
                            className={styles.progressBar}
                            style={{
                                width: `${100 - (new Date().getTime() - startedOn.getTime()) / (endsOn.getTime() - startedOn.getTime()) * 100}%`
                            }}
                        />
                    </div>
                    <Moment format='DD MMM YYYY'>{endsOn}</Moment>
                </div>
            )
        }
    }),
    columnHelper.accessor('endsOn', {
        cell: info => (
            <div className={styles.timeLeft}>
                <b><Moment duration={new Date()} format='DD'>{info.getValue()}</Moment></b> days left
            </div>
        )
    }),
    columnHelper.accessor(row => ({ ...row }), {
        id: 'button',
        cell: info => (
            <button className={`${styles.subscribeButton} ${styles.subscribed}`}>
                Subscribed
            </button>
        )
    })
]

const SubscribersTable: React.FC<{ followers: SubscriptionInfo['subscribers'], pageSize?: number }> = (props) => {
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

export default SubscriptionTab
