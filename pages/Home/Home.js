Page({
  data: {
    searchBarInput: '',
    store_items: ['Embarcadero', 'Punto sandwich', 'Cafe de la bolsa', 'Kioskos']
  },
  onLoad() {},
  onChange(e){
    this.setData({
      searchBarInput: e.detail.value
    })
    console.log(this.data.searchBarInput)
  },
  redirectToStore(e){
    console.log(e.currentTarget.id)
    my.redirectTo({
      url: `/pages/Store/Store?store=${e.currentTarget.id}`,
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
  }
});
