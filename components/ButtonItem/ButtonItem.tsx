import { ButtonItemProps, icons } from "./ButtonItem.props";
import styles from "./ButtonItem.module.css";
import cn from "classnames";
import ArrowIcon from "./img/arrow.svg";

export const ButtonItem = ({
	appearance,
	icon,
	className,
	...props
}: ButtonItemProps): JSX.Element => {
	const IconComponent = icons[icon];

	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == "primary",
				[styles.white]: appearance == "white",
			})}
			{...props}>
			<IconComponent />
		</button>
	);
};
