import Swal from "sweetalert2";

const interceptorSuccess = (response) => response

const interceptorErros = (error) => {
  if (error.response) {
    const { status } = error.response

    switch (status) {
      case 401:
        console.log('ERROR 401: UNAUTHORIZED')
        break;

      case 423:
        Swal.fire({
          icon: 'error',
          title: 'USUARIO BLOQUEADO',
          text: 'CUENTA BLOQUEADA. PARA MÁS DETALLES CONTACTE CON EL ADMINISTRADOR',
        });
        break;

      case 406:
        Swal.fire({
          icon: 'error',
          title: 'CREDENCIALES INCORRECTAS',
          text: 'CORREO ELECTRÓNICO O CONTRASEÑA ERRÓNEOS',
        });
        break;

        default:
    }
  }

  console.log('DATOS DE ERRROR', JSON.stringify(error.response.data, null, 2))
  return Promise.reject(error.response)
}

export { interceptorSuccess, interceptorErros }