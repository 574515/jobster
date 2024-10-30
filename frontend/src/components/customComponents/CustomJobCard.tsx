import React, {useEffect} from "react";
import {CustomJobCardProps} from "../../models/interfaces.ts";
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
	Tag,
	Text,
	Textarea,
	Tooltip,
	useDisclosure,
	VStack
} from "@chakra-ui/react";
import {DeleteIcon, LinkIcon} from "@chakra-ui/icons";
import '../../styles/componentStyle.css';
import {format} from "date-fns";
import {useRecoilValue} from "recoil";
import userLocaleAtom from "../../atoms/userLocaleAtom.ts";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {statusesToSet} from "../../helpers/constants.ts";
import {JobDeletionResponseModel, ModalSelectType} from "../../models/componentsTypes.ts";
import {JobActions} from "../AppActions.action.ts";
import {toast} from "../../helpers/customToast.ts";
import {FaRegNoteSticky} from "react-icons/fa6";


const CustomJobCard: React.FC<CustomJobCardProps> = (
	{userJob, setIsLoading, getAllListings}
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
	const cancelRef = React.useRef<HTMLButtonElement>(null);
	const userLocale = useRecoilValue(userLocaleAtom);
	const [textareaHeight, setTextareaHeight] = React.useState<string>("0vh");
	const [tagShadow, setTagShadow] = React.useState<string>("");

	useEffect(() => {
		const lengthOfDesc = userJob.description?.length;
		if (lengthOfDesc) {
			const lessThan500 = lengthOfDesc <= 500;
			const moreThan500LessThan1000 = lengthOfDesc > 500 && lengthOfDesc <= 1000;
			const moreThan1000 = lengthOfDesc > 1000;
			if (lessThan500) setTextareaHeight("10vh");
			if (moreThan500LessThan1000) setTextareaHeight("20vh");
			if (moreThan1000) setTextareaHeight("25vh");
		}
	}, [userJob.description?.length]);

	useEffect(() => setTagShadow(`inset 0 0 0px 1px ${userJob.status.color}`), [userJob.status.color]);

	const handleDelete = async () => {
		setIsLoading(true);
		await JobActions
			.deleteJobListing(userJob._id)
			.then((response: JobDeletionResponseModel) => {
				void toast(`Job "${response.jobTitle}" Deleted Successfully`, 'success');
				getAllListings();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}

	const handleLinkOpen = () => window.open(userJob.jobLink, '_blank');

	const handleTagChange = (status: ModalSelectType) => {
		if (status.value === userJob.status.value) return undefined;
		setIsLoading(true);
		JobActions
			.changeJobStatus(userJob._id, status)
			.then(() => {
				void toast(`Job "${userJob.jobTitle}" Updated Successfully`, 'success');
				getAllListings();
			})
			.catch((error) => void toast(error.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	}

	const getTagClassName = (status: ModalSelectType) => {
		const className = "prevent-select";
		return status.value === userJob.status.value ? className : `${className} make-pointer`;
	}

	const getTagVariant = (status: ModalSelectType) => {
		return status.value === userJob.status.value ? 'solid' : 'outline';
	}

	const getTagBackground = (status: ModalSelectType) => {
		return status.value === userJob.status.value ? userJob.status.color : undefined;
	}

	const getTagColor = (status: ModalSelectType) => {
		return status.value === userJob.status.value ? "black" : "white";
	}

	const setNoteLabel = () => {
		if (userJob.jobLink)
			return userJob.jobLink;
		else return "Add Note";
	}

	return (
		<React.Fragment>
			<Card maxW='sm' colorScheme={"red"}>
				<CardHeader pb={2}>
					<HStack justifyContent={"space-between"}>
						<Tag
							className={"prevent-select make-pointer"}
							size={'lg'}
							w={"50%"}
							justifyContent={"center"}
							variant='outline'
							color={userJob.status.color}
							shadow={tagShadow}
							onClick={onStatusChangeOpen}
						>
							{userJob.status.label}
						</Tag>
						<HStack>
							<Tooltip
								label={setNoteLabel()}
								hasArrow
							>
								<span>
									<FaRegNoteSticky
										color={"#FEFF9C"}
										className={"make-pointer"}
									/>
									{/*	TODO: New modal for input, tooltip if exists */}
								</span>
							</Tooltip>
							{userJob.jobLink && <LinkIcon
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
					<Text>{userJob.company}</Text>
					<Heading size='md'>
						<Link href={userJob.jobLink}>{userJob.jobTitle}</Link>
					</Heading>
					{userJob.description &&
                        <Textarea
                            readOnly
                            mt={3}
                            className={"descriptionOutline"}
                            maxHeight={"25vh"}
                            resize={"none"}
                            height={textareaHeight}
                            value={userJob.description}
                        />
					}
				</CardBody>
				<CardFooter pt={0}>
					<HStack justifyContent={"space-between"} width={'100%'}>
						<VStack w={"100%"}>
							<Text
								className={"prevent-select"}
								color={"gray.400"}
							>
								Date Applied
							</Text>
							<Tag
								className={"prevent-select"}
								size={'lg'}
								w={"100%"}
								justifyContent={"center"}
								variant='outline'
								colorScheme={"green"}
								color={"gray.400"}
							>

								{format(userJob.dateApplied, TIME_FORMATS[userLocale])}
							</Tag>
						</VStack>
						<VStack w={"100%"}>
							<Text
								className={"prevent-select"}
								color={"gray.400"}
							>
								Closing Date
							</Text>
							<Tag
								className={"prevent-select"}
								size={'lg'}
								w={"100%"}
								justifyContent={"center"}
								variant='outline'
								colorScheme={"red"}
								color={"gray.400"}
							>
								{userJob.closingDate && format(userJob.closingDate, TIME_FORMATS[userLocale])}
							</Tag>
						</VStack>
					</HStack>
				</CardFooter>
			</Card>
			<AlertDialog
				isOpen={isDeleteOpen}
				onClose={onDeleteClose}
				leastDestructiveRef={cancelRef}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Job Application Tracker
							<br/>
							[{userJob.jobTitle}]
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
								<Button variant={"outline"} onClick={onDeleteClose} ref={cancelRef}>
									Cancel
								</Button>
							</ButtonGroup>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
			<Modal
				isOpen={isStatusChangeOpen}
				onClose={onStatusChangeClose}
				isCentered
				scrollBehavior={"inside"}
				closeOnEsc={true}
			>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader alignItems={"center"} justifyContent="center">
						Change Application Status
					</ModalHeader>
					<ModalCloseButton my={2}/>
					<Divider mb={'1rem'}/>
					<ModalBody pt={2} pb={4} px={4}>
						<Grid templateColumns='repeat(2, 1fr)' gap={2} w={"100%"} h={"100%"}>
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
									{status.label}
								</Tag>
							))}
						</Grid>
					</ModalBody>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
}

export default CustomJobCard;