import * as Yup from "yup";
import {Constants} from "./constants.ts";
import {yupResolver} from "@hookform/resolvers/yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const passwordMessage = "Password is not strong enough.";

export const LoginValidationSchema = yupResolver(Yup.object({
	username: Yup.string()
		.required("Username is required")
		.min(Constants.MIN_LENGTH_USERNAME, `Username has to be at least ${Constants.MIN_LENGTH_USERNAME} characters`)
		.max(Constants.MAX_LENGTH_USERNAME, `Username can not be over ${Constants.MAX_LENGTH_USERNAME} characters`),
	password: Yup.string()
		.required("Password is required")
}));

export const RegisterValidationSchema = yupResolver(Yup.object({
	username: Yup.string()
		.required("Username is required")
		.min(Constants.MIN_LENGTH_USERNAME, `Username has to be at least ${Constants.MIN_LENGTH_USERNAME} characters`)
		.max(Constants.MAX_LENGTH_USERNAME, `Username can not be over ${Constants.MAX_LENGTH_USERNAME} characters`),
	password: Yup.string()
		.required("Password is required")
		.min(Constants.PASSWORD_MIN_LENGTH, `Password has to be at least ${Constants.PASSWORD_MIN_LENGTH} characters`)
		.matches(passwordRules, passwordMessage),
	repeatPassword: Yup.string()
		.required("Password is required")
		.min(Constants.PASSWORD_MIN_LENGTH, `Password has to be at least ${Constants.PASSWORD_MIN_LENGTH} characters`)
		.matches(passwordRules, passwordMessage)
		.oneOf([Yup.ref('password')], 'Passwords must match'),
}));

export const NewJobValidationSchema = yupResolver(Yup.object({
	company: Yup.string()
		.min(Constants.MIN_LENGTH_COMPANY_NAME, `Company name has to be at least ${Constants.MIN_LENGTH_COMPANY_NAME} characters`)
		.max(Constants.MAX_LENGTH_COMPANY_NAME, `Company name can not be more than ${Constants.MAX_LENGTH_COMPANY_NAME} characters`)
		.required(),
	jobTitle: Yup.string()
		.min(Constants.MIN_LENGTH_JOB_NAME, `Job title has to be at least ${Constants.MIN_LENGTH_JOB_NAME} characters`)
		.max(Constants.MAX_LENGTH_JOB_NAME, `Job title can not be more than ${Constants.MAX_LENGTH_JOB_NAME} characters`)
		.required(),
	description: Yup.string(),
	category: Yup
		.object({
			value: Yup.string(),
			label: Yup.string(),
		}),
	jobLink: Yup.string(),
	status: Yup.object({
		value: Yup.string().required(),
		label: Yup.string().required(),
		color: Yup.string().required(),
	}).required(),
	dateApplied: Yup.date().required(),
	closingDate: Yup.date(),
}));

export const NewConnectionValidationSchema = yupResolver(Yup.object({
	company: Yup.string()
		.min(Constants.MIN_LENGTH_COMPANY_NAME, `Company name has to be at least ${Constants.MIN_LENGTH_COMPANY_NAME} characters`)
		.max(Constants.MAX_LENGTH_COMPANY_NAME, `Company name can not be more than ${Constants.MIN_LENGTH_COMPANY_NAME} characters`)
		.required(),
	jobLink: Yup.string(),
	dateSent: Yup.date(),
}));