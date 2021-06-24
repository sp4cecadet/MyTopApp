import { GetStaticProps } from "next";
import React, { useState } from "react";
import {
	HTag,
	Button,
	Paragraph,
	Tag,
	Rating,
	Input,
	Textarea,
} from "../components/";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(0);

	return (
		<>
			<HTag tag="h1">Hello</HTag>
			<Button appearance="primary" arrow="right">
				Button
			</Button>
			<Button appearance="ghost" arrow="down">
				Button
			</Button>
			<Paragraph>Hello</Paragraph>
			<Tag color="red" href="#">
				Hmmm
			</Tag>
			<Tag color="green" href="#">
				Hmmm
			</Tag>
			<Tag color="gray" href="#">
				Hmmm
			</Tag>
			<Rating rating={rating} isEditable={true} setRating={setRating} />
			<Input placeholder="Hafanana" />
			<Textarea placeholder="Lula-la-la" />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory,
	});

	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
