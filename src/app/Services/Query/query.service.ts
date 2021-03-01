import { Injectable } from '@angular/core';
import { ApolloQueryResult, DocumentNode, QueryOptions, TypedDocumentNode, WatchQueryOptions } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(
    private apollo: Apollo
  ) { }

  executeQuery(options: WatchQueryOptions): Observable<ApolloQueryResult<unknown>> {
    return this.apollo.watchQuery(options).valueChanges
  }

  getOptions(query: DocumentNode | TypedDocumentNode<any, Record<string, any>>, fetchPolicy: "cache-first" | "network-only" | "cache-only" | "no-cache" | "standby" | undefined, variables?:Record<string, any> | undefined, context?: any): QueryOptions {
    return {
      query,
      fetchPolicy,
      variables,
      context
    }
  }
}
