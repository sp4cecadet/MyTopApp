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
import { IndexPageComponent } from "../page-components/IndexPageComponent/IndexPageComponent";

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(0);

	return (
		<>
			<IndexPageComponent />
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
