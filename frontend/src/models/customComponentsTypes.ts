import {GroupBase} from "chakra-react-select";

export type CustomIconProps = {
	color: string;
	className: string;
}

export type CustomColorModeIconType = {
	fontSize: string;
	onClick: () => void;
	className: string;
	me: string;
}

export type AddEditJobNameType =
	"jobLink" |
	"description" |
	"company" |
	"jobTitle" |
	"category" |
	"status" |
	"dateApplied" |
	"closingDate" |
	"category.value" |
	"category.label" |
	"status.value" |
	"status.label" |
	"status.color";

export type AddEditConnectionNameType =
	"jobLink" |
	"company" |
	"dateSent";

export type ModalSelectType = {
	value: string;
	label: string;
	color?: string;
}

export type CategorySelectionModel = {
	value: string;
	label: string;
	color?: string;
}

export type CategorySelectionGroupModel = GroupBase<CategorySelectionModel> & {
	label: string;
	options: CategorySelectionModel[];
	color: string;
}
