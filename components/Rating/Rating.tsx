import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import cn from "classnames";
import StarIcon from "./img/star.svg";
import React, {
	useEffect,
	useState,
	forwardRef,
	ForwardedRef,
	useRef,
} from "react";

export const Rating = forwardRef(
	(
		{
			isEditable = false,
			rating,
			error,
			setRating,
			tabIndex,
			...props
		}: RatingProps,
		ref: ForwardedRef<HTMLDivElement>,
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>),
		);

		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constructRating(rating);
		}, [rating, tabIndex]);

		const computeFocus = (rating: number, index: number): number => {
			if (!isEditable) return -1;
			else if (!rating && index === 0) return tabIndex ?? 0;
			else if (rating === index + 1) return tabIndex ?? 0;
			return -1;
		};

		const constructRating = (rating: number) => {
			const updatedArray = ratingArray.map(
				(r: JSX.Element, i: number) => {
					return (
						<span
							className={cn(styles.star, {
								[styles.filled]: i < rating,
								[styles.editable]: isEditable,
								[styles.error]: error,
							})}
							onMouseEnter={() => changeDisplay(i + 1)}
							onMouseLeave={() => changeDisplay(rating)}
							onClick={() => onClick(i + 1)}
							tabIndex={computeFocus(rating, i)}
							onKeyDown={handleKey}
							ref={(r) => ratingArrayRef.current?.push(r)}
							role={isEditable ? "slider" : ""}
							aria-invalid={error ? true : false}
							aria-valuenow={rating}
							aria-valuemax={5}
							aria-label={
								isEditable
									? "укажите рейтинг стрелками вверх или вниз"
									: "рейтинг" + rating
							}
							aria-valuemin={1}>
							<StarIcon />
						</span>
					);
				},
			);
			setRatingArray(updatedArray);
		};

		const changeDisplay = (rating: number) => {
			if (!isEditable) return;

			constructRating(rating);
		};

		const onClick = (rating: number) => {
			if (!isEditable || !setRating) return;

			setRating(rating);
		};

		const handleKey = (e: React.KeyboardEvent<HTMLSpanElement>) => {
			if (!isEditable || !setRating) return;

			if (e.code === "ArrowRight" || e.code === "ArrowUp") {
				if (!rating) {
					setRating(1);
				} else {
					e.preventDefault();
					setRating(rating < 5 ? rating + 1 : 5);
				}

				ratingArrayRef.current[rating]?.focus();
			} else if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};

		return (
			<div {...props} ref={ref} className={styles.ratingWrapper}>
				{ratingArray.map((r, i) => (
					<span key={i} className={styles.rating}>
						{r}
					</span>
				))}
				{error && (
					<span className={styles.errorMessage} role="alert">
						{error.message}
					</span>
				)}
			</div>
		);
	},
);
