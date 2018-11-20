import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, delay, map, take } from 'rxjs/operators';

import { AbstractLocation } from '../models/abstract-location.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Injectable()
export abstract class LocationService<T extends AbstractLocation> {
    constructor(private http: HttpClient) {}

    abstract endpoint: String;

    private baseEndpoint = 'http://localhost:8080/';

    private locations = new BehaviorSubject<T[]>([]);

    private handleError(request: string, error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }

    getIlluminationPower(location: T): Observable<number> {
        return this.http
            .post<number>(
                `${this.baseEndpoint}${this.endpoint}` + 'get_illumination_power',
                location,
                httpOptions,
            )
            .pipe(catchError(err => this.handleError('get_illumination_power', err)));
    }

    getArea(location: T): Observable<number> {
        return this.http
            .post<number>(
                `${this.baseEndpoint}${this.endpoint}` + 'get_area',
                location,
                httpOptions,
            )
            .pipe(catchError(err => this.handleError('get_area', err)));
    }

    getVolume(location: T): Observable<number> {
        return this.http
            .post<number>(
                `${this.baseEndpoint}${this.endpoint}` + 'get_volume',
                location,
                httpOptions,
            )
            .pipe(catchError(err => this.handleError('get_volume', err)));
    }

    getAll(): Observable<T[]> {
        return this.locations.asObservable();
    }

    add(location: T): void {
        this.locations.next([...this.locations.getValue(), location]);
    }

    remove(id: number): void {
        this.locations.next(
            this.locations.getValue().filter(elem => {
                return elem.id !== id;
            }),
        );
    }

    exists(id: number): Observable<boolean> {
        return this.locations.pipe(
            delay(100),
            map(res => {
                return !!res.find(el => {
                    return el.id === id;
                });
            }),
            take(1),
        );
    }

    edit(id: number, location: T): void {
        this.remove(id);
        this.add(location);
    }
}
