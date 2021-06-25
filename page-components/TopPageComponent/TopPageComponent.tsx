import { TopPageComponentProps } from "./TopPageComponent.props";
import { HTag, Tag, HhData, Advantages, Sort, Product } from "../../components";
import styles from "./TopPageComponent.module.css";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import { useReducedMotion } from "framer-motion";

export const TopPageComponent = ({
	page,
	products,
	firstCategory,
}: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		{ products, sort: SortEnum.Rating },
	);

	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		dispatchSort({ type: "reset", initState: products });
	}, [products]);

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<HTag tag="h1">{page.title}</HTag>
				{products && (
					<Tag
						color="gray"
						size="m"
						aria-label={products.length + "элементов"}>
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div role="list">
				{sortedProducts &&
					sortedProducts.map((p) => (
						<Product
							layout={shouldReduceMotion ? false : true}
							key={p._id}
							product={p}
							role="listitem"
						/>
					))}
			</div>
			<div className={styles.hhTitle}>
				<HTag tag="h2">Вакансии {page.category}</HTag>
				{products && (
					<Tag color="red" size="m">
						hh.ru
					</Tag>
				)}
			</div>
			{firstCategory === TopLevelCategory.Courses && page.hh && (
				<HhData {...page.hh} />
			)}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<HTag tag="h2">Преимущества</HTag>
					<Advantages advantages={page.advantages} />
				</>
			)}
			{page.seoText && (
				<div
					className={styles.seo}
					dangerouslySetInnerHTML={{ __html: page.seoText }}
				/>
			)}
			<HTag tag="h2">Получаемые навыки</HTag>
			{page.tags.map((t) => (
				<Tag key={t} color="primary">
					{t}
				</Tag>
			))}
		</div>
	);
};
