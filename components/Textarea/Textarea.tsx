import { TextareaProps } from "./Textarea.props";
import styles from "./Textarea.module.css";
import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

export const Textarea = forwardRef(
	(
		{ className, error, ...props }: TextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>,
	): JSX.Element => {
		return (
			<div className={cn(styles.textAreaWrapper, className)}>
				<textarea
					className={cn(styles.textArea, {
						[styles.error]: error,
					})}
					ref={ref}
					{...props}
				/>
				{error && (
					<span className={styles.errorMessage} role="alert">
						{error.message}
					</span>
				)}
			</div>
		);
	},
);
