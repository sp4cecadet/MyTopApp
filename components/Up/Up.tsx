import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useScrollY } from "../../hooks/useScrollY";
import { ButtonItem } from "../ButtonItem/ButtonItem";
import styles from "./Up.module.css";
import UpIcon from "./Up.svg";

export const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<motion.div
			className={styles.up}
			animate={controls}
			initial={{ opacity: 0 }}>
			<ButtonItem
				appearance="primary"
				icon="up"
				aria-label="Наверх"
				onClick={scrollToTop}
			/>
		</motion.div>
	);
};
