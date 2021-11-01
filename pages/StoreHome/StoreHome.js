Page({
  data: {
    recibido: [
      { id: 0, desc: 'Churrasco \nx1\nHamburguesa \nx2\nLimonada \nx1' },
      { id: 1, desc: 'Torta de Chocolate\nx3\nCoca-Cola \nx2\nGranizado \nx1' },
    ],
    curso: [
      { id: 0, desc: 'Coca-Cola \nx3\nJugo \nx1\nArepa de huevo \nx1' },
      { id: 1, desc: 'Torta de Zanahoria\nx1\nLimonada \nx2\nSandwich Vegetariano \nx1' },
    ]
  },
  onLoad() {
    let codigoUsuario = my.getStorageSync({
      key: "codigoUsuario"
    })
    this.setData({
      codigoUsuario: codigoUsuario.data
    })
    this.traerVerificacion()
    this.traerProceso()
  },
  group(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  },
  traerVerificacion() {
    my.request({
      url: `https://api-sabanadelivery.herokuapp.com/DetalleCompra/pedidosEnVerificacion`,
      headers: {},
      method: 'POST',
      data: { codigoUsuario: this.data.codigoUsuario },
      timeout: 30000,
      dataType: '',
      success: (result) => {
        this.setData({
          recibido: Object.values(this.group(result.data, "codigoCompra"))
        })
      },
      fail: () => {
        this.setData({
          error: 'Error getting orders'
        })
      },
      complete: () => {

      }
    })
  },
  inProcess(e){
    let id = e.currentTarget.dataset.id
    my.request({
      url: `https://api-sabanadelivery.herokuapp.com/Compra/actualizar`,
      headers: {},
      method: 'POST',
      data: { codigo: id, estado: 'En Proceso'},
      timeout: 30000,
      dataType: '',
      success: (result) => {
        my.alert({
          title: 'Completado!',
          content: 'Orden marcada como en proceso',
          buttonText: 'Ok',
          success: (result) => {
            this.traerVerificacion()
            this.traerProceso()
          },
        });
      },
      fail: () => {
        this.setData({
          error: 'Error getting orders'
        })
      },
      complete: () => {

      }
    })
  },
  cancelled(e){
    let id = e.currentTarget.dataset.id
    my.request({
      url: `https://api-sabanadelivery.herokuapp.com/Compra/actualizar`,
      headers: {},
      method: 'POST',
      data: { codigo: id, estado: 'Cancelado'},
      timeout: 30000,
      dataType: '',
      success: (result) => {
        my.alert({
          title: 'Completado!',
          content: 'Orden marcada como cancelada',
          buttonText: 'Ok',
          success: (result) => {
            this.traerVerificacion()
            this.traerProceso()
          },
        });
      },
      fail: () => {
        this.setData({
          error: 'Error getting orders'
        })
      },
      complete: () => {

      }
    })
  },
  finished(e){
    let id = e.currentTarget.dataset.id
    my.request({
      url: `https://api-sabanadelivery.herokuapp.com/Compra/actualizar`,
      headers: {},
      method: 'POST',
      data: { codigo: id, estado: 'Finalizado'},
      timeout: 30000,
      dataType: '',
      success: (result) => {
        my.alert({
          title: 'Completado!',
          content: 'Orden marcada como finalizada',
          buttonText: 'Ok',
          success: (result) => {
            this.traerVerificacion()
            this.traerProceso()
          },
        });
      },
      fail: () => {
        this.setData({
          error: 'Error getting orders'
        })
      },
      complete: () => {

      }
    })
  },
  traerProceso() {
    my.request({
      url: `https://api-sabanadelivery.herokuapp.com/DetalleCompra/pedidosEnProceso`,
      headers: {},
      method: 'POST',
      data: { codigoUsuario: this.data.codigoUsuario },
      timeout: 30000,
      dataType: '',
      success: (result) => {
        this.setData({
          curso: Object.values(this.group(result.data, "codigoCompra"))
        })
      },
      fail: () => {
        this.setData({
          error: 'Error getting orders'
        })
      },
      complete: () => {

      }
    })
  }
});
