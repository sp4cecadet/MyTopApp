import { withLayout } from "../layout/Layout";
import { HTag } from "../components/HTag/HTag";

export function Error404(): JSX.Element {
	return (
		<>
			<HTag tag="h1">Ошибка 404</HTag>
		</>
	);
}

export default withLayout(Error404);
