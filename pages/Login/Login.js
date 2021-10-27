Page({
  data: {
    clave: '',
    telefono: '',
    error: ''
  },
  onLoad() {
    my.removeStorageSync({
      key: 'codigoUsuario'
    });
  },
  redirectToRegister() {
    my.redirectTo({
      url: '/pages/Register/Register'
    })
  },
  redirectToHome() {
    if (this.data.clave && this.data.telefono) {
      if (this.data.telefono[0, 1, 2] === "0") {
        var codigo = this.data.telefono.replace("0", "");
        my.request({
          url: `https://api-sabanadelivery.herokuapp.com/PerfilTienda/login`,
          headers: {},
          method: 'POST',
          data: { clave: this.data.clave, telefono: codigo },
          timeout: 30000,
          dataType: 'JSON',
          success: (result) => {
            if (result.data[0]) {
              my.setStorageSync({
                key: 'codigoUsuario',
                data: result.data[0].codigo
              });
              my.redirectTo({
                url: '/pages/StoreHome/StoreHome'
              })
            } else {
              my.alert({ title: 'Oops', content: "Credenciales incorrectas" });
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
      } else {
        my.request({
          url: `https://api-sabanadelivery.herokuapp.com/PerfilUsuario/verificar`,
          headers: {},
          method: 'POST',
          data: { clave: this.data.clave, telefono: this.data.telefono },
          timeout: 30000,
          dataType: 'JSON',
          success: (result) => {
            if (result.data[0]) {
              my.setStorageSync({
                key: 'codigoUsuario',
                data: result.data[0].codigo
              });
              my.redirectTo({
                url: '/pages/Home/Home'
              })
            } else {
              my.alert({ title: 'Oops', content: "Credenciales incorrectas" });
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
