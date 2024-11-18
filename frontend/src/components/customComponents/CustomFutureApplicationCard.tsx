import React from "react";

import userLocaleAtom from "../../atoms/userLocaleAtom.ts";
import useDeleteItem from "../../hooks/useDeleteItem.ts";
import AddEditNote from "../AddEditNote.tsx";
import CustomAddNoteIcon from "./CustomAddNoteIcon.tsx";

import {CustomFutureApplicationCardProps} from "../../models/interfaces.ts";
import {useRecoilValue} from "recoil";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardHeader,
	Heading,
	HStack,
	Tag,
	Text,
	useDisclosure,
	VStack
} from "@chakra-ui/react";
import {format} from "date-fns";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {DeleteIcon, LinkIcon} from "@chakra-ui/icons";
import {ToApplyActions} from "../AppActions.action.ts";
import {ConstantItemNames} from "../../helpers/enums.ts";

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

	const getTag = () => {
		if (item.closingDateMFA)
			return format(item.closingDateMFA, TIME_FORMATS[userLocale]);
		else return "";
	}

	return (
		<React.Fragment>
			<Card maxW='sm' colorScheme={"red"}>
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
					>
						{getTag()}
					</Tag>
				</CardBody>
			</Card>
			<AlertDialog
				isOpen={isOpen}
				onClose={onClose}
				leastDestructiveRef={cancelRef}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete My Future Application Tracker
							<br/>
							[{item.jobLink}]
						</AlertDialogHeader>
						<AlertDialogBody>
							Are You sure You want to <span className={"importantText"}>delete</span> it?
							<br/>You can not undo this action afterwards.
						</AlertDialogBody>
						<AlertDialogFooter>
							<ButtonGroup gap={2}>
								<Button variant={"outline"} onClick={handleDelete} colorScheme='red'>
									Delete
								</Button>
								<Button variant={"outline"} onClick={onClose} ref={cancelRef}>
									Cancel
								</Button>
							</ButtonGroup>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
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