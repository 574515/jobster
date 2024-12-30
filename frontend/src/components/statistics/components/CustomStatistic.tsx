import {FC, useState} from "react";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps} from "recharts";
import {Box} from "@chakra-ui/react";
import moment from "moment";
import {Payload} from "recharts/types/component/DefaultLegendContent";
import CustomLegend from "./CustomLegend.tsx";
import {MyCustomStatisticProps} from "../../../models/interfaces.ts";
import {
	DefaultStringKeyNumberModel,
	MyConnectionResponseModel,
	MyConnectionResponseModelStatistic,
	MyFutureApplicationResponseModel
} from "../../../models/types.ts";
import {CustomPayload, StatDataType} from "../../../models/helperTypes.ts";
import {useTranslation} from "react-i18next";
import {useRecoilValue} from "recoil";
import isPhoneAtom from "../../../atoms/isPhoneAtom.ts";
import darkModeAtom from "../../../atoms/darkModeAtom.ts";

const CustomStatistic: FC<MyCustomStatisticProps> = ({myConnectionData, myFutureApplicationData}) => {
	const isPhone = useRecoilValue(isPhoneAtom);
	const [view, setView] = useState<string>("months");
	const [filteredData, setFilteredData] = useState<MyConnectionResponseModelStatistic[] | null>(null);
	const isDarkMode = useRecoilValue<boolean>(darkModeAtom);
	const {t} = useTranslation();
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

	const getMonthData = () => {
		const months: DefaultStringKeyNumberModel = {};
		if (myConnectionData) {
			myConnectionData.forEach((item: MyConnectionResponseModel) => {
				const month = t(`statistics.${moment(item.dateSent).format("MMMM")}`);
				months[month] = (months[month] || 0) + 1;
			});
		}
		if (myFutureApplicationData) {
			myFutureApplicationData.forEach((item: MyFutureApplicationResponseModel) => {
				const month = t(`statistics.${moment(item.closingDateMFA).format("MMMM")}`);
				months[month] = (months[month] || 0) + 1;
			});
		}
		return Object.keys(months).map((key, index) => ({
			name: key,
			value: months[key],
			color: COLORS[index % COLORS.length]
		})) ?? [];
	};

	const getCompanyData = (month: string) => {
		if (myConnectionData)
			return myConnectionData
				.filter(item => moment(item.dateSent).format("MMMM") === month)
				.map((item, index) => ({
					name: item.company,
					value: 1,
					color: COLORS[index % COLORS.length],
					link: item.jobLink,
					date: item.dateSent,
				}));
		if (myFutureApplicationData)
			return myFutureApplicationData
				.filter(item => moment(item.closingDateMFA).format("MMMM") === month)
				.map((item, index) => ({
					name: item.company,
					value: 1,
					color: COLORS[index % COLORS.length],
					link: item.jobLink,
					date: item.closingDateMFA,
				}));
		return null;
	};

	const handlePieClick = (data: StatDataType) => {
		if (view === "months") {
			const details = getCompanyData(data.name);
			setFilteredData(details);
			setView("details");
		} else {
			setView("months");
			setFilteredData(null);
		}
	};

	const data = view === "months"
		? getMonthData().map((item) => ({
			...item,
			displayName: item.name,
		}))
		: (filteredData ?? []).map((item) => ({
			...item,
			displayName: item.name ? item.name : item.link,
		}));

	const renderCustomTooltip = ({active, payload}: TooltipProps<number, string>) => {
		if (active && payload && payload.length) {
			console.log(payload);
			const data = payload[0];
			if (data.value) {
				return (
					<div className={`customTooltip ${isDarkMode ? 'customTooltipDark' : 'customTooltipLight'}`}>
						<p>{`${data.name}`}</p>
					</div>
				);
			}
		}
		return null;
	};

	return (
		<Box width={"100%"} height={"calc(33vh)"}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart width={730} height={250}>
					<Pie
						data={data}
						dataKey="value"
						nameKey={"displayName"}
						outerRadius={"60%"}
						fill="#8884d8"
						onClick={(entry) => handlePieClick(entry)}
						isAnimationActive={false}
						blendStroke={true}
						onFocus={(e) => e.target?.blur()}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={entry.color}
								onFocus={(e) => e.target?.blur()}
							/>
						))}
					</Pie>
					{!isPhone && <Tooltip content={renderCustomTooltip}/>}
					<Legend
						layout={isPhone ? "horizontal" : "vertical"}
						align={isPhone ? "center" : "right"}
						verticalAlign={isPhone ? "top" : "middle"}
						content={({payload}: { payload?: Payload[] }) => {
							const customPayload = payload as CustomPayload[];
							return (customPayload && customPayload.length > 0) ?
								<CustomLegend payload={customPayload}/> :
								null;
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</Box>
	);
}

export default CustomStatistic;