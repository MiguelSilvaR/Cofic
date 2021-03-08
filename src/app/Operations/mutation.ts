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
			success
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

export const reportarPerdido = gql`
	mutation reportPerdido($perdido: ReportarFaltanteMutationInput!) {
		reportarFaltante(input: $perdido) {
			notificacion {
				id
			}
		}
	}
`

export const deleteUser = gql`
	mutation deleteUser($id: DeleteUserMutationInput!) {
		deleteUsuario(input: $id) {
			user {
				id
			}
		}
	}
`

export const deleteFile = gql`
	mutation deleteFile($id: DeleteArchivoMutationInput!) {
		deleteArchivo(input: $id) {
			success
		}
	}
`

export const verAnuncio = gql`
	mutation resolverAnuncio($id: AnuncioVistoMutationInput!) {
		anuncioVisto(input: $id) {
			success
		}
	}
`

export const updateFile = gql`
	mutation updateFile($file: UpdateArchivoMutationInput!) {
		updateArchivo(input: $file) {
			archivo {
				id
			}
		}
	}
`