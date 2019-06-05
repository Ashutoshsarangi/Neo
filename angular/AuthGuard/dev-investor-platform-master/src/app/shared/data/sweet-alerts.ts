import Swal from 'sweetalert2';

// Confirm Button Action
export function confirmPopup(title, text, confirmButtonText, cancelButtonText, action: boolean): any {
    return Swal.fire({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#06b4fe',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        reverseButtons: action
    });
}

export function errorPopup(title, text, cancelButtonText): any {
    return Swal.fire({
        title: title,
        text: text,
        type: 'warning',
        cancelButtonText: cancelButtonText
    });
}
