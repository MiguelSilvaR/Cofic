import gql from 'graphql-tag'

export const login = gql`
	mutation getAuth($token: ObtainJSONWebTokenInput!) {
		tokenAuth(input: $token) {
			token
		}
	}
`

export const nuevoAnuncio = gql`
	mutation createAnuncio($anuncio: CreateAnuncioMutationInput!) {
		createAnuncio(input: $anuncio) {
			anuncio{
				id
			}
		}
	}
`

export const nuevoUser = gql`
	mutation createUser($user:CreateUserMutationInput!) {
		createUsuario(input:$user) {
			user {
				id
			}
		}
	}
`

export const resolveNot = gql`
	mutation resolveNotificacion($id: NotificacionResueltaMutationInput!) {
		notificacionResuelta(input: $id) {
			success
		}
	}
`