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

export const miUsuario = gql`
    query myUser {
        miUsuario {
            departamento
            rol
        }
    }
`

export const getPossibleFiles = gql`
    query posibleFiles($departamento: String) {
        getPossibleFiles(departamento: $departamento) {
            id
            archivo
            nombre
            periodo
            createdAt
            cliente {
                nombreContacto
            }
        }
    }
`