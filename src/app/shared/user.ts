import { userCoords } from './userCoords';
import { Dates } from './dates';
import { Airport } from './airport';

export class User {

    public id: number;
    public userCoords: userCoords;
    public people: number;
    public dates: Dates;
    public airports: Airport[];
    public endAirport: Airport;
    public choosedAirport;
    public choosedInBoundFlight;

    constructor() {
        this.id = 0;
        this.userCoords = new userCoords(0, 0, 0, 0);
        this.people = 0;
        this.dates = new Dates(new Date(), new Date());
        this.airports = new Array<Airport>();
    }

    public setId(id) {
        this.id = id;
    }

    public setUserCoords(coords: userCoords) {
        this.userCoords = coords;
    }

    public setPeople(people) {
        this.people = people;
    }

    public setDates(dates) {
        this.dates = dates;
    }

    public setAirports(airports) {
        this.airports = airports;
    }

    public setChoosedAirport(airport) {
        this.choosedAirport = airport;
    }

    public setInBoundFlight(flight) {
      this.choosedInBoundFlight = flight;
  }

    public setEndAirport(airport: Airport[]) {
        console.log(airport);
        const tab = new Array();

        for (let i = 0; i < airport.length; i++) {
            tab[i] = airport[i].distance;
        }

        const min = Math.min(...tab);
        for (let i = 0; i < airport.length; i++) {
            if (airport[i].distance === min) { this.endAirport = airport[i]; }
        }

        console.log(this.endAirport);

    }







}
