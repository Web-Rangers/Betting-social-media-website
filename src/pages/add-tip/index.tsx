import { NextPage } from 'next'
import React, { ChangeEvent, ChangeEventHandler, useMemo, useState } from 'react'
import styles from '@styles/pages/AddTip.module.css'
import Image from 'next/image'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { Matches, Sports } from 'src/types/queryTypes'
import { trpc } from 'src/utils/trpc'
import debounce from 'src/utils/debounce'
import * as portals from 'react-reverse-portal'
import { PortalContext } from 'src/utils/portalContext'
import { AnimatePresence } from 'framer-motion'

const AddTip: NextPage = () => {
    const portalNode = useMemo(() => {
        if (typeof window === "undefined") {
            return null;
        }
        return portals.createHtmlPortalNode({
            attributes: {
                style: "position: absolute; top: 0; left: 0;"
            }
        });
    }, []);

    return (
        <>
            <PortalContext.Provider value={{ portalNode: portalNode }}>
                {portalNode && <portals.OutPortal node={portalNode} />}
                <div className={styles.mainBlock}>
                    <div className={styles.background}>
                        <Image
                            src='/images/add-tip-background.png'
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                    <div className={styles.content}>
                        <h2>OPTIMO</h2>
                        <div className={styles.progress}>
                            <div className={styles.progressBarContainer}>
                                <CircularProgressbarWithChildren
                                    value={1}
                                    maxValue={3}
                                    styles={{
                                        path: {
                                            strokeWidth: '10px',
                                            stroke: '#7F3FFC'
                                        },
                                        trail: {
                                            strokeWidth: '9px',
                                            stroke: '#FFFFFF'
                                        },
                                    }}
                                    className={styles.progressBar}
                                >
                                    <span className={styles.progressText}><b>1</b>/3</span>
                                </CircularProgressbarWithChildren>
                            </div>
                            <div className={styles.stepText}>
                                <span>Find Event</span>
                                <span>Use the search bar</span>
                            </div>
                            <SearchBar />
                        </div>
                    </div>
                    <span className={styles.disclaimer}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam nisi quam, pretium imperdiet erat nec, malesuada
                        scelerisque arcu. Proin quis varius orci. Donec ut
                        suscipit orci.
                    </span>
                </div>
            </PortalContext.Provider>
        </>
    )
}

const SearchBar: React.FC = (props) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const { data: searchResults, refetch } = trpc.useQuery(['matches.search', { searchString: searchValue }])

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        if (value === '') return
        setSearchValue(value)
        refetch()
    }

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.filterContainer}>
                <Filter />
            </div>
            <input
                className={styles.searchBar}
                placeholder='Search for match'
                onChange={debounce(handleSearch, 1000)}
            />
            {searchResults &&
                <div className={styles.results}>
                    {searchResults.map(({ sport, date, teams, league }, index) => (
                        <div
                            key={`result_${index}`}
                            className={styles.result}
                        >
                            <div className={styles.league}>
                                <Image
                                    src={sport.image}
                                    height={24}
                                    width={24}
                                />
                                <div className={styles.info}>
                                    <span>{sport.name}</span>
                                    <span>{league}</span>
                                </div>
                            </div>
                            <div className={styles.time}>
                                {date}
                            </div>
                            <div className={styles.teams}>
                                <div className={styles.images}>
                                    {teams.map(({ image }) => (
                                        <div className={styles.image}>
                                            <Image
                                                src={image}
                                                height={36}
                                                width={36}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.names}>
                                    {teams.map(({ name }) => (
                                        <span className={styles.name}>
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <button className={styles.searchButton}>
                <Image
                    src='/icons/search-white.svg'
                    height={24}
                    width={24}
                />
            </button>
        </div>
    )
}

const Filter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <PortalContext.Consumer>
                {({ portalNode }) => portalNode &&
                    <portals.InPortal node={portalNode}>
                        <AnimatePresence initial={false}>
                        </AnimatePresence>
                    </portals.InPortal>
                }
            </PortalContext.Consumer>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`${styles.filter} ${isOpen && styles.open}`}
            >
                <Image
                    src={isOpen ? '/icons/filter-white.svg' : '/icons/filter.svg'}
                    height={24}
                    width={24}
                />
                Filter
            </div>
        </>
    )
}

export default AddTip