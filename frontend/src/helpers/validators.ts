import * as Yup from "yup";
import i18n from 'i18next';
import {Constants} from "./constants.ts";
import {yupResolver} from "@hookform/resolvers/yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const passwordMessage = () => i18n.t("validators.passwordStrength");

export const LoginValidationSchema = yupResolver(Yup.object({
	username: Yup.string()
		.required(() => i18n.t("validators.isRequired", {prop: i18n.t("authentication.Username")}))
		.min(
			Constants.MIN_LENGTH_USERNAME,
			() => i18n.t("validators.minUsername", {count: Constants.MIN_LENGTH_USERNAME})
		)
		.max(
			Constants.MAX_LENGTH_USERNAME,
			() => i18n.t("validators.maxUsername", {count: Constants.MAX_LENGTH_USERNAME})
		),
	password: Yup.string()
		.required(() => i18n.t("validators.isRequired", {prop: i18n.t("authentication.Password")}))
}));

export const RegisterValidationSchema = yupResolver(Yup.object({
	username: Yup.string()
		.required(() => i18n.t("validators.isRequired", {prop: i18n.t("authentication.Username")}))
		.min(
			Constants.MIN_LENGTH_USERNAME,
			() => i18n.t('validators.minUsername', {count: Constants.MIN_LENGTH_USERNAME})
		)
		.max(
			Constants.MAX_LENGTH_USERNAME,
			() => i18n.t("validators.maxUsername", {count: Constants.MAX_LENGTH_USERNAME})
		),
	password: Yup.string()
		.required(() => i18n.t("validators.isRequired", {prop: i18n.t("authentication.Password")}))
		.min(
			Constants.MIN_LENGTH_USERNAME,
			() => i18n.t('validators.minPassword', {count: Constants.MIN_LENGTH_USERNAME})
		)
		.matches(passwordRules, passwordMessage),
	repeatPassword: Yup.string()
		.required(() => i18n.t("validators.isRequired", {prop: i18n.t("authentication.Password")}))
		.min(
			Constants.MIN_LENGTH_USERNAME,
			() => i18n.t('validators.minPassword', {count: Constants.MIN_LENGTH_USERNAME})
		)
		.matches(passwordRules, passwordMessage)
		.oneOf(
			[Yup.ref('password')],
			() => i18n.t("validators.matchPassword")
		),
}));

export const MyJobValidationSchema = yupResolver(Yup.object({
	company: Yup.string()
		.min(
			Constants.MIN_LENGTH_COMPANY_NAME,
			() => i18n.t("validators.minCompany", {count: Constants.MIN_LENGTH_COMPANY_NAME})
		)
		.max(
			Constants.MAX_LENGTH_COMPANY_NAME,
			() => i18n.t("validators.maxCompany", {count: Constants.MAX_LENGTH_COMPANY_NAME})
		)
		.required(),
	jobTitle: Yup.string()
		.min(
			Constants.MIN_LENGTH_JOB_NAME,
			() => i18n.t("validators.minJob", {count: Constants.MIN_LENGTH_JOB_NAME})
		)
		.max(
			Constants.MIN_LENGTH_JOB_NAME,
			() => i18n.t("validators.maxJob", {count: Constants.MAX_LENGTH_JOB_NAME})
		)
		.required(),
	description: Yup.string(),
	category: Yup.array().of(
		Yup.object({
			value: Yup.string(),
			label: Yup.string(),
		})).max(
		Constants.MAX_CATEGORIES,
		() => i18n.t("validators.maxCats", {count: Constants.MAX_CATEGORIES})
	),
	note: Yup.string(),
	jobLink: Yup.string(),
	status: Yup.object({
		value: Yup.string().required(),
		label: Yup.string().required(),
		color: Yup.string().required(),
	}).required(),
	dateApplied: Yup.date().required(),
	closingDate: Yup.date(),
}));

export const NoteValidationSchema = yupResolver(Yup.object({
	note: Yup.string()
		.max(
			Constants.MAX_LENGTH_NOTE,
			() => i18n.t("validators.maxNote", {count: Constants.MAX_LENGTH_NOTE})
		),
}));

export const MyConnectionValidationSchema = yupResolver(Yup.object({
	company: Yup.string()
		.min(
			Constants.MIN_LENGTH_COMPANY_NAME,
			() => i18n.t("validators.minCompany", {count: Constants.MIN_LENGTH_COMPANY_NAME})
		)
		.max(
			Constants.MAX_LENGTH_COMPANY_NAME,
			() => i18n.t("validators.maxCompany", {count: Constants.MAX_LENGTH_COMPANY_NAME})
		)
		.required(),
	jobLink: Yup.string(),
	dateSent: Yup.date(),
}));

export const MyToApplyValidationSchema = yupResolver(Yup.object({
	company: Yup.string()
		.min(
			Constants.MIN_LENGTH_COMPANY_NAME,
			() => i18n.t("validators.minCompany", {count: Constants.MIN_LENGTH_COMPANY_NAME})
		)
		.max(
			Constants.MAX_LENGTH_COMPANY_NAME,
			() => i18n.t("validators.maxCompany", {count: Constants.MAX_LENGTH_COMPANY_NAME})
		),
	jobTitle: Yup.string()
		.min(
			Constants.MIN_LENGTH_JOB_NAME,
			() => i18n.t("validators.minJob", {count: Constants.MIN_LENGTH_JOB_NAME})
		)
		.max(
			Constants.MIN_LENGTH_JOB_NAME,
			() => i18n.t("validators.maxJob", {count: Constants.MAX_LENGTH_JOB_NAME})
		),
	jobLink: Yup.string().required(),
	closingDateMFA: Yup.date(),
}));