import { SortEnum, SortProps } from "./Sort.props";
import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";
import cn from "classnames";
import React from "react";

export const Sort = ({
	sort,
	setSort,
	className,
	...props
}: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className="visuallyHidden" id="sort">
				Сортировка
			</div>
			<span
				onClick={() => setSort(SortEnum.Rating)}
				onKeyDown={(key: React.KeyboardEvent) => {
					if (key.code === "Enter" || key.code === "Space") {
						key.preventDefault();
						setSort(SortEnum.Rating);
					}
				}}
				id="rating"
				className={cn({
					[styles.active]: sort === SortEnum.Rating,
				})}
				tabIndex={0}
				aria-selected={sort === SortEnum.Rating}
				aria-labelledby="sort rating">
				<SortIcon className={styles.sortIcon} />
				По рейтингу
			</span>

			<span
				onClick={() => setSort(SortEnum.Price)}
				onKeyDown={(key: React.KeyboardEvent) => {
					if (key.code === "Enter" || key.code === "Space") {
						key.preventDefault();
						setSort(SortEnum.Price);
					}
				}}
				aria-selected={sort === SortEnum.Price}
				aria-labelledby="sort price"
				id="price"
				className={cn({
					[styles.active]: sort === SortEnum.Price,
				})}
				tabIndex={0}>
				<SortIcon className={styles.sortIcon} />
				По цене
			</span>
		</div>
	);
};
