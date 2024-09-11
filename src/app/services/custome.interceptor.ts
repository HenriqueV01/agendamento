import { HttpInterceptorFn } from '@angular/common/http';

export const customeInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('loginToken');
  console.log("token " + token);
  const newCloneRequest = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(newCloneRequest);
};
