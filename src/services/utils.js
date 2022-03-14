import Swal from 'sweetalert2'

export async function fireSwal(
  action,
  title = 'در صورت حذف قابل بازیابی نمی باشد',
  button = { confirm: 'تایید', cancel: 'لغو' },
) {
  Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonText: button.confirm,
    cancelButtonText: button.cancel,
  }).then(async (result) => {
    if (result.isConfirmed) {
      action()
    }
  })
}
