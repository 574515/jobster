import {FC, Fragment, useEffect, useRef, useState} from "react";

import loadingAtom from "../../atoms/loadingAtom.ts";
import useDeleteItem from "../../hooks/useDeleteItem.ts";
import useNoteBoxHeight from "../../hooks/useNoteBoxHeight.ts";
import AddEditNote from "../AddEditNote.tsx";
import CustomDeleteAlert from "./CustomDeleteAlert.tsx";
import CustomAddNoteIcon from "./CustomAddNoteIcon.tsx";
import CustomDateTag from "./CustomDateTag.tsx";

import {CustomJobCardProps} from "../../models/interfaces.ts";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Grid,
	Heading,
	HStack,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Show,
	Tag,
	Text,
	Textarea,
	Tooltip,
	useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon, LinkIcon} from "@chakra-ui/icons";
import {useSetRecoilState} from "recoil";
import {statusesToSet} from "../../helpers/constants.ts";
import {JobActions} from "../AppActions.action.ts";
import {toast} from "../../helpers/customToast.ts";
import {ConstantItemNames} from "../../helpers/enums.ts";
import {LabelValueType, ModalSelectType} from "../../models/types.ts";
import {useTranslation} from "react-i18next";

import '../../styles/componentStyle.css';

const CustomJobCard: FC<CustomJobCardProps> = (
	{item, getAllItems}
) => {
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose
	} = useDisclosure();
	const {
		isOpen: isStatusChangeOpen,
		onOpen: onStatusChangeOpen,
		onClose: onStatusChangeClose
	} = useDisclosure();
	const {
		isOpen: isAddEditNoteOpen,
		onOpen: onAddEditNoteOpen,
		onClose: onAddEditNoteClose,
	} = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);
	const [textareaDescHeight, setTextareaDescHeight] = useState<string>("0vh");
	const [tagShadow, setTagShadow] = useState<string>("");
	const setIsLoading = useSetRecoilState<boolean>(loadingAtom);
	const {t} = useTranslation();

	useEffect(() => {
		if (window.innerWidth < 400) {
			if (item.description && item.description.length > 350) setTextareaDescHeight("50vh")
		} else {
			const lengthOfDesc = item.description?.length;
			if (lengthOfDesc) {
				if (lengthOfDesc <= 500) setTextareaDescHeight("10vh");
				if (lengthOfDesc > 500 && lengthOfDesc <= 1000) setTextareaDescHeight("20vh");
				if (lengthOfDesc > 1000) setTextareaDescHeight("25vh");
			}
		}
	}, [item.description, item.note]);

	const textareaNoteHeight = useNoteBoxHeight(item.note);

	useEffect(() => setTagShadow(`inset 0 0 0px 1px ${item.status.color}`), [item.status.color]);

	const {handleDelete} = useDeleteItem({getAllItems, item, deleteAction: JobActions.deleteMyJob});

	const handleLinkOpen = () => window.open(item.jobLink, '_blank');

	const handleTagChange = (status: ModalSelectType) => {
		if (status.value === item.status.value) return;
		setIsLoading(true);
		JobActions
			.changeMyJobStatus(item._id, status)
			.then(() => {
				void toast(`Job "${item.jobTitle}" Updated Successfully`, 'success');
				getAllItems();
			})
			.catch((error) => void toast(error.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	}

	const getTagClassName = (status: ModalSelectType) => {
		const className = "prevent-select";
		return status.value === item.status.value ? className : `${className} make-pointer`;
	}

	const getTagVariant = (status: ModalSelectType) => {
		return status.value === item.status.value ? 'solid' : 'outline';
	}

	const getTagBackground = (status: ModalSelectType) => {
		return status.value === item.status.value ? item.status.color : undefined;
	}

	const getTagColor = (status: ModalSelectType) => {
		return status.value === item.status.value ? "black" : "white";
	}

	const accordionItems: LabelValueType[] = [
		{
			label: "Description",
			value: item.description,
			height: textareaDescHeight,
		},
		{
			label: "Note",
			value: item.note,
			height: textareaNoteHeight,
			onClick: onAddEditNoteOpen,
		},
	];

	const getValue = (): string => {
		if (item.description && item.description.length > 0) return item.description;
		if (item.note && item.note.length > 0) return item.note;
		return '';
	}

	return (
		<Fragment>
			<Card colorScheme={"red"}>
				<CardHeader pb={2}>
					<HStack justifyContent={"space-between"}>
						<Tag
							className={"prevent-select make-pointer"}
							size={'lg'}
							w={"50%"}
							justifyContent={"center"}
							variant='outline'
							color={item.status.color}
							shadow={tagShadow}
							onClick={onStatusChangeOpen}
						>
							{t(`filters.${item.status.label}`)}
						</Tag>
						<HStack>
							<CustomAddNoteIcon item={item} onAddEditNoteOpen={onAddEditNoteOpen}/>
							{item.jobLink && <LinkIcon
                                color={"gray.200"}
                                onClick={handleLinkOpen}
                                className={"make-pointer"}
                            />}
							<DeleteIcon
								color={"red.200"}
								onClick={onDeleteOpen}
								className={"make-pointer"}
							/>
						</HStack>
					</HStack>
				</CardHeader>
				<CardBody py={2}>
					<Text>{item.company}</Text>
					<Heading size='md'>
						<Link href={item.jobLink}>{item.jobTitle}</Link>
					</Heading>
					<Show above={"sm"}>
						{item.description &&
                            <Fragment>
                                <Show below={"md"}>
                                    <Text mt={4}>{t("myJobs.Description")}</Text>
                                </Show>
                                <Textarea
                                    readOnly
                                    mt={3}
                                    className={"descriptionOutline"}
                                    maxHeight={"25vh"}
                                    resize={"none"}
                                    height={textareaDescHeight}
                                    value={item.description}
                                />
                            </Fragment>
						}
					</Show>
					<Show below={"md"}>
						{(item.description && item.note) ?
							(<Accordion allowMultiple defaultIndex={[]} mt={4}>
								{accordionItems.map((accordionItem: LabelValueType, index: number) => {
									const accordionItemLabel = accordionItem.label;
									return (
										<AccordionItem key={index} border={"none"}>
											<AccordionButton
												color={"#aaa"}
												_expanded={{
													color: "#fff"
												}}
												_hover={{
													background: "none",
												}}
											>
												<Box className={"prevent-select"} as='span' flex='1'
												     textAlign='center'>
													{t(`myJobs.${accordionItemLabel}`)}
												</Box>
												<AccordionIcon/>
											</AccordionButton>
											<AccordionPanel pb={4} justifyContent={"center"}>
												<Textarea
													readOnly
													mt={3}
													className={"descriptionOutline"}
													maxHeight={"25vh"}
													resize={"none"}
													height={accordionItem.height}
													value={accordionItem.value}
													onClick={() => accordionItem.onClick && accordionItem.onClick()}
												/>
											</AccordionPanel>
										</AccordionItem>
									)
								})}
							</Accordion>)
							: (item.description || item.note) && (
							<Fragment>
								<Text mt={2}>
									{item.description ? t('myJobs.Description') : t('myJobs.Note')}
								</Text>
								<Textarea
									readOnly
									mt={3}
									className={"descriptionOutline"}
									maxHeight={"25vh"}
									resize={"none"}
									height={item.description ? textareaDescHeight : textareaNoteHeight}
									value={getValue()}
									onClick={() => item.note && onAddEditNoteOpen()}
								/>
							</Fragment>
						)}
					</Show>
					<HStack mb={2} mt={4} width={'100%'}>
						<CustomDateTag
							title={t("filters.Date Applied")}
							dateToShow={item.dateApplied}
						/>
						{item.closingDate &&
                            <CustomDateTag
                                title={t("filters.Closing Date")}
                                dateToShow={item.closingDate}/>}
					</HStack>
				</CardBody>
				{(item?.category && item.category.length > 0) &&
                    <CardFooter gap={2} p={2}
                                bg={"#1b212b"}
                                borderBottomRadius={"0.375rem"}
                                flexWrap={"wrap"}
                                alignItems={"center"}
                    >
						{item.category?.map((cat, index) => (
							<Tag
								key={index}
								className={"prevent-select"}
								size={'md'}
								variant='outline'
								color={cat.color ?? "rgba(254, 178, 178, 0.8)"}
								shadow={`inset 0 0 0px 1px ${cat.color ?? "rgba(254, 178, 178, 0.8)"}`}
							>
								<Tooltip label={t(`categories.${cat.tooltip}`)}>
									{t(`categories.${cat.label}`)}
								</Tooltip>
							</Tag>
						))}
                    </CardFooter>}
			</Card>
			<CustomDeleteAlert
				isDeleteOpen={isDeleteOpen}
				onDeleteClose={onDeleteClose}
				item={item}
				handleDelete={handleDelete}
				cancelRef={cancelRef}
				type={"My Job Application Tracker"}
			/>
			<Modal
				isOpen={isStatusChangeOpen}
				onClose={onStatusChangeClose}
				isCentered
				scrollBehavior={"inside"}
				closeOnEsc={true}
				size={{base: "xs", md: "lg"}}
			>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader alignItems={"center"} justifyContent="center">
						{t("myJobs.ChangeApplicationStatus")}
					</ModalHeader>
					<ModalCloseButton my={2}/>
					<Divider mb={'1rem'}/>
					<ModalBody pt={2} pb={4} px={4}>
						<Grid templateColumns={{base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)'}} gap={2} w={"100%"}
						      h={"100%"}>
							{statusesToSet.map((status: ModalSelectType, index: number) => (
								<Tag
									className={getTagClassName(status)}
									size={'lg'}
									w={"100%"}
									justifyContent={"center"}
									variant={getTagVariant(status)}
									bg={getTagBackground(status)}
									color={getTagColor(status)}
									shadow={`inset 0 0 0px 1px ${status.color}`}
									key={index}
									onClick={() => handleTagChange(status)}
								>
									{t(`filters.${status.label}`)}
								</Tag>
							))}
						</Grid>
					</ModalBody>
				</ModalContent>
			</Modal>
			<AddEditNote
				isAddEditNoteOpen={isAddEditNoteOpen}
				onAddEditNoteClose={onAddEditNoteClose}
				item={item}
				getAllItems={getAllItems}
				identifier={ConstantItemNames.MY_JOBS}
			/>
		</Fragment>
	);
}

export default CustomJobCard;