import {FieldValues, FormProvider} from "react-hook-form";
import {CustomFormProviderProps} from "../models/interfaces.ts";

const CustomFormProvider = <T extends FieldValues>(
	{children, formProviderData}: CustomFormProviderProps<T>
) => {
	return <FormProvider
		watch={formProviderData.watch}
		getValues={formProviderData.getValues}
		getFieldState={formProviderData.getFieldState}
		setError={formProviderData.setError}
		clearErrors={formProviderData.clearErrors}
		setValue={formProviderData.setValue}
		trigger={formProviderData.trigger}
		formState={formProviderData.formState}
		resetField={formProviderData.resetField}
		reset={formProviderData.reset}
		handleSubmit={formProviderData.handleSubmit}
		unregister={formProviderData.unregister}
		control={formProviderData.control}
		register={formProviderData.register}
		setFocus={formProviderData.setFocus}
	>
		{children}
	</FormProvider>
}

export default CustomFormProvider;

