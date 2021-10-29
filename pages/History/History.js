Page({
  data: {
    items: [1,2,3,4,5]
  },
  onLoad() {
    my.request({
      url: `https://api-sabanadelivery.herokuapp.com/DetalleCompra/historialPedidos?codigoUsuario=${my.getStorageSync({ key: 'codigoUsuario' }).data}`,
      headers: {},
      method: 'GET',
      data: {},
      timeout: 30000,
      dataType: '',
      success: (result) => {
        this.setData({
          items: Object.values(this.group(result.data, 'codigoCompra')),
          error: result.data.length > 0 ? '' : 'No hay compras por el momento.'
        })
      },
      fail: () => {
        this.setData({
          error: 'Error getting history'
        })
      },
      complete: () => {
        
      }
    });
  },
  group(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  },
  redirectToHome(e){
    my.redirectTo({
      url: '/pages/Home/Home',
    });
  },
  redirectToHistory(){
    my.redirectTo({
      url: '/pages/History/History'
    })
  }
});
