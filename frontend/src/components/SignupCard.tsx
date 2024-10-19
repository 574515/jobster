import React from 'react';

import CustomFormProvider from "./CustomFormProvider.tsx";
import AuthContext from "../context/AuthContext.tsx";
import authScreenAtom from "../atoms/authScreenAtom.ts";

import {toast} from "../helpers/customToast.ts";
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	Heading,
	HStack,
	InputLeftElement,
	InputRightElement,
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
import {InputControl, ResetButton, SubmitButton} from "react-hook-form-chakra";
import {FaAt, FaCircleUser, FaClipboardUser, FaLock} from "react-icons/fa6";
import {SignupValues} from "../models/componentsTypes.ts";
import {AuthContextType} from "../models/contextTypes.ts";

import '../styles/style.css'

const SignupCard = () => {
	const [signUpInputs, setSignUpInputs] = React.useState<SignupValues>({
		email: "",
		username: "",
		password: "",
		repeatPassword: "",
	});
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [showRepeatPassword, setShowRepeatPassword] = React.useState<boolean>(false);
	const setAuthScreen = useSetRecoilState<string>(authScreenAtom);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [resetDisabled, setResetDisabled] = React.useState<boolean>(true);
	const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
	const registerUser = authContext ? authContext.registerUser : undefined;
	const methods = useForm({
		resolver: RegisterValidationSchema, ...getDefaultValues("signup"),
		mode: "onChange"
	});
	const {colorMode} = useColorMode();

	React.useEffect(() => setResetDisabled(Object.values(signUpInputs).every(value => value === "")), [signUpInputs]);

	const handleReset = () => methods.reset();

	const isUsernameForbidden = () => {
		return forbiddenUsernames.includes(signUpInputs.username);
	}

	const handleSignup = async (data: SignupValues) => {
		if (isUsernameForbidden()) {
			void toast(`Username ${signUpInputs.username} is not allowed.`, "warning");
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
				marginY={10}
			>
				<Flex align={'center'} justify={'center'}>
					<Stack
						spacing={8}
						mx={'auto'}
						maxW={'xxl'}
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
									Sign up
								</Heading>
							</Stack>
							<Stack spacing={4} className={`custom-inputs-${colorMode}`}>
								<HStack>
									<InputControl
										py={4}
										className="prevent-select"
										name="username"
										label="Username"
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
									<InputControl
										className="prevent-select"
										name="email"
										label="Email address"
										isRequired
										inputProps={{
											type: 'email',
										}}
										sx={{boxShadow: "none"}}
										leftElement={
											<InputLeftElement pointerEvents='none'>
												<FaAt/>
											</InputLeftElement>
										}
										onChange={
											({target}: React.ChangeEvent<HTMLInputElement>) =>
												setSignUpInputs({...signUpInputs, email: target.value})
										}
									/>
								</HStack>
								<HStack alignItems={
									(methods.formState.errors.password ||
										methods.formState.errors.repeatPassword) ? 'center' :
										"end"
								} w={"full"}>
									{/* TODO: Check if onKeyUp is needed and QoL */}
									<InputControl
										className="prevent-select"
										name="password"
										label="Password"
										isRequired
										sx={{boxShadow: "none"}}
										inputProps={{
											type: showPassword ? 'text' : 'password',
										}}
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
										label="Repeat Password"
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
								</HStack>
								<Stack spacing={10} pt={2}>
									<ButtonGroup>
										<SubmitButton
											isLoading={isLoading}
											loadingText="Submitting..."
											width="full"
										>Sign Up</SubmitButton>
										<ResetButton
											width="full"
											onClick={handleReset}
											disabled={resetDisabled}
										>Reset</ResetButton>
									</ButtonGroup>
								</Stack>
								<Stack pt={6}>
									<Text align={'center'}
									      className="prevent-select">
										<Button
											rightIcon={<FaClipboardUser/>}
											width="full"
											variant='outline'
											onClick={() => setAuthScreen('login')}
										>Have an account? Log in!</Button>
									</Text>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Flex>
			</VStack>
		</CustomFormProvider>
	);
}

export default SignupCard;