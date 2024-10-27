import {PacmanLoader} from 'react-spinners';
import React from "react";
import {LoadingOverlayProps} from "../models/interfaces.ts";
import '../styles/componentStyle.css'; // Optional: Add your custom CSS

const LoadingOverlay: React.FC<LoadingOverlayProps> = (
	{isLoading,}
) => {
	if (!isLoading) return null;
	return (
		<div className="overlay">
			<PacmanLoader color="#FFFF00" size={32}/>
		</div>
	);
};

export default LoadingOverlay;
