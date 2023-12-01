import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs/operators';
@Injectable({
 providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
 constructor(private authService: AuthenticationService, private router: Router) {
}
canLoad() {
  if (this.authService.loadToken() != null) {
    this.router.navigateByUrl('/inventory');
    return false;
  }
  return true;
}
}

// import { Injectable } from '@angular/core';
// import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AutoLoginGuard implements CanLoad {
//   canLoad(
//     route: Route,
//     segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
// }
