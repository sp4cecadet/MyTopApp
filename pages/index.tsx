import React, { useState } from "react";
import { HTag, Button, Paragraph, Tag, Rating } from "../components/";

export default function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(0);

	return (
	<div>
		<HTag tag="h1">Hello</HTag>
		<Button appearance="primary" arrow="right">Button</Button>
		<Button appearance="ghost" arrow="down">Button</Button>
		<Paragraph>Hello</Paragraph>
		<Tag color="red" href="#">Hmmm</Tag>
		<Tag color="green" href="#">Hmmm</Tag>
		<Tag color="gray" href="#">Hmmm</Tag>
		<Rating rating={rating} isEditable={true} setRating={setRating}/>
	</div>
	);
}
