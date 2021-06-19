import { TopPageComponentProps } from "./TopPageComponent.props";
import { HTag, Tag, HhData, Advantages, Sort, Product } from "../../components";
import styles from "./TopPageComponent.module.css";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useReducer } from "react";
import { sortReducer } from "./sort.reducer";

export const TopPageComponent = ({
	page,
	products,
	firstCategory,
}: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		{ products, sort: SortEnum.Rating },
	);

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<HTag tag="h1">{page.title}</HTag>
				{products && (
					<Tag color="gray" size="m">
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div>
				{sortedProducts &&
					sortedProducts.map((p) => (
						<Product key={p._id} product={p} />
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
