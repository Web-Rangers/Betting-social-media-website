import React, { useContext, useState } from 'react'
import { Tipsters } from 'src/types/queryTypes'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { inferArrayElementType } from 'src/utils/inferArrayElementType'
import styles from '@styles/components/ui/TipsterTable.module.css'
import Image from 'next/image'
import shortenNumber from 'src/utils/shortenNumber'
import { PortalContext } from 'src/utils/portalContext'
import * as portals from 'react-reverse-portal';
import { AnimatePresence } from 'framer-motion'
import TipsterModal from './TipsterModal'

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
    }),
    columnHelper.accessor(row => ({ ...row }), {
        id: 'user',
        cell: info => {
            return <TipsterInfo {...info.getValue()} />
        },
        header: () => <span>Tipster</span>,
    }),
    columnHelper.accessor('form', {
        cell: info => <div className={styles.dots}>
            {info.getValue().map(value => {
                return value
                    ? <div className={`${styles.dot} ${styles.win}`} />
                    : <div className={`${styles.dot} ${styles.lose}`} />
            })}
        </div>,
        header: () => <span>Form</span>
    }),
    columnHelper.accessor('betCount', {
        cell: info => info.getValue(),
        header: () => <span>Bets</span>
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
const TipsterTable: React.FC<{ tipsters: Tipsters }> = (props) => {
    const { tipsters } = props;

    const table = useReactTable({
        data: tipsters,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <table className={styles.table}>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className={styles.header}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
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
    )
}

const TipsterInfo: React.FC<inferArrayElementType<Tipsters>> = (props) => {
    const { name, image, subscriberCount } = props
    const [modalOpen, setModalOpen] = useState(false);

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
                <div className={styles.user}>
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

export default TipsterTable;