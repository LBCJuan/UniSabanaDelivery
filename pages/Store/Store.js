Page({
  data: {
    searchBarInput: '',
    store_items: [1,2,3,4,5,6,7,8,9,10]
  },
  onLoad() {},
  onTap(){
    console.log('clicked!')
  },
  onChange(e){
    this.setData({
      searchBarInput: e.detail.value
    })
    console.log(this.data.searchBarInput)
  },
  redirectToHome(){
    my.redirectTo({
      url: '/pages/Home/Home'
    });
  }
});
