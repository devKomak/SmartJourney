import { userCoords } from "./userCoords";
import { Dates } from "./dates";
import { Airport } from "./airport";

export class User {

    public id: number;
    public userCoords: userCoords;
    public people: number;
    public dates: Dates;
    public airports: Airport[];
    
    constructor() {
        this.id = 0;
        this.userCoords = new userCoords(0, 0, 0, 0);
        this.people = 0;
        this.dates = new Dates("25-01-12",'25-02-2015');
        this.airports = new Array<Airport>();
    }

    public setId(id){
        this.id = id;
    }

    public setUserCoords(userCoords: userCoords){
        this.userCoords = userCoords;
    }

    public setPeople(people){
        this.people = people;
    }

    public setDates(dates){
        this.dates = dates;
    }

    public setAirports(airports){
        this.airports = airports;
    }







}
