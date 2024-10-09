type ThemePropsBody = {
	color: string;
	bg: string;
}

export type ThemeProps = {
	body: ThemePropsBody;
}

export type LoginValues = {
	username: string;
	password: string;
}

export type SignupValues = {
	username: string;
	password: string;
	repeatPassword: string;
	email: string;
};

export type CustomColorModeIcon = {
	fontSize: string;
	onClick: () => void;
	className: string;
	me: string;
}