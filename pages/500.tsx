import { withLayout } from "../layout/Layout";
import { HTag } from "../components/HTag/HTag";

export function Error500(): JSX.Element {
	return (
		<>
			<HTag tag="h1">Ошибка 500</HTag>
		</>
	);
}

export default withLayout(Error500);
