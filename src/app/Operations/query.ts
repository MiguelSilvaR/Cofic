import gql from 'graphql-tag'

export const auth = gql`
    mutation auth($usuario: ObtainJSONWebTokenInput!) {
        tokenAuth(input: $usuario) {
            token
        }
    }
`

export const getFile = gql`
    query getFile($name: String) {
        getFile(filename: $name)
    } 
`