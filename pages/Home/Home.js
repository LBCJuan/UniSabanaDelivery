Page({
  data: {
    searchBarInput: '',
    store_items: ['Embarcadero', 'Punto sandwich', 'Cafe de la bolsa', 'Kioskos'],
    error: ''
  },
  onLoad() {
    my.request({
      url: 'http://192.168.0.103:4700/PerfilTienda/buscar',
      headers: {},
      method: 'GET',
      data: {},
      timeout: 30000,
      dataType: '',
      success: (result) => {
        this.setData({
          store_items: result.data,
          error: result.data.length > 0 ? '' : 'Lo sentimos, no hay tiendas disponibles por el momento.'
        })
      },
      fail: () => {
        this.setData({
          error: 'Error getting stores'
        })
      },
      complete: () => {
        
      }
    });
  },
  onChange(e){
    this.setData({
      searchBarInput: e.detail.value
    })
  },
  redirectToStore(e){
    my.redirectTo({
      url: `/pages/Store/Store?store=${e.currentTarget.dataset.storeCode}`,
      category: e.currentTarget.id
    });
  },
  redirectToHome(e){
    my.redirectTo({
      url: '/pages/Home/Home',
    });
  },
  redirectToCart(){
    my.redirectTo({
      url: '/pages/Cart/Cart'
    })
  },
  redirectToHistory(){
    my.redirectTo({
      url: '/pages/History/History'
    })
  }
});
