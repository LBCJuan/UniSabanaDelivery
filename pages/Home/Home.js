Page({
  data: {
    searchBarInput: '',
    store_items: '',
    error: ''
  },
  onLoad() {
    my.request({
      url: 'https://api-sabanadelivery.herokuapp.com/PerfilTienda/buscar',
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
  redirectToHistory(){
    my.redirectTo({
      url: '/pages/History/History'
    })
  },
  redirectToCart(){
    my.redirectTo({
      url: '/pages/Cart/Cart'
    })
  }
});
