Page({
  data: {
    clave: '',
    telefono: '',
  },
  onLoad() { },
  redirectToRegister() {
      my.redirectTo({
        url: '/pages/Register/Register'
      })
  },
  redirectToHome() {
    if (this.data.clave && this.data.telefono) {
      my.request({
        url: `http://192.168.20.22:4700/PerfilUsuario/verificar`,
        headers: {},
        method: 'GET',
        data: { clave: this.data.clave, telefono: this.data.telefono },
        timeout: 30000,
        dataType: '',
        success: (result) => {
          if (result)
          var resultado = result;
          my.alert({ title: 'Oops', content: resultado});
          if (!isEmpyObject(resultado)){
            my.redirectTo({
              url: '/pages/Home/Home'
            })
          } else {
            my.alert({ title: 'Oops', content: 'Error al iniciar sesión'});
          }
        },
        fail: () => {
          this.setData({
            error: 'Ha ocurrido un error'
          })
        },
        complete: () => {

        }
      });
    }
    else {
      my.alert({ title: 'Oops', content: 'Por favor completa todos los campos' });
    }
  },
  updateInfo(e) {
    this.setData({
      ...this.data,
      [e.target.dataset.id]: e.detail.value
    })
  }
});
