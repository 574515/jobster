import {FC, useEffect, useState} from "react";

import userLocaleAtom from "../../atoms/userLocaleAtom.ts";

import {Tag, Text, Tooltip, VStack} from "@chakra-ui/react";
import {format, formatDistanceToNow} from "date-fns";
import {CONVERTED_LOCALES, TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {useRecoilValue} from "recoil";
import {CustomDateTagProps} from "../../models/interfaces.ts";
import {enGB} from "date-fns/locale/en-GB";

const CustomDateTag: FC<CustomDateTagProps> = (
	{dateToShow, title}
) => {
	const [toolTipOpen, setToolTipOpen] = useState<boolean>(false);
	const userLocale = useRecoilValue<string>(userLocaleAtom);
	const [formattedDate, setFormattedDate] = useState<string>("");
	const [distanceDate, setDistanceDate] = useState<string>("");

	useEffect(() => setFormattedDate(format(dateToShow, TIME_FORMATS[userLocale])), [dateToShow, userLocale]);
	useEffect(() => {
		const formattedDistance = formatDistanceToNow(dateToShow, {
			addSuffix: true,
			locale: CONVERTED_LOCALES[userLocale] || enGB,
		});
		const capitalizedDistance = formattedDistance.charAt(0).toUpperCase() + formattedDistance.slice(1);
		setDistanceDate(capitalizedDistance);
	}, [dateToShow, userLocale]);

	return (
		<Tooltip label={distanceDate} isOpen={toolTipOpen}>
			<VStack w={"100%"}>
				<Text className={"prevent-select"} color={"gray.400"}>
					{title}
				</Text>
				<Tag
					className={"prevent-select"}
					size={'lg'}
					w={"100%"}
					justifyContent={"center"}
					variant='outline'
					colorScheme={"green"}
					color={"gray.400"}
					onClick={() => setToolTipOpen(!toolTipOpen)}
					onMouseEnter={() => setToolTipOpen(true)}
					onMouseLeave={() => setToolTipOpen(false)}
				>
					{formattedDate}
				</Tag>
			</VStack>
		</Tooltip>
	);
}

export default CustomDateTag;