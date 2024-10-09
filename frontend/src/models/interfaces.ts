import React from "react";
import {FieldValues, UseFormReturn} from "react-hook-form";

export interface AuthProviderProps {
	children: React.ReactNode;
}

export interface CustomFormProviderProps<T extends FieldValues> {
	children: React.ReactNode;
	formProviderData: UseFormReturn<T>;
}