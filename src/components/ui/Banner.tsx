import React from "react";
import styles from "@styles/components/ui/Banner.module.css";
import Image from "next/future/image";

interface BannerProps {
	height: number;
	image: string;
}

const Banner: React.FC<BannerProps> = (props) => {
	const { height, image } = props;

	return (
		<div
			className={styles.container}
			style={{ height: height }}
		>
			<Image
				src={image}
				alt="banner"
				fill
			/>
		</div>
	);
};

export default Banner;
