import React from "react";

import {CircleLoader} from 'react-spinners';
import {LoadingOverlayProps} from "../models/interfaces.ts";

import '../styles/componentStyle.css';

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({isLoading}) => {
	if (!isLoading) return null;
	return (
		<div className="overlay">
			<CircleLoader color="#AAAAAA" size={64}/>
		</div>
	);
};

export default LoadingOverlay;
