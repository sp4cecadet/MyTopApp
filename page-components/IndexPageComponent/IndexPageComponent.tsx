import styles from "./IndexPageComponent.module.css";
import CoursesIcon from "./courses.svg";
import { Card, HTag } from "../../components";
import { AppContext } from "../../context/app.context";
import { useContext } from "react";
import { firstLevelMenu } from "../../helpers/helpers";
import router, { useRouter } from "next/router";
import Link from "next/link";
import { Menu } from "../../layout/Menu/Menu";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";

export const IndexPageComponent = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();
	const categoriesUnwrapper = () => {
		return firstLevelMenu.map(
			(m) => m.id === firstCategory && buildCoursesBlocks(m),
		);
	};

	const buildCoursesBlocks = (menuItem: FirstLevelMenuItem) => {
		return menu.map((m) => (
			<Card className={styles.courseBlock} key={m._id.secondCategory}>
				<h2 className={styles.courseTitle}>{m._id.secondCategory}</h2>
				{buildCoursesLinks(m.pages, menuItem.route)}
			</Card>
		));
	};

	const buildCoursesLinks = (pages: PageItem[], route: string) => {
		return pages.map((p) => (
			<Link href={`/${route}/${p.alias}/`}>
				<a
					className={styles.courseItem}
					tabIndex={0}
					aria-current={
						`/${route}/${p.alias}/` === router.asPath
							? "page"
							: false
					}
					onKeyDown={(key: React.KeyboardEvent) => {
						if (key.code === "Space") {
							key.preventDefault();
							router.push(`/${route}/${p.alias}/`);
						}
					}}>
					{p.category}
				</a>
			</Link>
		));
	};

	return (
		<>
			<div className={styles.pageHeader}>
				<div className={styles.icon}>
					<CoursesIcon />
				</div>
				<h1 className={styles.pageTitle}>Курсы</h1>
			</div>
			<div className={styles.coursesGrid}>{categoriesUnwrapper()}</div>
		</>
	);
};
