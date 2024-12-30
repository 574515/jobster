import {FC, ReactNode, useEffect, useState} from "react";

import {Tooltip} from "@chakra-ui/react";
import {FaNotesMedical, FaNoteSticky} from "react-icons/fa6";
import {CustomAddNoteIconProps} from "../../models/interfaces.ts";
import {CustomIconProps} from "../../models/types.ts";
import {useTranslation} from "react-i18next";

const CustomAddNoteIcon: FC<CustomAddNoteIconProps> = (
	{item, onAddEditNoteOpen}
) => {
	const [customIcon, setCustomIcon] = useState<ReactNode>();
	const [customLabel, setCustomLabel] = useState<string>();
	const {t} = useTranslation();

	useEffect(() => {
		const iconProps: CustomIconProps = {
			color: "#FEFF9C",
			className: "make-pointer",
		}
		if (item.note) {
			setCustomLabel(item.note);
			setCustomIcon(<FaNoteSticky {...iconProps}/>);
		} else {
			setCustomLabel(t("components.AddNote"));
			setCustomIcon(<FaNotesMedical {...iconProps}/>);
		}
	}, [item, t]);

	return (
		<Tooltip label={customLabel} hasArrow>
			<span onClick={onAddEditNoteOpen}>
				{customIcon}
			</span>
		</Tooltip>
	);
}

export default CustomAddNoteIcon;