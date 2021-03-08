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
            estado
        }
    }
`

export const allUsersAdmin = gql`
    query allUsuarios {
        allUsuarios {
            id
            username
            email
            telefono
            rol
            activo

        }
    }
`

export const getAllFiles = gql`
    query allFiles {
        allFiles {
            edges {
                node {
                    id
                    nombre
                    archivo
                    cliente {
                        nombreContacto
                    }
                    createdAt
                    estado
                }
            }
        }
    }
`

export const allClientes = gql`
    query allClientes {
        allClientes {
            id
            nombreContacto
            email
        }
    }
`

export const notificaciones = gql`
    query notificaciones {
        getNotificaciones {
            id
            tipoNotificacion
            departamento
            createdAt
            usuario {
                email
            }
        }
    }
`

export const getAnuncios = gql`
    query getAnuncios {
        getAnuncios {
            id
            tipoUsuario
            notificacion
        }
    }
`