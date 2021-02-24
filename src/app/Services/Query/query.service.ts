import { Injectable } from '@angular/core';
import { ApolloQueryResult, WatchQueryOptions } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(
    private apollo:Apollo
  ) { }

  executeQuery(options: WatchQueryOptions): Observable<ApolloQueryResult<unknown>> {
    return this.apollo.watchQuery(options).valueChanges
  }
}
