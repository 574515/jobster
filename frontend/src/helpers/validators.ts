import * as Yup from "yup";
import {PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH} from "./constants.ts";
import {yupResolver} from "@hookform/resolvers/yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const passwordMessage = "Password is not strong enough.";

export const LoginValidationSchema = yupResolver(Yup.object({
	username: Yup.string()
		.required("Username is required")
		.min(USERNAME_MIN_LENGTH, `Username has to be at least ${USERNAME_MIN_LENGTH} characters`)
		.max(USERNAME_MAX_LENGTH, `Username can not be over ${USERNAME_MAX_LENGTH} characters`),
	password: Yup.string()
		.required("Password is required")
}));

export const RegisterValidationSchema = yupResolver(Yup.object({
	username: Yup.string()
		.required("Username is required")
		.min(USERNAME_MIN_LENGTH, `Username has to be at least ${USERNAME_MIN_LENGTH} characters`)
		.max(USERNAME_MAX_LENGTH, `Username can not be over ${USERNAME_MAX_LENGTH} characters`),
	password: Yup.string()
		.required("Password is required")
		.min(PASSWORD_MIN_LENGTH, `Password has to be at least ${PASSWORD_MIN_LENGTH} characters`)
		.matches(passwordRules, passwordMessage),
	repeatPassword: Yup.string()
		.required("Password is required")
		.min(PASSWORD_MIN_LENGTH, `Password has to be at least ${PASSWORD_MIN_LENGTH} characters`)
		.matches(passwordRules, passwordMessage)
		.oneOf([Yup.ref('password')], 'Passwords must match'),
	email: Yup.string()
		.email()
		.required("Email is required"),
}));