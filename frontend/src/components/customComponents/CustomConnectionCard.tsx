import React from "react";

import userLocaleAtom from "../../atoms/userLocaleAtom.ts"
import useDeleteItem from "../../hooks/useDeleteItem.ts";
import AddEditNote from "../AddEditNote.tsx";
import CustomAddNoteIcon from "./CustomAddNoteIcon.tsx";

import {CustomConnectionCardProps} from "../../models/interfaces.ts";
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
	useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon, LinkIcon} from "@chakra-ui/icons";
import {useRecoilValue} from "recoil";
import {ConnectionActions} from "../AppActions.action.ts";
import {ConstantItemNames} from "../../helpers/enums.ts";
import CustomDeleteAlert from "./CustomDeleteAlert.tsx";
import useNoteBoxHeight from "../../hooks/useNoteBoxHeight.ts";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {format} from 'date-fns';
import {useTranslation} from "react-i18next";

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
	const {t} = useTranslation();

	React.useEffect(() => {
		if (!customColor) setCustomColor("#FFFFFF");
	}, [customColor]);

	const handleLinkOpen = () => window.open(item.jobLink, '_blank');

	const {handleDelete} = useDeleteItem(
		{getAllItems, item, deleteAction: ConnectionActions.deleteMyConnection}
	);

	const [dateSentTooltipOpen, setDateSentTooltipOpen] = React.useState<boolean>(false);

	const getTag = () => {
		if (item.dateSent) {
			return (
				<Tooltip isOpen={dateSentTooltipOpen}>
					{format(item.dateSent, TIME_FORMATS[userLocale])}
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
							{t("myConnections.Connected")}
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
					{item.note && (
						<React.Fragment>
							<Text mt={2}>
								{t("myConnections.Note")}
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
						onClick={() => setDateSentTooltipOpen(!dateSentTooltipOpen)}
						onMouseEnter={() => setDateSentTooltipOpen(true)}
						onMouseLeave={() => setDateSentTooltipOpen(false)}
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
				type={t(`myConnections.JobConnectionTracker`)}
			/>
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