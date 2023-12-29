import Swal from 'sweetalert2'

const swal = {
  error: (title: string) => {
    return Swal.fire({
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  },
  success: (title: string) => {
    return Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  },
  warning: (title: string, timer: boolean = false) => {
    return Swal.fire({
      icon: 'warning',
      title: title,
      showConfirmButton: true,
      timer: timer ? 2000 : undefined
    })
  },
  confirm: (title: string) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chấp nhận',
      cancelButtonText: 'Hủy'
    })
  }
}

export default swal
