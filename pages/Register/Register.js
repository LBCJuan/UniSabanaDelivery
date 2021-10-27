Page({
  data: {
    clave: '',
    telefono: '',
    nombre: ''
  },
  onLoad() {

  },
  registrarse() {
    if (this.data.clave && this.data.telefono && this.data.nombre) {
      my.request({
        url: `https://api-sabanadelivery.herokuapp.com/PerfilUsuario/registrar`,
        headers: {},
        method: 'POST',
        data: { clave: this.data.clave, telefono: this.data.telefono, nombre: this.data.nombre },
        timeout: 30000,
        dataType: 'JSON',
        success: (result) => {
          if(result.data.errno){
            my.alert({ title: 'Oops', content: 'Ese numero ya esta en uso' })
          }
          else{
            my.redirectTo({
            url: '/pages/Login/Login'
          })
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
})