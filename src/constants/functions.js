import Swal from 'sweetalert2'

export const toastAnyWhere = {
  show: function (message = '', variant = 'success', autoHideDuration = 5000) {
    if (this.display) {
      this.display.show(message, variant, autoHideDuration)
    }
  },
}
export const Toast = {
  show: function (
    message = '',
    variant = 'success',
    autoHideDuration = 5000,
    position = 'top-end',
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
    Toast.fire({
      icon: variant,
      title: message,
    })
  },
}
