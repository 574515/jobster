import React, {ChangeEvent, useEffect} from 'react';

import {StatusListProps} from "../../models/interfaces.ts";
import {Checkbox, Flex, Text} from "@chakra-ui/react";
import {MyJobResponseModel, StatusSelectType} from "../../models/types.ts";

const StatusList: React.FC<StatusListProps> = (
	{jobListings, checkedStatuses, setCheckedStatuses}
) => {
	const statusCount: Record<string, StatusSelectType> = React.useMemo((): Record<string, StatusSelectType> => {
		return jobListings.reduce(
			(acc: Record<string, StatusSelectType>, job: MyJobResponseModel): Record<string, StatusSelectType> => {
				const {value, label, color} = job.status;
				if (!acc[value])
					acc[value] = {label, color, count: 0, value};
				acc[value].count += 1;
				return acc;
			}, {}
		);
	}, [jobListings]);

	useEffect(() => {
		setCheckedStatuses((): Record<string, boolean> => Object.keys(statusCount).reduce(
			(acc: Record<string, boolean>, key: string): Record<string, boolean> => {
				acc[key] = true;
				return acc;
			}, {}
		));
	}, [jobListings, setCheckedStatuses, statusCount]);

	const allChecked: boolean = Object.keys(statusCount).every((key: string): boolean => checkedStatuses[key]);

	const handleFlexClick = (value: string): void => {
		setCheckedStatuses((prevState: Record<string, boolean>) => ({
			...prevState,
			[value]: !prevState[value],
		}));
	};

	const handleAllToggle = (): void => {
		setCheckedStatuses((prevState: Record<string, boolean>): Record<string, boolean> => {
			const allChecked: boolean = Object.values(prevState).every((status: boolean): boolean => status);
			return Object.keys(prevState).reduce(
				(acc: Record<string, boolean>, key: string): Record<string, boolean> => {
					acc[key] = !allChecked;
					return acc;
				}, {} as Record<string, boolean>);
		});
	};

	return (
		<Flex flexDirection={"column"} textAlign={"center"}>
			<Flex
				textAlign={"center"}
				justifyContent={"space-between"}
				alignItems={"center"}
				borderRadius={"0.375rem"}
				bgColor={"gray.700"}
				p={3}
				my={3}
				className={"make-pointer"}
				onClick={handleAllToggle}
			>
				<Checkbox
					isChecked={allChecked}
					onChange={(e: ChangeEvent<HTMLInputElement>): void => e.stopPropagation()}
				>
					All
				</Checkbox>
			</Flex>
			{Object.values(statusCount).map((jobListingStatus: StatusSelectType, index: number): React.ReactNode => (
				<Flex
					textAlign={"center"}
					justifyContent={"space-between"}
					alignItems={"center"}
					color={jobListingStatus.color}
					borderRadius={"0.375rem"}
					bgColor={"gray.700"}
					p={3}
					mb={3}
					key={index}
					onClick={(): void => handleFlexClick(jobListingStatus.value)}
					className={"make-pointer"}
				>
					<Checkbox
						id={jobListingStatus.value}
						isChecked={checkedStatuses[jobListingStatus.value] || false}
						onChange={(): void => handleFlexClick(jobListingStatus.value)}
					>
						{jobListingStatus.label}
					</Checkbox>
					<Text className={"prevent-select"}>{jobListingStatus.count}</Text>
				</Flex>
			))}
		</Flex>
	);
};

export default StatusList;
