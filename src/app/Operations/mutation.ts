import gql from 'graphql-tag'

export const login = gql`
	mutation getAuth($token: ObtainJSONWebTokenInput!) {
		tokenAuth(input: $token) {
			token
		}
	}
`