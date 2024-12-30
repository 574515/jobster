import {FC} from "react";

import loadingAtom from "../atoms/loadingAtom.ts";

import {LoadingOverlayProps} from "../models/interfaces.ts";
import {CircleLoader} from 'react-spinners';
import {useRecoilValue} from "recoil";

import '../styles/componentStyle.css';

const LoadingOverlay: FC<LoadingOverlayProps> = (
	{isApp = false}
) => {
	const isLoading = useRecoilValue(loadingAtom);
	if (!isApp && !isLoading) return null;
	return (
		<div className="overlay">
			<CircleLoader color="#AAAAAA" size={64}/>
		</div>
	);
};

export default LoadingOverlay;
