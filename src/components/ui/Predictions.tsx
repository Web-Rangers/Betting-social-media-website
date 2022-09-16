import React, { useState } from "react";
import styles from "@styles/components/ui/Predictions.module.css";
import Image from "next/future/image";
import { Predictions } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { motion } from "framer-motion";
import Moment from "react-moment";

interface PredictionsProps {
	leagues: Predictions;
	h3?: string;
	h2?: string;
}

type MatchType = inferArrayElementType<inferArrayElementType<Predictions>["events"]>;

const Predictions: React.FC<PredictionsProps> = (props) => {
	const { leagues, h2, h3 } = props;

	return (
		<div className={styles.container}>
			{(h2 || h3) && (
				<div className={styles.titles}>
					{h3 && <h3>{h3}</h3>}
					{h2 && <h2>{h2}</h2>}
				</div>
			)}
			{leagues.map((league, leagueIndex) => (
				<div
					className={styles.league}
					key={`league_${leagueIndex}`}
				>
					<div className={styles.leagueDescription}>
						<div className={styles.image}>
							{/* <Image
								src={league.image}
								height={40}
								width={40}
								alt={league.name}
							/> */}
						</div>
						<div className={styles.titles}>
							<span>
								{league.country.name} • {/* {league.sport.name} */}
							</span>
							<span>{league.name}</span>
						</div>
					</div>
					<div className={styles.matches}>
						{league.events.map((match, index) => (
							<Match
								{...match}
								key={`league_${leagueIndex}_match_${index}`}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

const PredictionsVariants = {
	open: {
		height: "auto",
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	closed: {
		height: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

const Match: React.FC<MatchType> = (props) => {
	const { home, away, date } = props;
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className={styles.match}>
			<div className={styles.header}>
				<div className={styles.info}>
					<div className={styles.time}>
						<span>
							<Moment format="HH:mm">{date ?? ""}</Moment>
						</span>
						<span>Today</span>
					</div>
					<div className={styles.teamImages}>
						<div className={styles.teamImage}>
							{/* <Image
								src={home.image}
								alt={home.name}
								width={40}
								height={40}
							/>
							<Image
								src={away.image}
								alt={away.name}
								width={40}
								height={40}
							/> */}
						</div>
					</div>
					<div className={styles.teamNames}>
						<div className={styles.teamName}>{home?.name}</div>
						<div className={styles.teamName}>{away?.name}</div>
					</div>
				</div>
				<div className={styles.details}>
					<div
						className={`${styles.total} ${isOpen ? styles.open : styles.closed}`}
						onClick={() => setIsOpen(!isOpen)}
					>
						{/* {predictions.length} Tip
						{predictions.length > 1 ? "s" : ""} */}
						0 Tips
					</div>
					<div className={styles.more}>Details</div>
				</div>
			</div>
			{/* <motion.div
				className={styles.predictions}
				variants={PredictionsVariants}
				animate={isOpen ? "open" : "closed"}
				initial={false}
			>
				{predictions.map((prediction, index) => (
					<div
						key={index}
						className={styles.prediction}
					>
						<div className={styles.info}>
							<div className={styles.time}>
								<span>{prediction.time}</span>
								<span>Today</span>
							</div>
							<div className={styles.user}>
								<div className={styles.userImage}>
									<Image
										src={prediction.user.image}
										alt={prediction.user.name}
										width={40}
										height={40}
									/>
								</div>
								<div className={styles.userInfo}>
									<div className={styles.userName}>{prediction.user.name}</div>
									<div className={styles.userWinrate}>Winrate {prediction.user.winrate * 100}%</div>
								</div>
							</div>
						</div>
						<div className={styles.comment}>
							<Image
								src="/icons/comment.svg"
								alt="Comment"
								width={20}
								height={20}
							/>
							<span>{prediction.comment ? "With Comment" : "Without comment"}</span>
						</div>
						<div className={styles.outcome}>
							<span>{prediction.type} Prediction</span>
							<span>{prediction.outcome}</span>
						</div>
					</div>
				))}
			</motion.div> */}
		</div>
	);
};

export default Predictions;
