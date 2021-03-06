import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult, MutationOptions, TypedDocumentNode } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MutationService {

  constructor(
    private apollo: Apollo
  ) { }

  executeMutation(options: MutationOptions): Observable<FetchResult<any, Record<string, any>, Record<string, any>>> {
    return this.apollo.mutate(
      options
    );
  }

  getOptions(mutation: DocumentNode | TypedDocumentNode<any, Record<string, any>>,
    variables?: Record<string, any> | undefined, context?: any): MutationOptions {
    return {
      mutation,
      variables,
      context
    }
  }
}
