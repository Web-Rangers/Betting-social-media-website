import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import styles from '@styles/pages/Home.module.css';
import Slider from "@components/ui/Slider";
import Image from "next/image";

const Home: NextPage = () => {
    return (
        <>
            <div className={styles.mainColumn}>
                <div className={styles.slider}>
                    <Slider>
                        {
                            [1, 2, 3, 4, 5].map(i => (
                                <Slide />
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </>
    );
};

const Slide: React.FC = () => {
    return (
        <div className={styles.slide}>
            <div className={styles.slideBackground}>
                <Image
                    src="/images/slide-background-placeholder.png"
                    alt="slide-background"
                    layout="fill"
                />
            </div>
            <div className={styles.slideTimer}>
                <div className={styles.timerElement}>
                    <span className={styles.timerElementValue}>13 </span>
                    <span className={styles.timerElementLabel}>day</span>
                </div>
                :
                <div className={styles.timerElement}>
                    <span className={styles.timerElementValue}>13</span>
                    <span className={styles.timerElementLabel}>hr</span>
                </div>
                :
                <div className={styles.timerElement}>
                    <span className={styles.timerElementValue}>13</span>
                    <span className={styles.timerElementLabel}>min</span>
                </div>
                :
                <div className={styles.timerElement}>
                    <span className={styles.timerElementValue}>13</span>
                    <span className={styles.timerElementLabel}>sec</span>
                </div>
            </div>
            <div className={styles.slideSummary}>
                <div className={styles.slideSummaryTitle}>
                    <span className={styles.slideSummaryTitleCountry}>Germany</span>
                    <span className={styles.slideSummaryTitleLeague}>Bunes League</span>
                </div>
                <div className={styles.slideSummaryTeams}>
                    <div className={styles.slideSummaryTeam}>
                        <span className={styles.slideSummaryTeamName}>Eintracht Frankfurt</span>
                        <div className={styles.slideSummaryTeamImage}>
                            <Image
                                src="/images/team-1-placeholder.svg"
                                alt="Eintracht Frankfurt"
                                width={36}
                                height={36}
                            />
                        </div>
                    </div>
                    VS
                    <div className={styles.slideSummaryTeam}>
                        <div className={styles.slideSummaryTeamImage}>
                            <Image
                                src="/images/team-2-placeholder.svg"
                                alt="Bayern Munich"
                                width={36}
                                height={36}
                            />
                        </div>
                        <span className={styles.slideSummaryTeamName}>Bayern Munich</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
