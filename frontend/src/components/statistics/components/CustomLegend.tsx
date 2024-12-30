import {CustomPayload} from "../../../models/helperTypes.ts";

import '../../../styles/componentStyle.css';
import {useTranslation} from "react-i18next";
import {useRecoilValue} from "recoil";
import isPhoneAtom from "../../../atoms/isPhoneAtom.ts";
import {format, parseISO} from "date-fns";
import {TIME_FORMATS} from "../../../helpers/dateLocales.ts";
import userLocaleAtom from "../../../atoms/userLocaleAtom.ts";

const CustomLegend = ({payload}: { payload: CustomPayload[] }) => {
	const {t} = useTranslation();
	const isPhone = useRecoilValue<boolean>(isPhoneAtom);
	const userLocale = useRecoilValue(userLocaleAtom);

	return (
		<ul
			className={`customLegendList${isPhone ? 'Mobile' : ''}`}
		>
			{payload.map(({color, value, payload}: CustomPayload, index: number) => (
				<li
					key={`item-${index}`}
					className="customLegendListItem"
				>
					<div
						style={{
							width: 12,
							height: 12,
							backgroundColor: color,
							marginRight: isPhone ? 4 : 8,
							borderRadius: "50%",
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
