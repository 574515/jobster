import React from "react";
import {CustomPoolCardProps} from "../../models/interfaces.ts";
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
import {format} from "date-fns";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {useRecoilValue} from "recoil";
import userLocaleAtom from "../../atoms/userLocaleAtom.ts";
import {PoolActions} from "../AppActions.action.ts";
import {PoolDeletionResponseModel} from "../../models/componentsTypes.ts";
import {toast} from "../../helpers/customToast.ts";

const CustomPoolCard: React.FC<CustomPoolCardProps> = (
	{userJob, setIsLoading, getAllListings}
) => {
	const userLocale = useRecoilValue(userLocaleAtom);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);
	const [customColor, setCustomColor] = React.useState<string>("#00b300");

	React.useEffect(() => {
		if (!customColor)
			setCustomColor("#FFFFFF");
	}, [customColor]);

	const handleLinkOpen = () => window.open(userJob.jobLink, '_blank');

	const handleDelete = async () => {
		setIsLoading(true);
		await PoolActions
			.deletePoolListing(userJob._id)
			.then((response: PoolDeletionResponseModel) => {
				void toast(`Pool "${response.company}" Deleted Successfully`, 'success');
				getAllListings();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
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
							{userJob.jobLink && <LinkIcon
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
						{userJob.company}
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

						{format(userJob.dateSent, TIME_FORMATS[userLocale])}
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
							Delete Company Pool Tracker
							<br/>
							[{userJob.company}]
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

export default CustomPoolCard;