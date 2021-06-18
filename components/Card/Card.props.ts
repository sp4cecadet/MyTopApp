import React, { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CardProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	color?: "white" | "blue";
	children: React.ReactNode;
}
