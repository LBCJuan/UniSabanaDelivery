Page({
  data: {
    items: [1,2,3,4,5]
  },
  onLoad() {},
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
