import React from 'react';

import AuthContext from "../context/AuthContext.tsx";
import authScreenAtom from "../atoms/authScreenAtom.ts";
import CustomColorModeSwitch from "./customComponents/CustomColorModeSwitch.tsx";
import CustomFormProvider from "./customComponents/CustomFormProvider.tsx";
import CustomLanguageSwitcher from "./customComponents/CustomLanguageSwitcher.tsx";

import {toast} from "../helpers/customToast.ts";
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Heading,
	HStack,
	InputLeftElement,
	InputRightElement,
	Link,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import {useSetRecoilState} from 'recoil';
import {useForm} from "react-hook-form";
import {RegisterValidationSchema} from "../helpers/validators.ts";
import {forbiddenUsernames, getDefaultValues} from "../helpers/constants.ts";
import {InputControl, SubmitButton} from "react-hook-form-chakra";
import {FaCircleUser, FaLock} from "react-icons/fa6";
import {AuthContextType, SignupValuesType} from "../models/types.ts";
import {useTranslation} from "react-i18next";

import '../styles/style.css'

const SignupCard = () => {
	const [signUpInputs, setSignUpInputs] = React.useState<SignupValuesType>({
		username: "",
		password: "",
		repeatPassword: "",
	});
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [showRepeatPassword, setShowRepeatPassword] = React.useState<boolean>(false);
	const setAuthScreen = useSetRecoilState<string>(authScreenAtom);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
	const registerUser = authContext ? authContext.registerUser : undefined;
	const methods = useForm({
		resolver: RegisterValidationSchema, ...getDefaultValues("signup"),
		mode: "onChange"
	});
	const {colorMode} = useColorMode();
	const {t} = useTranslation();

	const isUsernameForbidden = () => {
		return forbiddenUsernames.includes(signUpInputs.username);
	}

	const handleSignup = async (data: SignupValuesType) => {
		if (isUsernameForbidden()) {
			void toast(`${t("username")} ${signUpInputs.username} ${t("notAllowedUsername")}`, "warning");
			return;
		}
		setIsLoading(true);
		if (registerUser) {
			await registerUser(data)
				.catch((error) => console.log(error))
				.finally(() => setIsLoading(false));
		}
	};

	return (
		<CustomFormProvider formProviderData={methods}>
			<VStack
				as="form"
				onSubmit={methods.handleSubmit(handleSignup)}
				align="center"
				spacing={5}
			>
				<Flex align={'center'} justify={'center'} minHeight={"100vh"}>
					<Stack
						spacing={8}
						mx={'auto'}
						w={{base: "sm", md: "xl"}}
						py={12}
						px={6}
					>
						<Box
							rounded={'lg'}
							bg={useColorModeValue('rgba(184, 184, 184, .6)', 'rgba(0, 0, 0, .6)')}
							boxShadow={'lg'}
							py={8}
							px={12}
						>
							<Stack align={'center'} mb={12}>
								<Heading className="prevent-select" fontSize={'4xl'} textAlign="center">
									{t("authentication.SignUp")}
								</Heading>
							</Stack>
							<Stack spacing={4} className={`custom-inputs-${colorMode}`}>
								<VStack alignItems={
									(methods.formState.errors.password ||
										methods.formState.errors.repeatPassword) ? 'center' :
										"end"
								} w={"full"}>
									<InputControl
										inputProps={{autoFocus: true}}
										className="prevent-select"
										name="username"
										label={t("authentication.Username")}
										isRequired
										sx={{boxShadow: "none"}}
										leftElement={
											<InputLeftElement pointerEvents='none'>
												<FaCircleUser/>
											</InputLeftElement>
										}
										onChange={
											({target}: React.ChangeEvent<HTMLInputElement>) =>
												setSignUpInputs({...signUpInputs, username: target.value})
										}
									/>
									{/* TODO: Check if onKeyUp is needed and QoL */}
									<InputControl
										className="prevent-select"
										name="password"
										label={t("authentication.Password")}
										isRequired
										sx={{boxShadow: "none"}}
										inputProps={{type: showPassword ? 'text' : 'password'}}
										onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
											const currentPassword = methods.getValues("password");
											if (currentPassword) {
												const passwordWithoutWS = currentPassword.replace(/\s/g, '');
												if (e.key === " ")
													methods.setValue("password", passwordWithoutWS);
											}
										}}
										leftElement={
											<InputLeftElement pointerEvents='none'>
												<FaLock/>
											</InputLeftElement>
										}
										rightElement={
											<InputRightElement
												className="make-pointer"
												onClick={() => setShowPassword((showPassword) => !showPassword)}
											>
												{showPassword ? <ViewIcon/> : <ViewOffIcon/>}
											</InputRightElement>
										}
										onChange={
											({target}: React.ChangeEvent<HTMLInputElement>) =>
												setSignUpInputs({...signUpInputs, password: target.value})
										}
									/>
									<InputControl
										className="prevent-select"
										name="repeatPassword"
										label={t("authentication.RepeatPassword")}
										isRequired
										sx={{boxShadow: "none"}}
										inputProps={{
											type: showRepeatPassword ? 'text' : 'password'
										}}
										leftElement={
											<InputLeftElement pointerEvents='none'>
												<FaLock/>
											</InputLeftElement>
										}
										rightElement={
											<InputRightElement
												className="make-pointer"
												onClick={() => setShowRepeatPassword((showRepeatPassword) => !showRepeatPassword)}
											>
												{showRepeatPassword ? <ViewIcon/> : <ViewOffIcon/>}
											</InputRightElement>
										}
										onChange={
											({target}: React.ChangeEvent<HTMLInputElement>) =>
												setSignUpInputs({...signUpInputs, repeatPassword: target.value})
										}
									/>
								</VStack>
								<HStack spacing={5} w={"100%"} my={2}>
									<SubmitButton
										isLoading={isLoading}
										loadingText={t("authentication.Submitting")}
										width="100%"
										margin={"auto"}
									>{t("authentication.SignUp")}</SubmitButton>
									<CustomColorModeSwitch/>
									<CustomLanguageSwitcher/>
								</HStack>
								<Text align={'center'} className="prevent-select">
									{t("authentication.haveAccount")}&nbsp;<Link
									onClick={() => setAuthScreen('login')}>
									{t("authentication.LogIn")}!
								</Link>
								</Text>
							</Stack>
						</Box>
					</Stack>
				</Flex>
			</VStack>
		</CustomFormProvider>
	);
}

export default SignupCard;