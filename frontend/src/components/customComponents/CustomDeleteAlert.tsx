import React, {useEffect} from "react";

import isPhoneAtom from "../../atoms/isPhoneAtom.ts";

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	ButtonGroup,
	Text
} from "@chakra-ui/react";
import {CustomDeleteAlertProps} from "../../models/interfaces.ts";
import {useRecoilValue} from "recoil";
import {Trans, useTranslation} from "react-i18next";
import {MyTrackerNames} from "../../helpers/enums.ts";

import "../../styles/style.css"

const CustomDeleteAlert: React.FC<CustomDeleteAlertProps> = (
	{isDeleteOpen, onDeleteClose, cancelRef, item, handleDelete, type}
) => {
	const [typeMessage, setTypeMessage] = React.useState<string>();
	const isPhone = useRecoilValue(isPhoneAtom);
	const {t} = useTranslation();

	useEffect(() => {
		switch (type) {
			case MyTrackerNames.JOB: {
				setTypeMessage(t("myJobs.type"));
				break;
			}
			case MyTrackerNames.CONNECTION: {
				setTypeMessage(t("myConnections.type"));
				break;
			}
			case MyTrackerNames.APPLICATION: {
				setTypeMessage(t("myFutureApplications.type"));
				break;
			}
			default: {
				setTypeMessage("");
				break;
			}
		}
	}, [t, type]);

	return (
		<AlertDialog
			isOpen={isDeleteOpen}
			onClose={onDeleteClose}
			leastDestructiveRef={cancelRef}
			size={{base: "xs", md: "lg"}}
			isCentered={isPhone}
		>
			<AlertDialogOverlay>
				<AlertDialogContent className={"prevent-select"}>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						{t("components.Delete")} {type}
						<br/>
						{item.company && <Text>[{item.company}]</Text>}
					</AlertDialogHeader>
					<AlertDialogBody>
						<Trans
							i18nKey={"components.deleteMessage"}
							components={{
								strong: <b/>,
								italic: <i/>,
								br: <br/>,
							}}
							values={{type: typeMessage}}
						/>
					</AlertDialogBody>
					<AlertDialogFooter>
						<ButtonGroup gap={2}>
							<Button variant={"outline"} onClick={handleDelete} colorScheme='red'>
								{t("components.Delete")}
							</Button>
							<Button variant={"outline"} onClick={onDeleteClose} ref={cancelRef}>
								{t("components.Cancel")}
							</Button>
						</ButtonGroup>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
}

export default CustomDeleteAlert;