import React from "react";

import homeScreenAtom from "../../atoms/homeScreenAtom.ts";

import {SortByProps} from "../../models/interfaces.ts";
import {FormControl, Select} from "@chakra-ui/react";
import {homeScreenPages, sortByOptions} from "../../helpers/constants.ts";
import {MyConnectionResponseModel, MyJobResponseModel, SortByOptionType} from "../../models/types.ts";
import {useRecoilValue} from "recoil";

const SortBy: React.FC<SortByProps> = (
	{
		allMyJobs, setAllMyJobs,
		allMyConnections, setAllMyConnections,
		allMyFutureApplications, setAllMyFutureApplications,
	}
) => {
	const [sortOptions, setSortOptions] = React.useState<SortByOptionType[]>([]);
	const homeScreenState = useRecoilValue<string>(homeScreenAtom);

	React.useEffect(() => setSortOptions(sortByOptions[homeScreenState]), [homeScreenState]);

	const handleSort = (e: React.BaseSyntheticEvent) => {
		switch (homeScreenState) {
			case homeScreenPages.MY_JOBS: {
				if (allMyJobs && setAllMyJobs) {
					const sortingValue: string = e.target.value;
					let sortBy, order;
					if (sortingValue.includes("Date Applied")) {
						sortBy = 'dateApplied';
						order = sortingValue.includes("Newest") ? 'newest' : 'oldest';
					} else {
						sortBy = 'closingDate';
						order = sortingValue.includes("Later") ? 'later' : 'sooner';
					}
					setAllMyJobs([...allMyJobs].sort(
						(a: MyJobResponseModel, b: MyJobResponseModel) => {
							const dateA: number = new Date(a[sortBy]).getTime();
							const dateB: number = new Date(b[sortBy]).getTime();
							if (order === 'newest' || order === 'later') return dateB - dateA;
							else return dateA - dateB;
						})
					);
				}
				break;
			}
			case homeScreenPages.MY_CONNECTIONS: {
				if (allMyConnections && setAllMyConnections) {
					const sortingValue: string = e.target.value;
					const order = sortingValue.includes("Newest") ? 'newest' : 'oldest';
					setAllMyConnections([...allMyConnections].sort((a: MyConnectionResponseModel, b: MyConnectionResponseModel) => {
						const dateSentA: Date | string | undefined = a["dateSent"];
						const dateSentB: Date | string | undefined = b["dateSent"];
						if (dateSentA && dateSentB) {
							const dateA: number = new Date(dateSentA).getTime();
							const dateB: number = new Date(dateSentB).getTime();
							return order === 'newest' ? dateB - dateA : dateA - dateB;
						}
						return -1;
					}));
				}
				break;
			}
			case homeScreenPages.MY_FUTURE_APPLICATIONS: {
				if (allMyFutureApplications && setAllMyFutureApplications) {
					const sortingValue: string = e.target.value;
					const order = sortingValue.includes("Later") ? 'later' : 'sooner';
					setAllMyFutureApplications([...allMyFutureApplications].sort((a, b) => {
						const closingDateMFAA: Date | string | undefined = a["closingDateMFA"];
						const closingDateMFAB: Date | string | undefined = b["closingDateMFA"];
						if (closingDateMFAA && closingDateMFAB) {
							const dateA: number = new Date(closingDateMFAA).getTime();
							const dateB: number = new Date(closingDateMFAB).getTime();
							return order === 'later' ? dateB - dateA : dateA - dateB;
						}
						return -1;
					}));
				}
				break;
			}
		}
	};

	return (
		<FormControl w={"100%"}>
			<Select onChange={handleSort} textAlign={"center"}>
				{sortOptions.map((option: SortByOptionType, index: number) => {
					const combinedOption = `${option.whatDate} [${option.when}]`;
					return (
						<option defaultValue={index === 0 ? combinedOption : undefined} key={index}>
							{combinedOption}
						</option>
					);
				})}
			</Select>
		</FormControl>
	);
}

export default SortBy;