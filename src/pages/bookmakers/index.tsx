import React from "react";
import styles from "@styles/pages/Bookmakers.module.css";
import Image from "next/future/image";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { BestBookmakers } from "src/types/queryTypes";
import { NextPage } from "next";
import { trpc } from "src/utils/trpc";

const Bookmakers: NextPage = () => {
	const { data: bestBookmakers, isLoading: bestBookmakersLoading } = trpc.useQuery([
		"bookmakers.getTop",
	]);

	if (bestBookmakersLoading) {
		return <div>Loading...</div>;
	}

	if (!bestBookmakers) {
		return <div>Error...</div>;
	}

	return (
		<>
			<div className={styles.bestBookmakers}>
				<div className={styles.background}>
					<Image
						src="/images/stadium-background.png"
						fill
						alt=""
						style={{
							objectFit: "cover",
						}}
					/>
				</div>
				<div className={styles.header}>
					<h3>OUR CHOICE</h3>
					<h2>Best Bookmakers</h2>
				</div>
				<div className={styles.bookmakers}>
					{bestBookmakers.map((bookmaker) => (
						<BestBookmaker {...bookmaker} />
					))}
				</div>
			</div>
			<div className={styles.content}>b</div>
		</>
	);
};

const BestBookmaker: React.FC<inferArrayElementType<BestBookmakers>> = (props) => {
	const { color, image, name, rating, offer } = props;
	return (
		<div className={styles.bestBookmaker}>
			<div
				className={styles.info}
				style={{ backgroundColor: color }}
			>
				<div className={styles.column}>
					<span className={styles.name}>{name}</span>
					<span className={styles.offer}>{offer}</span>
				</div>
				<div className={styles.column}>
					<Image
						src={image}
						height={50}
						width={140}
						alt={name}
						style={{
							objectFit: "contain",
						}}
					/>
					<div className={styles.rating}>
						<Image
							src="/icons/star-white.svg"
							height={24}
							width={24}
							alt=""
						/>
						<span>{rating}</span>
					</div>
				</div>
			</div>
			<div className={styles.links}>
				<button className={styles.visit}>
					<span>Visit</span>
					<Image
						src="/icons/link.svg"
						height={24}
						width={24}
						alt=""
					/>
				</button>
				<button className={styles.review}>See Review</button>
			</div>
		</div>
	);
};

export default Bookmakers;
