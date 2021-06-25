import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Sidebar } from "./Sidebar/Sidebar";
import { FunctionComponent, useRef, useState } from "react";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components/";
import cn from "classnames";

const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [slIsDisplayed, setSLIsDisplayed] = useState<boolean>(false);

	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: React.KeyboardEvent) => {
		if (key.code === "Space" || key.code === "Enter") {
			key.preventDefault();
			bodyRef.current?.focus();
			setSLIsDisplayed(false);
		} else {
			setSLIsDisplayed(false);
		}
	};

	return (
		<div className={styles.wrapper}>
			<a
				onFocus={() => setSLIsDisplayed(true)}
				onKeyDown={skipContentAction}
				tabIndex={1}
				className={cn(styles.skipLink, {
					[styles.displayed]: slIsDisplayed,
				})}>
				К содержанию
			</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main
				className={styles.body}
				ref={bodyRef}
				tabIndex={0}
				role="main">
				{children}
			</main>
			<Footer className={styles.footer}></Footer>
			<Up />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
	Component: FunctionComponent<T>,
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider
				menu={props.menu}
				firstCategory={props.firstCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};
