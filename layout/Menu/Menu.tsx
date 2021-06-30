import { KeyboardEvent, useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";

import styles from "./Menu.module.css";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";

import { motion, useReducedMotion } from "framer-motion";

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();
	const router = useRouter();

	const shouldReduceMotion = useReducedMotion();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion
				? {}
				: {
						when: "beforeChildren",
						staggerChildren: 0.1,
				  },
		},
		hidden: { marginBottom: 0 },
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29,
		},
		hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code === "Space" || key.code === "Enter") {
			key.preventDefault();
		}
	};

	const buildFirstLevel = () => {
		firstLevelMenu.map(
			(m) => m.id === firstCategory && buildSecondLevel(m),
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map((m) => {
					if (
						m.pages
							.map((p) => p.alias)
							.includes(router.asPath.split("/")[2])
					) {
						m.isOpened = true;
					}

					return (
						<li key={m._id.secondCategory}>
							<button
								tabIndex={0}
								onKeyDown={(key: KeyboardEvent) =>
									openSecondLevelKey(
										key,
										m._id.secondCategory,
									)
								}
								className={styles.secondLevel}
								aria-expanded={m.isOpened}>
								{m._id.secondCategory}
							</button>
							<motion.ul
								className={cn(styles.secondLevelBlock)}
								layout
								variants={variants}
								initial={m.isOpened ? "visible" : "hidden"}
								animate={m.isOpened ? "visible" : "hidden"}>
								{buildThirdLevel(
									m.pages,
									menuItem.route,
									m.isOpened ?? false,
								)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean,
	) => {
		return pages.map((p) => (
			<motion.li key={p.alias} variants={variantsChildren}>
				<Link href={`/${route}/${p.alias}/`}>
					<a
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]:
								`/${route}/${p.alias}/` === router.asPath,
						})}
						tabIndex={isOpened ? 0 : -1}
						onKeyDown={(key: KeyboardEvent) => {
							if (key.code === "Space") {
								key.preventDefault();
								router.push(`/${route}/${p.alias}/`);
							}
						}}
						aria-current={
							`/${route}/${p.alias}/` === router.asPath
								? "page"
								: false
						}>
						{p.category}
					</a>
				</Link>
			</motion.li>
		));
	};

	return (
		<nav className={styles.menu} role="navigation">
			{announce && (
				<span className="visuallyHidden" role="log">
					{announce === "opened" ? "развёрнуто" : "свёрнуто"}
				</span>
			)}
			{buildFirstLevel()}
		</nav>
	);
};
