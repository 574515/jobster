import React from "react";

import {Tooltip} from "@chakra-ui/react";
import {FaNotesMedical, FaNoteSticky} from "react-icons/fa6";
import {CustomAddNoteIconProps} from "../../models/interfaces.ts";
import {CustomIconProps} from "../../models/customComponentsTypes.ts";

const CustomAddNoteIcon: React.FC<CustomAddNoteIconProps> = (
	{item, onAddEditNoteOpen}
) => {
	const [customIcon, setCustomIcon] = React.useState<React.ReactNode>();
	const [customLabel, setCustomLabel] = React.useState<string>();

	React.useEffect(() => {
		const iconProps: CustomIconProps = {
			color: "#FEFF9C",
			className: "make-pointer",
		}
		if (item.note) {
			setCustomLabel(item.note);
			setCustomIcon(<FaNoteSticky {...iconProps}/>);
		} else {
			setCustomLabel("Add Note");
			setCustomIcon(<FaNotesMedical {...iconProps}/>);
		}
	}, [item]);

	return (
		<Tooltip label={customLabel} hasArrow>
			<span onClick={onAddEditNoteOpen}>
				{customIcon}
			</span>
		</Tooltip>
	);
}

export default CustomAddNoteIcon;