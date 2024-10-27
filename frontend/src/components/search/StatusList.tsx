import React, {useEffect} from 'react';
import {StatusListProps} from "../../models/interfaces.ts";
import {Checkbox, Flex, Text} from "@chakra-ui/react";
import {StatusSelectType} from "../../models/componentsTypes.ts";

const StatusList: React.FC<StatusListProps> = (
	{jobListings, checkedStates, setCheckedStates}
) => {
	const statusCount: Record<string, StatusSelectType> = jobListings.reduce(
		(acc: Record<string, StatusSelectType>, job) => {
			const {value, label, color} = job.status;
			if (!acc[value]) {
				acc[value] = {label, color, count: 0, value};
			}
			acc[value].count += 1;
			return acc;
		},
		{}
	);

	useEffect(() => {
		setCheckedStates(() => Object.keys(statusCount).reduce(
			(acc: Record<string, boolean>, key: string) => {
				acc[key] = true;
				return acc;
			},
			{}
		));
		// TODO: Better?
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jobListings]);

	const allChecked = Object.keys(statusCount).every((key) => checkedStates[key]);

	const handleFlexClick = (value: string) => {
		setCheckedStates((prevState) => ({
			...prevState,
			[value]: !prevState[value],
		}));
	};

	const handleAllToggle = () => {
		setCheckedStates((prevState) => {
			return Object.keys(statusCount).reduce((acc, key) => {
				acc[key] = !prevState[key];
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
					onChange={(e) => e.stopPropagation()}
				>
					All
				</Checkbox>
			</Flex>
			{Object.values(statusCount).map((jobListingStatus: StatusSelectType, index: number) => (
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
					onClick={() => handleFlexClick(jobListingStatus.value)}
					className={"make-pointer"}
				>
					<Checkbox
						id={jobListingStatus.value}
						isChecked={checkedStates[jobListingStatus.value] || false}
						onChange={(e) => e.stopPropagation()}
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
