import { Injectable } from '@angular/core';
import { NotificationService } from 'patternfly-ng/notification/notification-service/notification.service';
import { catchError, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ContentResponse } from './content';

@Injectable()
export class ContentSearchService {
    constructor(private http: HttpClient, private notificationService: NotificationService) {}

    private url = '/api/v1/search/content/';

    query(params?: any): Observable<ContentResponse> {
        return this.http.get<ContentResponse>(this.url, { params: params }).pipe(
            tap(_ => this.log('fetched content')),
            catchError(this.handleError('Query', {} as ContentResponse)),
        );
    }

    get(id: number): Observable<any> {
        return this.http.get<any>(`${this.url}${id.toString()}/`).pipe(
            tap(_ => this.log('fetched import')),
            catchError(this.handleError('Get', [])),
        );
    }

    private handleError<T>(operation = '', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed, error:`, error);
            this.log(`${operation} provider source error: ${error.message}`);
            this.notificationService.httpError(`${operation} user failed:`, { data: error });

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log('ContentSearch: ' + message);
    }
}
