import { Genre } from "./Genre";
import { Person } from "./Person";

export interface Movie {
    id: number;
    title: string;
    length: number;
    rating: number;
    imdbLink: string;
    imageLinks: Array<string>;
    people: Array<Person>;
    genres: Array<Genre>;
    clickedCounter: number;
    description: string;
    year: number;
}