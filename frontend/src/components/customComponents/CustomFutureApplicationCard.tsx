import React from "react";

import userLocaleAtom from "../../atoms/userLocaleAtom.ts";
import useDeleteItem from "../../hooks/useDeleteItem.ts";
import AddEditNote from "../AddEditNote.tsx";
import CustomAddNoteIcon from "./CustomAddNoteIcon.tsx";

import {CustomFutureApplicationCardProps} from "../../models/interfaces.ts";
import {useRecoilValue} from "recoil";
import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	HStack,
	Tag,
	Text,
	Textarea,
	Tooltip,
	useDisclosure,
	VStack
} from "@chakra-ui/react";
import {format} from "date-fns";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {DeleteIcon, LinkIcon} from "@chakra-ui/icons";
import {ToApplyActions} from "../AppActions.action.ts";
import {ConstantItemNames} from "../../helpers/enums.ts";
import CustomDeleteAlert from "./CustomDeleteAlert.tsx";
import useNoteBoxHeight from "../../hooks/useNoteBoxHeight.ts";
import useTooltipLabel from "../../hooks/useTooltipLabel.ts";

const CustomFutureApplicationCard: React.FC<CustomFutureApplicationCardProps> = (
	{getAllItems, item}
) => {
	const userLocale = useRecoilValue(userLocaleAtom);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);
	const [customColor, setCustomColor] = React.useState<string>("#ADD8E6");
	const {
		isOpen: isAddEditNoteOpen,
		onOpen: onAddEditNoteOpen,
		onClose: onAddEditNoteClose,
	} = useDisclosure();

	React.useEffect(() => {
		if (!customColor) setCustomColor("#FFFFFF");
	}, [customColor]);

	const handleLinkOpen = () => window.open(item.jobLink, '_blank');

	const {handleDelete} = useDeleteItem(
		{getAllItems, item, deleteAction: ToApplyActions.deleteMyToApply}
	);

	const [closingDateMFATooltipOpen, setClosingDateMFATooltipOpen] = React.useState<boolean>(false);
	const closingDateMFATooltipLabel = useTooltipLabel(item.closingDateMFA);

	const getTag = () => {
		if (item.closingDateMFA) {
			return (
				<Tooltip
					label={<span>{closingDateMFATooltipLabel}</span>}
					isOpen={closingDateMFATooltipOpen}
				>
					{format(item.closingDateMFA, TIME_FORMATS[userLocale])}
				</Tooltip>
			)

		} else return "";
	}

	const noteBoxHeight = useNoteBoxHeight(item.note);

	return (
		<React.Fragment>
			<Card colorScheme={"red"}>
				<CardHeader pb={2}>
					<HStack justifyContent={"space-between"}>
						<Tag
							className={"prevent-select"}
							size={'lg'}
							w={"50%"}
							justifyContent={"center"}
							variant='outline'
							color={customColor}
							shadow={`inset 0 0 0px 1px ${customColor}`}
						>
							TODO
						</Tag>
						<HStack>
							<CustomAddNoteIcon item={item} onAddEditNoteOpen={onAddEditNoteOpen}/>
							{item.jobLink && <LinkIcon
                                color={"gray.200"}
                                className={"make-pointer"}
                                onClick={handleLinkOpen}
                            />}
							<DeleteIcon
								color={"red.200"}
								className={"make-pointer"}
								onClick={onOpen}
							/>
						</HStack>
					</HStack>
				</CardHeader>
				<CardBody pt={2} pb={4}>
					<VStack alignItems={"start"} rowGap={0}>
						<Text>{item.company}</Text>
						<Heading size='md' wordBreak={"break-all"}>
							{item.jobTitle}
						</Heading>
					</VStack>
					{item.note && (
						<React.Fragment>
							<Text mt={2}>
								Note
							</Text>
							<Textarea
								readOnly
								mt={3}
								className={"descriptionOutline"}
								maxHeight={"25vh"}
								resize={"none"}
								height={noteBoxHeight}
								value={item.note}
								onClick={() => item.note && onAddEditNoteOpen()}
							/>
						</React.Fragment>
					)}
					<Tag
						className={"prevent-select"}
						size={'lg'}
						w={"100%"}
						justifyContent={"center"}
						variant='outline'
						colorScheme={"green"}
						color={"gray.400"}
						mt={4}
						mb={2}
						onClick={() => setClosingDateMFATooltipOpen(!closingDateMFATooltipOpen)}
						onMouseEnter={() => setClosingDateMFATooltipOpen(true)}
						onMouseLeave={() => setClosingDateMFATooltipOpen(false)}
					>
						{getTag()}
					</Tag>
				</CardBody>
			</Card>
			<CustomDeleteAlert
				isDeleteOpen={isOpen}
				onDeleteClose={onClose}
				item={item}
				handleDelete={handleDelete}
				cancelRef={cancelRef}
				type={"My Future Application Tracker"}
			/>
			<AddEditNote
				isAddEditNoteOpen={isAddEditNoteOpen}
				onAddEditNoteClose={onAddEditNoteClose}
				item={item}
				getAllItems={getAllItems}
				identifier={ConstantItemNames.MY_FUTURE_APPLICATIONS}
			/>
		</React.Fragment>
	);
}

export default CustomFutureApplicationCard;