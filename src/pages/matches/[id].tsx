import type { NextPage } from "next"
import Head from "next/head"
import styles from "../../styles/pages/MatchSummary.module.css"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DropdownSearch from "@components/ui/match-summary/DropdownSearch"
import OddsFilter from "@components/ui/match-summary/OddsFilter"

const pages = [
    {
        id:1,
        name:"Match Summary"
    },
    {
        id:2,
        name:"Lineups"
    },
    {
        id:3,
        name:"Odds"
    },
    {
        id:4,
        name:"H2H"
    },
    {
        id:5,
        name:"Standings"
    },
    {
        id:6,
        name:"Predictions"
    },
    {
        id:7,
        name:"Statistics"
    },
    {
        id:8,
        name:"News"
    },
    ,
    {
        id:9,
        name:"Bookmakers"
    }    
]

const MatchSummary: NextPage = () => {
    const router = useRouter()
    const [selectedPage, setSelectedPage] = useState(0)
    const [selectedPageComponent, setSelectedPageComponent] = useState(<MatchSummaryPage />)

    useEffect(()=>{
        switch (selectedPage) {
            case 0:
                setSelectedPageComponent(<MatchSummaryPage />)
                break;
            case 1:
                setSelectedPageComponent(<LineupsPage />)
                break;
            case 2:
                setSelectedPageComponent(<OddsPage />)
                break;
        }
    },[selectedPage])

    return (
        <>
            <Head>
                <title>Optimo Match Summary</title>
                <meta name="description" content="Optimo betting social media. Match summary" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.sideCol}>

                </div>
                <main className={styles.main}>
                    <div className={styles.matchPreview}>
                        <Image 
                            //test img link
                            src="/testimg/football.jpg"
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className={styles.matchInfo}>
                            <div className={styles.matchHeader}>
                                <div 
                                    className={styles.buttonBack}
                                    onClick={() => router.back()}
                                >
                                    <Image 
                                        src="/icons/arrow-narrow-left.svg"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className={styles.championship}>
                                    <span className={styles.country}>
                                        Country
                                    </span>
                                    <span className={styles.tournament}>
                                        Tournament - 1
                                    </span>
                                </div>
                            </div>
                            <div className={styles.matchData}>
                                <div className={styles.club}>
                                    <div className={styles.clubLogo}>
                                        <Image
                                            src="/testimg/club1.png"
                                            width={60}
                                            height={60}
                                            objectFit="contain"
                                            objectPosition="center center"
                                        />
                                    </div>
                                    <span>
                                        Club 1
                                    </span>
                                </div>
                                <div className={styles.result}>
                                    <span className={styles.score}>
                                        1 : 2
                                    </span>
                                    <div className={styles.currentTime}>
                                        <span>
                                            1ST HALF
                                        </span>
                                        <span>
                                            42:44
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.club}>
                                    <div className={styles.clubLogo}>
                                        <Image
                                            src="/testimg/club2.png"
                                            width={60}
                                            height={60}
                                            objectFit="contain"
                                            objectPosition="center center"
                                        />
                                    </div>
                                    <span>
                                        Club 2
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.matchStatPages}>
                        <div className={styles.pageSelector}>
                            {pages.map((page, index) => (
                                <span 
                                    className={`${styles.page} ${index == selectedPage && styles.pageActive}`}
                                    onClick={()=>setSelectedPage(index)}
                                    key={page?.id}
                                    aria-label={page?.name}
                                >
                                    {page?.name}
                                    {index == selectedPage && 
                                        <motion.div className={styles.pageUnderline} layoutId="pageUnderline" />
                                    }
                                </span>
                            ))}
                        </div>
                        <AnimatePresence exitBeforeEnter>
                            <motion.div
                                key={selectedPage ? selectedPage : "empty"}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {selectedPageComponent}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </>
    );
};

const MatchSummaryPage: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.stageStat}>
                <div className={styles.stage}>
                    <span>
                        1ST HALF
                    </span>
                    <span>
                        0 - 0
                    </span>
                </div>
                <div className={styles.statLine}>
                    <span>
                        13'
                    </span>
                    <div>
                        ICON
                    </div>                    
                    <span>
                        Some Action
                    </span>
                </div>
                <div className={styles.statLine} style={{flexDirection:'row-reverse'}}>
                    <span>
                        26'
                    </span>
                    <div>
                        ICON
                    </div>                    
                    <span>
                        Some Action
                    </span>
                </div>
                <div className={styles.stage}>
                    <span>
                        2ND HALF
                    </span>
                    <span>
                        0 - 0
                    </span>
                </div>
                <div className={styles.statLine}>
                    <span>
                        56'
                    </span>
                    <div>
                        ICON
                    </div>                    
                    <span>
                        Some Action
                    </span>
                </div>
                <div className={styles.statLine}>
                    <span>
                        56'
                    </span>
                    <div>
                        ICON
                    </div>                    
                    <span>
                        Some Action
                    </span>                   
                    <span style={{fontWeight:400}}>
                        Some Action
                    </span>
                </div>
                <div className={styles.statLine}>
                    <span>
                        56'
                    </span>
                    <div className={styles.iconWithText}>
                        <div>ICON</div>
                        1 - 0
                    </div>                    
                    <span>
                        Some Action
                    </span>
                </div>
                <div className={styles.statLine} style={{flexDirection:'row-reverse'}}>
                    <span>
                        78'
                    </span>
                    <div>
                        ICON
                    </div>                    
                    <span>
                        Some Action
                    </span>
                </div>
                <div className={styles.statLine} style={{flexDirection:'row-reverse'}}>
                    <span>
                        85'
                    </span>
                    <div className={styles.iconWithText} style={{flexDirection:'row-reverse'}}>
                        <div>ICON</div>
                        1 - 0
                    </div>                    
                    <span>
                        Some Action
                    </span>
                </div>
            </div>
            <div className={styles.infoLink}>
                <span className={styles.infoTitle}>
                    Match Information
                </span>
                <span className={styles.infoUrl}>
                    <Image
                        src="/icons/pick.svg"
                        width={20}
                        height={20}
                    />
                    WWK Arena (Augsburg)
                </span>
            </div>
        </div>
    )
}

const LineupsPage: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            
        </div>
    )
}

const OddsPage: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.oddsFilter}>
                <DropdownSearch 
                    items={[
                        {
                            id:'1', 
                            name:"bookmaker 1", 
                            image:"/images/bookmaker-placeholder-3.png"
                        },
                        {
                            id:'2', 
                            name:"bookmaker 2", 
                            image:"/images/bookmaker-placeholder-1.png"
                        }
                    ]} 
                    onSelect={(id) => {}}
                />
                <OddsFilter 
                    items={[
                        {
                            id:'1', 
                            name:"All"
                        },
                        {
                            id:'2', 
                            name:"Main"
                        },
                        {
                            id:'3', 
                            name:"Total"
                        },
                        {
                            id:'4', 
                            name:"Handicap"
                        },
                        {
                            id:'5', 
                            name:"Half"
                        },
                        {
                            id:'6', 
                            name:"Goals"
                        },
                        {
                            id:'7', 
                            name:"O/E"
                        },
                        {
                            id:'8', 
                            name:"BTS"
                        }
                    ]} 
                    onSelect={(id) => {}} 
                />
            </div>
        </div>
    )
}

export default MatchSummary;