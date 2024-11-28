import React from "react";

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
import isPhoneAtom from "../../atoms/isPhoneAtom.ts";

const CustomDeleteAlert: React.FC<CustomDeleteAlertProps> = (
	{isDeleteOpen, onDeleteClose, cancelRef, item, handleDelete, type}
) => {
	const isPhone = useRecoilValue(isPhoneAtom);
	return (
		<AlertDialog
			isOpen={isDeleteOpen}
			onClose={onDeleteClose}
			leastDestructiveRef={cancelRef}
			size={{base: "xs", md: "lg"}}
			isCentered={isPhone}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						Delete {type ?? ''}
						<br/>
						{item.company && <Text>[{item.company}]</Text>}
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
	);
}

export default CustomDeleteAlert;