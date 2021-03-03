<<<<<<< HEAD
import gql from 'graphql-tag'

export const login = gql`
	mutation getAuth($token: ObtainJSONWebTokenInput!) {
		tokenAuth(input: $token) {
			token
		}
	}
`
=======
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
>>>>>>> e7c49b7d9a172d403efe578f236c652b79e3527c
