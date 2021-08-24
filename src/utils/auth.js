export const checkStatusAuth = (AAA, user) => {
  if(!AAA.token){
    return '/dang-nhap/'
  }else {
    if(user && !user.phone) {
      return '/auth/update/'
      // return '/auth/update/'
    }else {
      if(user && AAA && !AAA.center_id){
        return '/auth/select_center/'
      }
    }
  }
};
