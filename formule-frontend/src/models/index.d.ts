export interface User {
    email: string;
    name: string;
    picture: string;
    sub: string;
}
export interface Team {
    id: number;
    teamAbbreviation: string;
    teamName: string;
    baseLocation: string;
    teamPrincipal: string;
    yearEstablished: number;
    championshipsWon: number;
}
export interface Driver {
    id: number;
    teamId: string;
    firstName: string;
    lastName: string;
    nationality: string;
    carNumber: number;
    championshipsWon: number;
}
export interface Track {
    id: number;
    trackName: string;
    location: string;
    country: string;
    trackLengthKm: number;
    numberOfTurns: number;
}
export interface RaceResult {
    carNumber: number;
    position: number;
    points: number;
}
export interface Result {
    id: string;
    trackId: number;
    date: string;
    results: RaceResult[];
}
