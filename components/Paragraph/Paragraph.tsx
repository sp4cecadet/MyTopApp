import { ParagraphProps } from "./Paragraph.props";
import styles from "./Paragraph.module.css";
import cn from "classnames";

export const Paragraph = ({fontSize = 'm', className, children, ...props}: ParagraphProps): JSX.Element => {
  return (
    <p
		className={cn(styles.p, className, {
			[styles.s]: fontSize == 's',
			[styles.m]: fontSize == 'm',
			[styles.l]: fontSize == 'l',
		})} 
		
		{...props}
	>
        {children}
    </p>
  );
};