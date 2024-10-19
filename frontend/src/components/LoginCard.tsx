import React from 'react';

import authScreenAtom from '../atoms/authScreenAtom.ts';
import CustomFormProvider from "./CustomFormProvider.tsx";
import useAuth from "../hooks/useAuth.ts";
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
	VStack
} from '@chakra-ui/react';
import {useSetRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {LoginValidationSchema} from "../helpers/validators.js";
import {getDefaultValues} from "../helpers/constants.js";
import {LoginValues} from "../models/componentsTypes.ts";

import '../styles/style.css'
import {InputControl, SubmitButton} from "react-hook-form-chakra";
import {FaLock, FaUser} from "react-icons/fa6";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import CustomColorModeSwitch from "./CustomColorModeSwitch.tsx";

const LoginCard = () => {
	const {loginUser} = useAuth();
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [showPassword, setShowPassword] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const methods = useForm({resolver: LoginValidationSchema, ...getDefaultValues("login"), mode: "onSubmit",});
	const {colorMode} = useColorMode();

	const handleLogin = async (data: LoginValues) => {
		setIsLoading(true);
		if (loginUser)
			await loginUser(data)
				.catch(error => console.log(error))
				.finally(() => setIsLoading(false));
	}

	return (
		<CustomFormProvider formProviderData={methods}>
			<VStack
				as="form"
				onSubmit={methods.handleSubmit(handleLogin)}
				align="center"
				spacing={5}
			>
				<Flex align={'center'} justify={'center'} minHeight={"100vh"}>
					<Stack
						spacing={8}
						mx={'auto'}
						maxW={'lg'}
						py={12}
						px={6}
					>
						<Box
							rounded={'lg'}
							bg={useColorModeValue('rgba(184, 184, 184, .6)', 'rgba(0, 0, 0, .6)')}
							boxShadow={'lg'}
							py={8}
							px={12}
							width={{base: 'full', sm: '400px'}}
						>
							<Stack align={'center'} mb={12}>
								<Heading className="prevent-select" fontSize={'4xl'} textAlign='center'>
									Login
								</Heading>
							</Stack>
							<Stack spacing={4} className={`custom-inputs-${colorMode}`}>
								<InputControl
									inputProps={{autoFocus: true}}
									className="prevent-select"
									name="username"
									label="Username"
									isRequired
									sx={{boxShadow: "none"}}
									leftElement={
										<InputLeftElement pointerEvents='none'>
											<FaUser/>
										</InputLeftElement>
									}
								/>
								<InputControl
									className="prevent-select"
									name="password"
									label="Password"
									isRequired
									inputProps={{type: showPassword ? 'text' : 'password'}}
									leftElement={
										<InputLeftElement pointerEvents='none'>
											<FaLock/>
										</InputLeftElement>
									}
									rightElement={
										<InputRightElement
											className="make-pointer"
											onClick={() => setShowPassword(!showPassword)}
										>{showPassword ? <ViewOffIcon/> : <ViewIcon/>}</InputRightElement>
									}
								/>
								<HStack spacing={5} p={2}>
									<SubmitButton
										isLoading={isLoading}
										loadingText="Submitting..."
										width="75%"
										margin={"auto"}
									>Log in</SubmitButton>
									<CustomColorModeSwitch/>
								</HStack>
								<Text align={'center'} mt={4} mb={2}>
									Don&apos;t have an account?&nbsp;<Link onClick={() => setAuthScreen('signup')}>Sign
									up!</Link>
								</Text>
							</Stack>
						</Box>
					</Stack>
				</Flex>
			</VStack>
		</CustomFormProvider>
	);
}

export default LoginCard;