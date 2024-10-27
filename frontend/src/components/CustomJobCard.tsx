import React, {useEffect} from "react";
import {CustomJobCardProps} from "../models/interfaces.ts";
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
	Heading,
	HStack,
	Link,
	Tag,
	Text,
	Textarea,
	useDisclosure,
	VStack
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, LinkIcon} from "@chakra-ui/icons";
import {jobInstance} from "../api/axiosInstances.ts";
import '../styles/componentStyle.css';
import {format} from "date-fns";
import {useRecoilValue} from "recoil";
import userLocaleAtom from "../atoms/userLocaleAtom.ts";
import {TIME_FORMATS} from "../helpers/dateLocales.ts";


const CustomJobCard: React.FC<CustomJobCardProps> = (
	{userJob, setIsLoading, getAllListings}
) => {
	const {isOpen, onOpen, onClose} = useDisclosure()
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

	useEffect(() => {
		setTagShadow(`inset 0 0 0px 1px ${userJob.status.color}`);
	}, [userJob.status.color]);

	const handleDelete = async () => {
		setIsLoading(true);
		await jobInstance
			.delete(`/listing/${userJob._id}`)
			.then(() => getAllListings())
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}

	const handleLinkOpen = () => window.open(userJob.jobLink, '_blank');

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
							color={userJob.status.color}
							shadow={tagShadow}
						>
							{userJob.status.label}
						</Tag>
						<HStack>
							<EditIcon
								color={"blue.200"}
								className={"make-pointer"}
								// TODO: Edit
							/>
							<DeleteIcon
								color={"red.200"}
								onClick={onOpen}
								className={"make-pointer"}
							/>
							<LinkIcon
								color={"gray.200"}
								onClick={handleLinkOpen}
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
								{format(userJob.closingDate, TIME_FORMATS[userLocale])}
							</Tag>
						</VStack>
					</HStack>
				</CardFooter>
			</Card>
			<AlertDialog
				isOpen={isOpen}
				onClose={onClose}
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
								<Button variant={"outline"} onClick={onClose} ref={cancelRef}>
									Cancel
								</Button>
							</ButtonGroup>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</React.Fragment>
	);
}

export default CustomJobCard;