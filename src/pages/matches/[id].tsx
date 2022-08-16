import type { NextPage } from "next"
import Head from "next/head"
import styles from "../../styles/pages/MatchSummary.module.css"
import Image from "next/image"
import { useRouter } from "next/router";

const MatchSummary: NextPage = () => {
    const router = useRouter()

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
                </main>
            </div>
        </>
    );
};

export default MatchSummary;