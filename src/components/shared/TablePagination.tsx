import { Table } from '@tanstack/react-table';
import React, { ReactElement, useEffect, useState } from 'react'
import styles from '@styles/components/shared/TablePagination.module.css'
import Image from 'next/image';


const Pagination: React.FC<{ table: Table<any>, pageCount: number }> = (props) => {
    const { table, pageCount } = props
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pages, setPages] = useState<ReactElement[]>()

    function updatePages() {
        let numbers = new Array<ReactElement>();
        for (let index = (currentPage >= 3 ? currentPage - 2 : 0); index < ((currentPage + 2 >= pageCount) ? pageCount : currentPage + 3); index++) {
            numbers.push(
                <span
                    key={`pagination_page_${index}`}
                    className={`${styles.pageNumber} ${index === currentPage && styles.active}`}
                    onClick={() => changePage(index)}
                >
                    {index + 1}
                </span>
            )
        }
        setPages(numbers)
    }

    function changePage(index: number) {
        setCurrentPage(index)
        table.setPageIndex(index)
    }

    function nextPage() {
        table.nextPage()
        updatePages()
        setCurrentPage(currentPage + 1)
    }

    function prevPage() {
        table.previousPage()
        updatePages()
        setCurrentPage(currentPage - 1)
    }

    useEffect(() => {
        updatePages()
    }, [currentPage])

    if (pageCount <= 1) {
        return <></>
    }

    return (
        <div className={styles.pagination}>
            <button
                className={`${styles.chevron} ${styles.left}`}
                onClick={prevPage}
                disabled={!table.getCanPreviousPage()}
            >
                <Image
                    src='/icons/chevron.svg'
                    height={24}
                    width={24}
                />
            </button>
            {pages}
            <button
                className={`${styles.chevron} ${styles.right}`}
                onClick={nextPage}
                disabled={!table.getCanNextPage()}
            >
                <Image
                    src='/icons/chevron.svg'
                    height={24}
                    width={24}
                />
            </button>
        </div>
    )
}

export default Pagination
