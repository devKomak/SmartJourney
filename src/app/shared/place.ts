export class Place{
    constructor(public mainImage: string, public title: string, public shortDescription: string,
                public description: string, public location: {latitude, longitude, link},
                public wikipedia: string, public walkTime) {

    }
}