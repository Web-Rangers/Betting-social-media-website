import Image from 'next/image'
import React from 'react'
import { trpc } from 'src/utils/trpc'
import styles from '@styles/components/dashboard/WithdrawTab.module.css'
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { inferArrayElementType } from 'src/utils/inferArrayElementType'
import { WithdrawInfo } from 'src/types/queryTypes'
import Pagination from '@components/shared/TablePagination'
import Moment from 'react-moment'
import { TransactionStatus } from 'src/types/transactionStatus'

const WithdrawTab: React.FC = () => {
    const { data, isLoading } = trpc.useQuery(['user.getWithdrawInfo'])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>Error...</div>
    }

    return (
        <div className={styles.withdrawTab}>
            <div className={styles.row}>
                <div
                    id={styles.withdrawBalance}
                    className={`${styles.block} ${styles.wide} ${styles.positive}`}
                >
                    <div>
                        <div className={styles.image}>
                            <Image
                                src='/images/dashboard/wallet.svg'
                                height={60}
                                width={60}
                            />
                        </div>
                        <div className={styles.text}>
                            <h4>Pending Balance</h4>
                            <span>$ {data.pendingBalance}</span>
                        </div>
                    </div>
                    <div>
                        <h5>Cash that can be withdrawn right now</h5>
                        <WithdrawButton balance={data.availableBalance} />
                    </div>
                </div>
                <div
                    id={styles.withdrawTotal}
                    className={`${styles.block} ${styles.narrow}`}
                >
                    <div className={styles.image}>
                        <Image
                            src='/images/dashboard/total.svg'
                            height={60}
                            width={60}
                        />
                    </div>
                    <div className={styles.text}>
                        <h4>Pending Balance</h4>
                        <span>$ {data.totalEarned}</span>
                    </div>
                </div>
            </div>
            <h2>Historical Withdraws</h2>
            <HistoryTable history={data.history} pageSize={10} />
        </div>
    )
}

const WithdrawButton: React.FC<{ balance: number }> = (props) => {
    const { balance } = props
    // TODO withdraw modal
    return (
        <button className={styles.withdrawButton}>
            <span>Withdraw</span>
            <span>$ {balance}</span>
        </button>
    )
}

const columnHelper = createColumnHelper<inferArrayElementType<WithdrawInfo['history']>>()

function getStyleByStatus(status: TransactionStatus) {
    switch (status) {
        case TransactionStatus.Pending:
            return styles.pending
        case TransactionStatus.Blocked:
            return styles.blocked
        case TransactionStatus.Success:
            return styles.success
        default:
            return undefined
    }
}

const columns = [
    columnHelper.accessor('id', {
        cell: info => <div>
            {info.getValue()}
        </div>,
        header: () => <span>Id</span>,
        enableSorting: false,
    }),
    columnHelper.accessor('amount', {
        cell: info => <span className={styles.amount}>
            {info.getValue()}
        </span>,
        header: () => <span>Amount</span>,
        enableSorting: false,
    }),
    columnHelper.accessor('date', {
        cell: info => <Moment date={info.getValue()} format='DD MMM YYYY' />,
        header: () => <span>Date</span>,
        enableSorting: false,
    }),
    columnHelper.accessor('status', {
        cell: info => {
            const status = info.getValue();
            return (
                <span className={`${styles.status} ${getStyleByStatus(status)}`}>
                    {info.getValue()}
                </span>
            )
        },
        header: () => <span>Status</span>,
        enableSorting: false,
    })
]

const HistoryTable: React.FC<{ history: WithdrawInfo['history'], pageSize?: number }> = (props) => {
    const { history, pageSize } = props;
    const _pageSize = pageSize ?? 20;

    const table = useReactTable({
        data: history,
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
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan} className={styles.header}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
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
            <Pagination table={table} pageCount={Math.ceil(history.length / _pageSize)} />
        </div>
    )
}

export default WithdrawTab