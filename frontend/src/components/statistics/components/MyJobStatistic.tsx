import {FC, useEffect, useState} from "react";

import darkModeAtom from "../../../atoms/darkModeAtom.ts";
import CustomLegend from "./CustomLegend.tsx";

import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps} from "recharts"
import {Box} from "@chakra-ui/react";
import {CustomPayload, StatDataType} from "../../../models/helperTypes.ts";
import {MyJobStatisticProps} from "../../../models/interfaces.ts";
import {useRecoilValue} from "recoil";

import '../../../styles/componentStyle.css'
import {Payload} from "recharts/types/component/DefaultLegendContent";
import {useTranslation} from "react-i18next";
import isPhoneAtom from "../../../atoms/isPhoneAtom.ts";

const MyJobStatistic: FC<MyJobStatisticProps> = (
	{allMyJobs}
) => {
	const isPhone = useRecoilValue(isPhoneAtom);
	const [jobData, setJobData] = useState<StatDataType[]>([]);
	const isDarkMode = useRecoilValue<boolean>(darkModeAtom);
	const {t} = useTranslation();

	useEffect(() => {
		setJobData(Object.values(
			allMyJobs.reduce<Record<string, StatDataType>>((acc, item) => {
				const label = t(`filters.${item.status.label}`);
				if (!acc[label]) acc[label] = {name: label, value: 0, fill: item.status.color};
				acc[label].value += 1;
				return acc;
			}, {}))
		);
	}, [allMyJobs, t]);

	const total = jobData.reduce((sum, data) => sum + data.value, 0);

	const renderCustomTooltip = ({active, payload}: TooltipProps<number, string>) => {
		if (active && payload && payload.length) {
			const data = payload[0];
			if (data.value) {
				const percentage = ((data.value / total) * 100).toFixed(2); // Calculate percentage
				return (
					<div className={`customTooltip ${isDarkMode ? 'customTooltipDark' : 'customTooltipLight'}`}>
						<p>{`${percentage}% (${data.value})`}</p>
					</div>
				);
			}
		}
		return null;
	};

	return (<Box width="100%" height="calc(33vh)">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart width={730} height={250}>
					<Pie
						data={jobData}
						dataKey="value"
						nameKey="name"
						label={isPhone ? undefined : (e) => e.name}
						outerRadius={"60%"}
						isAnimationActive={false}
						blendStroke={true}
						onFocus={(e) => e.target?.blur()}
					>
						{jobData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={entry.fill}
								onFocus={(e) => e.target?.blur()}
							/>
						))}
					</Pie>
					<Tooltip content={renderCustomTooltip}/>
					<Legend
						layout={isPhone ? "horizontal" : "vertical"}
						align={isPhone ? "center" : "right"}
						verticalAlign={isPhone ? "top" : "middle"}
						content={({payload}: { payload?: Payload[] }) => {
							const customPayload = payload as CustomPayload[];
							return customPayload && customPayload.length > 0 ? (
								<CustomLegend payload={customPayload}/>
							) : null;
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</Box>

	);
}

export default MyJobStatistic;