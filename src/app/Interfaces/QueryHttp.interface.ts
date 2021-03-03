import { FileGQL } from "./FileGQL.interface";

export interface QueryHttp {
    query: string
    variables: FileGQL
    operationName: string
}