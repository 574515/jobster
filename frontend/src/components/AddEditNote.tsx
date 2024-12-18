import React from "react";

import loadingAtom from "../atoms/loadingAtom.ts";
import CustomFormProvider from "./customComponents/CustomFormProvider.tsx";
import CustomDeleteAlert from "./customComponents/CustomDeleteAlert.tsx";

import {
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	useDisclosure,
	VStack
} from "@chakra-ui/react";
import {AddNoteProps} from "../models/interfaces.ts";
import {ResetButton, SubmitButton} from "react-hook-form-chakra";
import {ConnectionActions, JobActions, ToApplyActions} from "./AppActions.action.ts";
import {toast} from "../helpers/customToast.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {NoteValidationSchema} from "../helpers/validators.ts";
import {MyJobResponseModel, NoteFormValues} from "../models/types.ts";
import {Constants} from "../helpers/constants.ts";
import {useRecoilState} from "recoil";
import {ConstantItemNames} from "../helpers/enums.ts";

import '../styles/componentStyle.css'
import {useTranslation} from "react-i18next";

const AddEditNote: React.FC<AddNoteProps> = (
	{isAddEditNoteOpen, onAddEditNoteClose, item, getAllItems, identifier}
) => {
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose
	} = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);
	const [numberOfCharacters, setNumberOfCharacters] = React.useState<number>(item.note?.length ?? 0);
	const [isLoading, setIsLoading] = useRecoilState(loadingAtom);

	const jobMethods = useForm<NoteFormValues>({
		resolver: NoteValidationSchema,
		defaultValues: {note: item.note ?? undefined},
		mode: "onChange",
	});
	const {t} = useTranslation();

	const handleReset = () => jobMethods.reset();

	React.useEffect(() => {
		jobMethods.reset({note: item.note ?? ""});
		setNumberOfCharacters(item.note?.length ?? 0);
	}, [item.note, jobMethods]);

	const handleNoteSubmit: SubmitHandler<NoteFormValues> = ({note}) => {
		setIsLoading(true);
		if (identifier === ConstantItemNames.MY_JOBS) {
			JobActions.handleNote(item._id, note)
				.then((data: MyJobResponseModel) => {
					void toast(`${data.jobTitle}${t("addPanels.NoteUpdate", {action: t("addPanels.Updated")})}`, 'success');
					getAllItems();
				})
				.catch((error) => void toast(error.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
		if (identifier === ConstantItemNames.MY_CONNECTIONS) {
			ConnectionActions.handleNote(item._id, note)
				.then(() => {
					void toast(`${item.company}${t("addPanels.NoteUpdate", {action: t("addPanels.Updated")})})}`, 'success');
					getAllItems();
				})
				.catch((error) => void toast(error.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
		if (identifier === ConstantItemNames.MY_FUTURE_APPLICATIONS) {
			ToApplyActions.handleNote(item._id, note)
				.then(() => {
					void toast(`${item.jobLink}${t("addPanels.NoteUpdate", {action: t("addPanels.Updated")})})}`, 'success');
					getAllItems();
				})
				.catch((error) => void toast(error.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
	};

	const handleNoteDelete = () => {
		setIsLoading(true);
		if (identifier === ConstantItemNames.MY_JOBS) {
			JobActions.handleNote(item._id)
				.then((data: MyJobResponseModel) => {
					void toast(`${data.jobTitle}${t("addPanels.NoteUpdate", {action: t("addPanels.Removed")})}`, 'success');
					getAllItems();
				})
				.catch((error) => void toast(error.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
		if (identifier === ConstantItemNames.MY_CONNECTIONS) {
			ConnectionActions.handleNote(item._id)
				.then(() => {
					void toast(`${item.company}${t("addPanels.NoteUpdate", {action: t("addPanels.Removed")})}`, 'success');
					getAllItems();
				})
				.catch((error) => void toast(error.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
		if (identifier === ConstantItemNames.MY_FUTURE_APPLICATIONS) {
			ToApplyActions.handleNote(item._id)
				.then(() => {
					void toast(`${item.jobLink}${t("addPanels.NoteUpdate", {action: t("addPanels.Removed")})}`, 'success');
					getAllItems();
				})
				.catch((error) => void toast(error.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
	}

	return (
		<Modal
			isOpen={isAddEditNoteOpen}
			onClose={onAddEditNoteClose}
			isCentered
			scrollBehavior={"inside"}
			closeOnEsc={true}
			size={{base: "xs", md: "lg"}}
		>
			<ModalOverlay/>
			<ModalContent>
				<ModalHeader alignItems={"center"} justifyContent="center">
					{item.note ? t("components.Note") : t("components.AddNote")}
				</ModalHeader>
				<ModalCloseButton my={2}/>
				<ModalBody pt={2} pb={4} px={4}>
					<CustomFormProvider formProviderData={jobMethods}>
						<VStack as={"form"} onSubmit={jobMethods.handleSubmit(handleNoteSubmit)}>
							<Controller
								control={jobMethods.control}
								name="note"
								render={({field, fieldState: {error}}) => (
									<FormControl py={4} className="prevent-select">
										<FormLabel
											display={"flex"}
											justifyContent={"space-between"}
											mx={0}
											alignItems={"center"}
										>
											<Text>{t("components.Note")}</Text>
										</FormLabel>
										<Textarea
											height={(field.value && item.note) ? "2xs" : "unset"}
											{...field}
											value={field.value}
											onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
												field.onChange(e.target.value);
												setNumberOfCharacters(e.currentTarget.value.length);
											}}
											placeholder={t("components.notePlaceholder")}
										/>
										<HStack justifyContent={"space-between"} mb={4} alignContent={"center"}>
											<Text
												fontStyle={"italic"}
												color={"#FF9999"}
											>{jobMethods.formState.errors.note?.message}</Text>
											<Text
												fontWeight={"light"}
												fontStyle={"italic"}
												color={error ? "#FF9999" : "#FFF"}
											>{numberOfCharacters}/{Constants.MAX_LENGTH_NOTE}</Text>
										</HStack>
										<ButtonGroup my={2} w={"100%"}>
											<SubmitButton
												isLoading={isLoading}
												loadingText={t("authentication.Submitting")}
												width="full"
												colorScheme={"green"}
												variant={"outline"}
												disabled={!!jobMethods.formState.errors.note ||
													!jobMethods.getValues("note")}
											>
												{t("components.Save")}
											</SubmitButton>
											<ResetButton
												isLoading={isLoading}
												width="full"
												onClick={handleReset}
												colorScheme={"yellow"}
												variant={"outline"}
											>
												{t("components.Undo")}
											</ResetButton>
											{item.note && (
												<Button
													isLoading={isLoading}
													width="full"
													onClick={onDeleteOpen}
													colorScheme={"red"}
													variant={"outline"}
													disabled={!item.note}
												>
													{t("components.Delete")}
												</Button>
											)}
										</ButtonGroup>
									</FormControl>
								)}
							/>
						</VStack>
					</CustomFormProvider>
				</ModalBody>
			</ModalContent>
			<CustomDeleteAlert
				isDeleteOpen={isDeleteOpen}
				onDeleteClose={onDeleteClose}
				item={item}
				handleDelete={handleNoteDelete}
				cancelRef={cancelRef}
				type={t("components.Note")}
			/>
		</Modal>
	);
}

export default AddEditNote;