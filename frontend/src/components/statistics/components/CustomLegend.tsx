import {FC} from "react";

import isPhoneAtom from "../../../atoms/isPhoneAtom.ts";
import userLocaleAtom from "../../../atoms/userLocaleAtom.ts";

import {CustomLegendProps} from "../../../models/interfaces.ts";
import {useTranslation} from "react-i18next";
import {CustomPayload} from "../../../models/helperTypes.ts";
import {useRecoilValue} from "recoil";
import {format, parseISO} from "date-fns";
import {TIME_FORMATS} from "../../../helpers/dateLocales.ts";

import '../../../styles/componentStyle.css';

const CustomLegend: FC<CustomLegendProps> = (
	{payload}
) => {
	const {t} = useTranslation();
	const isPhone = useRecoilValue<boolean>(isPhoneAtom);
	const userLocale = useRecoilValue(userLocaleAtom);

	return (
		<ul className={`customLegendList${isPhone ? 'Mobile' : ''}`}>
			{payload.map(({color, value, payload}: CustomPayload, index: number) => (
				<li key={`item-${index}`} className="customLegendListItem">
					<div
						className={"customLegendListItemCircle"}
						style={{
							backgroundColor: color,
							marginRight: isPhone ? 4 : 8,
						}}
					/>
					{payload && payload.date ? (
						<span>{`${format(parseISO(payload.date.toString()), TIME_FORMATS[userLocale])} (${payload?.value})`}</span>
					) : (
						<span>{`${t(value)} (${payload?.value})`}</span>
					)}
				</li>
			))}
		</ul>
	);
};

export default CustomLegend;
