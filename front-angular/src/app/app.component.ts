import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { UserIdleService } from 'angular-user-idle';
import { AlertService } from './_helpers/_alert/alert.service';
import { UserService } from './_services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { Timeout } from './_helpers/_dialog/timeout/timeout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  constructor(
    private translate: TranslateService,
    private router:Router,
    private UserService:UserService,
    private AlertService:AlertService,
    public userIdle: UserIdleService,
    public dialog: MatDialog
    ) 
    {
    translate.setDefaultLang('pl');
    }
  title = 'Wypozyczalnia';
  login = false;
  token = sessionStorage.getItem("token");
  admin = false;

  ngOnInit(){
    this.userIdle.onTimerStart().subscribe(count =>{this.openDialog(count)});
    this.userIdle.onTimeout().subscribe(() => {
    this.logout();
  });
  
    if(this.token){
      this.login=true;
   }

   this.UserService.getThisUser(this.token).subscribe(
    (response:any) => {
        if(response.res == true){
            this.admin = true;
        }
    });



    
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  openDialog(left){
    if(left>0){
    this.dialog.closeAll();
    this.dialog.open(Timeout, {
      width: '250px',
      data: {time: left}
    });
  }
  }

  logout(){
        this.UserService.logout(sessionStorage.getItem("token")).subscribe((data:any) => {
        this.dialog.closeAll();
        sessionStorage.clear();
        this.login = false;
        this.admin=false;
        this.router.navigate(['login']);
        this.AlertService.success(data.resultOfLogging);
        this.userIdle.stopWatching();
    });
  }
}
