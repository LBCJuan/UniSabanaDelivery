Page({
  data: {
    clave: '',
    telefono: '',
    error: '',
    nombre: ''
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
        data: { clave: "clave1234", telefono: "3187951218" },
        timeout: 30000,
        dataType: '',
        success: (result) => {
          this.setData({
            nombre: result.data,
            error: result.data.length > 0 ? '' : 'Lo sentimos, no se pudo iniciar sesión'
          })

          my.alert({ title: 'Oops', content: result});

          if (result.data) {
            my.redirectTo({
              url: '/pages/Home/Home'
            })
          } else {
            my.alert({ title: 'Oops', content: error });
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
