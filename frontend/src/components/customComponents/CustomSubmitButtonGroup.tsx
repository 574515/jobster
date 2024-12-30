import {FC} from "react";

import loadingAtom from "../../atoms/loadingAtom.ts";

import {ButtonGroup} from "@chakra-ui/react";
import {ResetButton, SubmitButton} from "react-hook-form-chakra";
import {useRecoilValue} from "recoil";
import {useTranslation} from "react-i18next";
import {CustomSubmitButtonGroupProps} from "../../models/interfaces.ts";

const CustomSubmitButtonGroup: FC<CustomSubmitButtonGroupProps> = (
	{resetMethod}
) => {
	const isLoading = useRecoilValue<boolean>(loadingAtom);
	const {t} = useTranslation();

	return (
		<ButtonGroup my={2} w={"100%"}>
			<SubmitButton
				isLoading={isLoading}
				loadingText={t("addPanels.Submitting")}
				width="full"
				colorScheme={"green"}
				variant={"outline"}
			>
				{t("addPanels.Save")}
			</SubmitButton>
			<ResetButton
				isLoading={isLoading}
				width="full"
				onClick={resetMethod}
				colorScheme={"red"}
				variant={"outline"}
			>
				{t("addPanels.Reset")}
			</ResetButton>
		</ButtonGroup>
	);
}

export default CustomSubmitButtonGroup;