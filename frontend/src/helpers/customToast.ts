import swal, {SweetAlertIcon} from 'sweetalert2';

export const toast = (title: string, icon: SweetAlertIcon, timer = 3000, showCloseButton = false, html?: string) => {
    return swal.fire({
        title: title,
        icon: icon,
        toast: true,
        timer: timer,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: showCloseButton,
        html: html,
    });
};
