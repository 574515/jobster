import swal, {SweetAlertIcon} from 'sweetalert2';

export const toast = (
	title: string,
	icon: SweetAlertIcon,
	timer = 3000,
	showCloseButton = false,
	html?: string
) => {
	return swal.fire({
		title, icon, timer, showCloseButton, html,
		toast: true,
		position: 'top-right',
		timerProgressBar: true,
		showConfirmButton: false,
	});
};
