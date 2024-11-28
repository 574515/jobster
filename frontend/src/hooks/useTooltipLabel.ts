import React from "react";
import {differenceInCalendarDays, format, isToday} from "date-fns";

const useTooltipLabel = (
	date: Date | undefined,
) => {
	const [tooltipLabel, setTooltipLabel] = React.useState<string>();

	React.useEffect(() => {
		if (date) {
			const today = new Date();
			const dateIsToday = isToday(date);
			const diffDays = differenceInCalendarDays(date, today);
			const dayOfWeek = format(date, 'EEEE');
			let relativeTime;
			if (dateIsToday) relativeTime = 'Today';
			else if (diffDays > 0) relativeTime = `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
			else relativeTime = `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
			if (dateIsToday) setTooltipLabel(`[${relativeTime} - ${dayOfWeek}]`);
			else setTooltipLabel(`${relativeTime} [${dayOfWeek}]`);
		}
	}, [date]);

	return tooltipLabel;
};

export default useTooltipLabel;
