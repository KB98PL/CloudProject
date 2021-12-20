import { Component, ViewChild } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AlertService } from "../_helpers/_alert/alert.service";
import { DeleteUserDialog } from "../_helpers/_dialog/deleteUser/deleteUserDialog";
import { PasswordUpdateDialog } from "../_helpers/_dialog/passwordUpdate/passwordUpdateDialog";
import { Film } from "../_models/film.model";
import { User } from "../_models/user.model";
import { UserService } from "../_services/user.service";
import { FilmService } from '../_services/film.service';
import { MatSort } from "@angular/material/sort";
import { FormControl, FormGroup } from "@angular/forms";
import { merge, Observable } from "rxjs";
import { DeleteDialog } from "../_helpers/_dialog/delete/deleteDialog";
import { ignoreElements } from "rxjs/operators";

@Component({ templateUrl: 'adminpanel.component.html' })

export class AdminPanelComponent {
    token = sessionStorage.getItem("token");
    admin = false;
    contentOfDes: string;
    users: User[];
    user: User;
    obsadaF: string;
    selectedUser;
    selectedFilm;
    columns = ['id', 'nick', 'imie','nazwisko','dataRejestracji','adres','telefon','actions'];

    //columnsFilm = ['id', 'tytul', 'gatunek','rezyser','czas_trwania','dostepnosc','ocena_filmu','streszczenie_fabuly','obsada','actions'];
    
    columnsFilm: string[] = [
        'id','tytul', 'gatunek', 'rezyser', 'czas_trwania','dostepnosc', 'actions'
    ];
    dataSource: MatTableDataSource<Film>;
    films: Film[] = [];
    film: Film;
    @ViewChild(MatSort) sort: MatSort;
    form:FormGroup = new FormGroup({
        id: new FormControl(false),
        tytul: new FormControl(false),
        gatunek: new FormControl(false),
        rezyser: new FormControl(false),
        czas_trwania: new FormControl(false),
        ocena_filmu: new FormControl(false),
        dostepnosc: new FormControl(false),
        streszczenie_fabuly: new FormControl(false),
        obsada: new FormControl(false),
        actions: new FormControl(false)
      });
    
      ocena_filmu = this.form.get('ocena_filmu');
      streszczenie_fabuly = this.form.get('streszczenie_fabuly');
      obsada = this.form.get('obsada');
      columnDefinitions = [
        { def: 'ocena_filmu', label: 'Ocena', hide: this.ocena_filmu.value},
        { def: 'streszczenie_fabuly', label: 'Streszczenie fabuly', hide: this.streszczenie_fabuly.value},
        { def: 'obsada', label: 'obsada', hide: this.obsada.value},
      ]

    constructor(
        private UserService:UserService,
        private dialog:MatDialog,
        private AlertService:AlertService,
        private FilmService:FilmService,
    ){
        this.dataSource = new MatTableDataSource(this.films);

    }
    
    

    ngOnInit(){
        this.UserService.getThisUser(this.token).subscribe(
            (response:any) => {
                if(response.res == true){
                    this.admin = true;
                }
            });
        this.UserService.getUserList(this.token).subscribe(data =>
            this.users = data
            
        )
        this.getFilms();
    }

    deleteFilm(id)
    {
        const dialogRef = this.dialog.open(DeleteDialog);
        dialogRef.afterClosed().subscribe((conf:boolean) =>{
            if(conf){
                const data={
                    token:this.token,
                    filmId: id
                }
                this.FilmService.delFilm(data).subscribe((response:any)=>{ 
                        this.getFilms();
                        if(response.result == true)
                        {
                            this.AlertService.success("Usunięto Film");
                        }
                });
            }
        });
    }

    editFilm(id)
    {
        if(id != null)  
        {
            this.selectedFilm=id;
            const data = {
                token: this.token,
                filmId:id
            }
            this.FilmService.getFilm(data).subscribe(data=>
               {
                   this.film = data[0];
                   this.obsadaF = this.film.obsada.join(', ');
                   this.contentOfDes=data[0].streszczenie_fabuly;
               }
            )
        }
        else
        {
            this.selectedFilm=1;
            this.film = {
                tytul:"",
                gatunek:"",
                streszczenie_fabuly:"",
                obsada:[],
                ocena_filmu:null,
                rezyser:"",
                czas_trwania:"",
                _id:["$oid"],
                dostepnosc:null,
            };
        }
        window.scrollTo(0,document.body.scrollHeight);

    }

    saveFilm(id)
    {
        if(!id){
            let obsada;
            if(this.obsadaF != null)
            {
                obsada = this.obsadaF.split(', ').map(e => e.split(', '));
            }
            const data = {
               id: null,
               tytul: this.film.tytul,
               gatunek: this.film.gatunek,
               token: this.token,
               rezyser: this.film.rezyser,
               streszczenie_fabuly:this.contentOfDes ? this.contentOfDes : null,
               czas_trwania:this.film.czas_trwania,
               ocena_filmu:this.film.ocena_filmu,
               obsada: obsada ? obsada : null
           }
           
           this.FilmService.addFilm(data).subscribe((res:any) => {
                if(res.resultOf != null){
                    this.AlertService.error(res.resultOf);
                }
                else if(res.result == true)
                {
                    this.AlertService.success("Pomyślnie dodano film!");
                    this.selectedFilm=undefined;
                    this.getFilms();
                    this.contentOfDes='';
                }
                else{
                    this.AlertService.error("Istnieje już taki film!");
                }
            });
           
        }
        else{
            let obsada;
            if(this.obsadaF != null)
            {
                obsada = this.obsadaF.split(', ').map(e => e.split(', '));
            }
            const data = {
               id: id,
               tytul: this.film.tytul,
               gatunek: this.film.gatunek,
               token: this.token,
               rezyser: this.film.rezyser,
               streszczenie_fabuly:this.contentOfDes ? this.contentOfDes : null,
               czas_trwania:this.film.czas_trwania,
               ocena_filmu:this.film.ocena_filmu,
               obsada: obsada ? obsada : null 
           }
           
      
           
               this.FilmService.updateFilm(data).subscribe((response:any) =>{
                
                       this.AlertService.success("Zedytowałeś film!");
                       this.selectedFilm=undefined;
                       this.getFilms();
                       this.contentOfDes='';
   
                 
               });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    doTextareaValueChange(ev){
        this.contentOfDes = ev.target.value;
    }

    getDisplayedColumns() {
        let primary = ['id','tytul', 'gatunek', 'rezyser', 'czas_trwania','dostepnosc'];
        let obj =  this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
        this.columnsFilm = [...primary,...obj];
        this.columnsFilm.push('actions');

    }

    ngAfterViewInit() {
        let o1:Observable<boolean> = this.ocena_filmu.valueChanges;
        let o2:Observable<boolean> = this.streszczenie_fabuly.valueChanges;
        let o3:Observable<boolean> = this.obsada.valueChanges;

        merge(o1, o2,o3).subscribe( v=>{
        this.columnDefinitions[6].hide = this.ocena_filmu.value;
        this.columnDefinitions[7].hide = this.streszczenie_fabuly.value;  
        this.columnDefinitions[8].hide = this.obsada.value;  
      
           this.getDisplayedColumns();
         });
     
         this.getDisplayedColumns();
       }

    getFilms(){
        this.FilmService.getFilmList().subscribe(data =>
            {   
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.sort = this.sort;
            }
        )
    }

    delete(id){
        const dialogRef = this.dialog.open(DeleteUserDialog);
        dialogRef.afterClosed().subscribe((conf:boolean) =>{
            if(conf){
                const data={
                    token:this.token,
                    userId: id
                }
                this.UserService.delUser(data).subscribe((response:any)=>{ 
                        this.ngOnInit();
                        if(response.result == true)
                        {
                            this.AlertService.success("Usunięto klienta");
                        }
                        else if(response.result == false)
                        {
                            this.AlertService.error("Klient ma aktywne wypożyczenia");
                        }
                });
            }
            
        });
    }

    edit(id){
        if(id){
        this.selectedUser=id;
        const get = {
            token: this.token,
            userId:id
        }
        this.UserService.getUser(get).subscribe(data=>
           {
               this.user = data[0];
           }
        )
        }
        else
        {
            this.selectedUser=1;
            this.user = {
                imie:"",
                nazwisko:"",
                nick:"",
                telefon:"",
                adres:null,
                token:null,
                password:null,
                dataRejestracji:null,
                resultOfLogging:null,
                _id:["$oid"],
            };
        }
    }

    cancel(){
        this.selectedUser=undefined;
        this.selectedFilm=undefined;
        this.contentOfDes='';
        this.obsadaF = null;
        this.film=null;
        this.user=null;
    }

    save(id){
        if(!id){
            const data = {
                id: null,
                nick: this.user.nick,
                imie: this.user.imie,
                adminPanel: true,
                nazwisko: this.user.nazwisko,
                adres:this.user.adres,
                telefon:this.user.telefon,
                password:this.user.password
            }

            this.UserService.registerUser(data).subscribe((data:any) => {
                if(data.result){
                  this.ngOnInit();
                  this.selectedUser=undefined;
                  this.AlertService.success(data.resultOfLogging);
                  }
                  else{
                    this.AlertService.error(data.resultOfLogging);
                  }
          });
        }
        else{
            const data = {
                id: id,
                nick: this.user.nick,
                imie: this.user.imie,
                token: this.token,
                nazwisko: this.user.nazwisko,
                adres:this.user.adres,
                telefon:this.user.telefon
            }
            
            if(data.nick && data.imie && data.nazwisko){
            
                this.UserService.updateUser(data).subscribe((response:any) =>{
                 
                        this.AlertService.success("Zedytowałeś klienta!");
                        this.selectedUser=undefined;
                        this.ngOnInit();
                  
                });
            }
            else{
                this.AlertService.info("Pola nick,imie oraz nazwisko nie mogą być puste!");
            }
        }
       
    }

    pass(id){
        const dialogRef = this.dialog.open(PasswordUpdateDialog,{
            data: {
              id: id
            }
          });
        dialogRef.afterClosed().subscribe((conf:boolean) =>{
            if(conf){       
                this.AlertService.success("Nadano nowe hasło");
            }
            
        });
    }

    applyFilter(filterValue: string) {
         filterValue = filterValue.trim(); 
         filterValue = filterValue.toLowerCase(); 
         this.dataSource.filter = filterValue;
    }
  
}