import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import styles from '@styles/pages/Home.module.css';
import Slider from "@components/ui/Slider";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
    const { data: session } = useSession()

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
            <div className={styles.sideColumn}>
                {!session && <SignUpPropose />}
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
                    objectFit="cover"
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

const SignUpPropose: React.FC = () => {
    return (
        <div className={styles.signUpPropose}>
            <h2>
                Join with us!
            </h2>
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book.
            </span>
            <button>Sign Up</button>
        </div>
    )
}

export default Home;
