import { Component, ViewChild } from '@angular/core';
import { HomeService } from '../_services/home.service';
import { Film } from '../_models/film.model';
import {Wypozyczenia} from '../_models/wypozyczenia.model';
import { AlertService } from '../_helpers/_alert/alert.service';
import { UserService } from '../_services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FilmService } from '../_services/film.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BorrowDialog } from '../_helpers/_dialog/borrow/borrowDialog';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
   
    films: Film[] = [];
    wypozyczenia: Wypozyczenia[] = [];
    film: Film;
    admin = false;
    userId:string;
    selectedFilm;
    columns = ['id', 'tytul', 'gatunek','rezyser','czas_trwania','dostepnosc','ocena_filmu','streszczenie_fabuly','obsada','actions'];
    columnsWypozyczenia =  this.admin ? ['id','daneKlienta','tytul','dataWypozyczenia','dataZwrotu','dataFaktycznegoZwrotu','actions'] : ['id','tytul','dataWypozyczenia','dataZwrotu','dataFaktycznegoZwrotu'] ;
    dataSource: MatTableDataSource<Film>;
    login=false;
    token = sessionStorage.getItem("token");
    @ViewChild(MatSort) sort: MatSort;

    dateFilter = new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl()
      });

    constructor(
        private FilmService:FilmService,
        private UserService:UserService,
        private dialog:MatDialog,
        private AlertService: AlertService,
        private HomeService:HomeService
        ){
            this.dataSource = new MatTableDataSource(this.films);
    };
    

    ngOnInit(){
        if(this.token){
            this.login=true;
         }
         this.UserService.getThisUser(this.token).subscribe(
            (response:any) => {
                if(response.res == true){
                    this.admin = true;
                    this.columnsWypozyczenia = ['id','daneKlienta','tytul','dataWypozyczenia','dataZwrotu','dataFaktycznegoZwrotu','actions'] ;
                }     
                if(response.userId){
                    this.userId = response.userId.$oid;
                }
                this.getBorrows(this.token);          
            });
        this.getFilms();
      
    }

    borrow(id){
        if(!this.admin){
            const data ={
                id: id,
                token: this.token
            };
            this.HomeService.borrowFilm(data).subscribe((response: any) => {
                if(response.success)
                {
                    this.getFilms();
                    this.getBorrows(this.token);        
                    this.AlertService.success(response.result);  
                }
                else
                {
                    this.AlertService.error(response.result);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
    
                }
    
            })
        }
        else
        {
            const dialogRef = this.dialog.open(BorrowDialog,{
                data: {
                  id: id
                }
              });
              dialogRef.afterClosed().subscribe((conf:boolean) =>{
                if(conf){       
                    this.AlertService.success("Wypożyczono film");
                    this.getFilms();
                    this.getBorrows(this.token);   
                }
                
            });
        }
      
    }

    borrowBack(id){
        const data ={
            id: id,
            token: this.token
        };
        this.HomeService.borrowBackFilm(data).subscribe((response: any) => {
            if(response.success)
            {
                this.getFilms();
                this.getBorrows(this.token);        
                this.AlertService.success(response.result);  
            }
            else
            {
                this.AlertService.error(response.result);
                window.scrollTo({ top: 0, behavior: 'smooth' });

            }

        })
    }

    getBorrows(id){
        this.HomeService.getBorrowList(id).subscribe((data:any) =>{
            this.wypozyczenia = data;
            if(this.wypozyczenia.length > 0)
            {
                for(let i = 0;i < this.wypozyczenia.length;i++)
                {
                    this.wypozyczenia[i].dataWypozyczenia.$date.$numberLong = new Date(parseInt(this.wypozyczenia[i].dataWypozyczenia.$date.$numberLong)).toLocaleDateString("pl-PL");
                    this.wypozyczenia[i].dataZwrotu.$date.$numberLong = new Date(parseInt(this.wypozyczenia[i].dataZwrotu.$date.$numberLong)).toLocaleDateString("pl-PL");
                }

            }
        })
    }

    getFilms(){
        this.FilmService.getFilmList().subscribe(data =>
            {   
                this.dataSource = new MatTableDataSource(data.filter(d => d.dostepnosc));
                this.dataSource.sort = this.sort;
                
            }
        )
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); 
        filterValue = filterValue.toLowerCase(); 
        this.dataSource.filter = filterValue;
      }

   
}
