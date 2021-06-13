import React, { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    fontSize?: 's' | 'm' | 'l';
    children: React.ReactNode;
}