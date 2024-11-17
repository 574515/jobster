import React from "react";

import userLocaleAtom from "../../atoms/userLocaleAtom.ts"
import useDeleteItem from "../../hooks/useDeleteItem.ts";
import AddEditNote from "../AddEditNote.tsx";
import CustomAddNoteIcon from "./CustomAddNoteIcon.tsx";

import {CustomConnectionCardProps} from "../../models/interfaces.ts";
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
	useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon, LinkIcon} from "@chakra-ui/icons";
import {useRecoilValue} from "recoil";
import {ConnectionActions} from "../AppActions.action.ts";
import {format} from "date-fns";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {ConstantItemNames} from "../../helpers/enums.ts";

const CustomConnectionCard: React.FC<CustomConnectionCardProps> = (
	{item, getAllItems}
) => {
	const userLocale = useRecoilValue(userLocaleAtom);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);
	const [customColor, setCustomColor] = React.useState<string>("#00b300");
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
		{getAllItems, item, deleteAction: ConnectionActions.deleteMyConnection}
	);

	const getTag = () => {
		if (item.dateSent)
			return format(item.dateSent, TIME_FORMATS[userLocale]);
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
							Connected
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
				<CardBody pt={6} pb={4}>
					<Heading
						size='md'
						textAlign={"center"}
						mt={2}
						wordBreak={"break-all"}
					>
						{item.company}
					</Heading>
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
							Delete Job Connection Tracker
							<br/>
							[{item.company}]
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
				identifier={ConstantItemNames.MY_CONNECTIONS}
			/>
		</React.Fragment>
	);
}

export default CustomConnectionCard;