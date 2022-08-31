import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Tipsters } from 'src/types/queryTypes'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    Table,
    useReactTable,
} from '@tanstack/react-table'
import { inferArrayElementType } from 'src/utils/inferArrayElementType'
import styles from '@styles/components/ui/TipsterTable.module.css'
import Image from 'next/image'
import shortenNumber from 'src/utils/shortenNumber'
import { PortalContext } from 'src/utils/portalContext'
import * as portals from 'react-reverse-portal';
import { AnimatePresence, motion } from 'framer-motion'
import TipsterModal from './TipsterModal'
import Pagination from '@components/shared/TablePagination'

const columnHelper = createColumnHelper<inferArrayElementType<Tipsters>>()

const columns = [
    columnHelper.display({
        id: 'index',
        header: '#',
        cell: props => props.row.index === 0
            ? <div>
                <Image
                    src='/icons/crown-violet.svg'
                    height={24}
                    width={24}
                />
            </div>
            : props.row.index + 1,
        enableSorting: false,
    }),
    columnHelper.accessor(row => ({ ...row }), {
        id: 'user',
        cell: info => {
            return <TipsterInfo {...info.getValue()} />
        },
        header: () => <span>Tipster</span>,
        enableSorting: false,
    }),
    columnHelper.accessor('form', {
        cell: info => <div className={styles.dots}>
            {info.getValue().map((value, index) => {
                return value
                    ? <div
                        key={`table_dot_${index}_${info.row.index}`}
                        className={`${styles.dot} ${styles.win}`}
                    />
                    : <div
                        key={`table_dot_${index}_${info.row.index}`}
                        className={`${styles.dot} ${styles.lose}`}
                    />
            })}
        </div>,
        header: () => <span>Form</span>,
        enableSorting: false,
    }),
    columnHelper.accessor('betCount', {
        cell: info => info.getValue(),
        header: () => <span>Bets</span>,
    }),
    columnHelper.accessor('winrate', {
        cell: info => info.getValue() * 100 + '%',
        header: () => <span>Hitrates</span>
    }),
    columnHelper.accessor('roi', {
        cell: info => info.getValue() > 0
            ? <span className={`${styles.roi} ${styles.positive}`}>{info.getValue()}</span>
            : <span className={`${styles.roi} ${styles.negative}`}>{info.getValue()}</span>,
        header: () => <span>ROI</span>
    }),
]
/**
 * The component must be wrapped with 
 * <PortalContext.Provider> for the modal
 * to work
 */
const TipsterTable: React.FC<{ tipsters: Tipsters, pageSize?: number }> = (props) => {
    const { tipsters, pageSize } = props;
    const _pageSize = pageSize ?? 20;
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data: tipsters,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: _pageSize,
            },
        },
    })

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan} className={styles.header}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: <Image
                                                        src='/icons/chevron.svg'
                                                        height={16}
                                                        width={16}
                                                        className={styles.sortAsc}
                                                    />,
                                                    desc: <Image
                                                        src='/icons/chevron.svg'
                                                        height={16}
                                                        width={16}
                                                        className={styles.sortDesc}
                                                    />,
                                                }[header.column.getIsSorted() as string] ?? null}
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
                        <tr key={row.id} className={styles.row}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={styles.cell}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination table={table} pageCount={Math.ceil(tipsters.length / _pageSize)} />
        </div>
    )
}

const TipsterInfo: React.FC<inferArrayElementType<Tipsters>> = (props) => {
    const { name, image, subscriberCount } = props
    const [modalOpen, setModalOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <PortalContext.Consumer>
                {({ portalNode }) =>
                    portalNode && <portals.InPortal node={portalNode}>
                        <AnimatePresence>
                            {modalOpen && <TipsterModal {...props} onClose={() => setModalOpen(false)} />}
                        </AnimatePresence>
                    </portals.InPortal>
                }
            </PortalContext.Consumer>
            <div className={styles.tipster}>
                <div
                    className={styles.user}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <AnimatePresence initial={false}>
                        {isHovering && <UserHover {...props} />}
                    </AnimatePresence>
                    <div className={styles.avatar}>
                        <Image
                            src={image}
                            height={36}
                            width={36}
                            alt={name}
                        />
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.subscribers}>{shortenNumber(subscriberCount, 0)} subscribers</span>
                    </div>
                </div>
                <button onClick={() => setModalOpen(!modalOpen)}>
                    <Image
                        src='/icons/plus-gray.svg'
                        height={18}
                        width={18}
                    />
                    Subscribe
                </button>
            </div>
        </>
    )
}

const UserHoverVariants = {
    open: {
        opacity: [0, 1],
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    },
    closed: {
        opacity: [1, 0],
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    }
}

const UserHover: React.FC<inferArrayElementType<Tipsters>> = (props) => {
    const { avgProfit, name, image, sport, followerCount } = props

    return (
        <motion.div
            className={styles.hoverContainer}
            variants={UserHoverVariants}
            initial="closed"
            animate="open"
            exit="closed"
        >
            <div className={`${styles.profit} ${avgProfit > 0 ? styles.positive : styles.negative}`}>
                <span>Avg. Monthly Profit</span>
                <span>$ {avgProfit}</span>
            </div>
            <div className={styles.userDetailed}>
                <div className={styles.infoContainer}>
                    <div className={styles.user}>
                        <div className={styles.avatar}>
                            <Image
                                src={image}
                                height={60}
                                width={60}
                            />
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.name}>{name}</span>
                            <span className={styles.sport}>
                                Top {sport.name} Tipster
                                <Image
                                    src={sport.image}
                                    height={24}
                                    width={24}
                                />
                            </span>
                        </div>
                    </div>
                    <div className={styles.followers}>
                        <button>
                            <Image
                                src='/icons/follow.svg'
                                height={20}
                                width={20}
                            />
                            Follow
                        </button>
                        <span>{shortenNumber(followerCount, 0)} followers</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}


export default TipsterTable;