# JSON Web Token / Authentication & Authorization

## 1. JSON Web Token

JSON Web Token (JWT) is an open standard defined in RFC 7519 that is based on JSON and enables secure data exchange and authentication between parties. For example, a server can generate a token indicating that a user has administrative privileges and send it to the user. The user can then use this token on a client to access resources, and their privileges can be verified by all parties.

A JWT consists of three parts: Header, Payload, and Signature:

1. Header: Specifies the algorithm used for signing the token. For example, HS256 indicates that the HMAC-SHA256 algorithm is used for signing.

```
header = '{"alg":"HS256","typ":"JWT"}'
```
   
2. Payload: Contains claims or information about the user or the token. For instance, iat (issued at) carries the timestamp when the token was created. The payload is not encrypted but is base64url-encoded.

```
payload = '{"loggedInAs":"admin","iat":1422779638}'
```

3. Signature: To create the signature, the encoded header and payload are combined with a dot (.), and then this combination is hashed using the specified algorithm and a secret key. This ensures the integrity and authenticity of the token.

```
unsignedToken = encodeBase64Url(header) + '.' + encodeBase64Url(payload)
signature = HMAC-SHA256(key, unsignedToken)
```

The final JWT is composed of the header, payload, and signature, separated by dots (.):

`token = encodeBase64Url(header) + '.' + encodeBase64Url(payload) + '.' + encodeBase64Url(signature)`

Example token:

`key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI`

## 2. Usage

During authentication, if the user-provided information is verified, a token is generated and returned to the user, who stores it (e.g., in cookies or web storage). When user authentication is needed, the client sends an Authorization header with the Bearer scheme to the server. The header content looks like this:

`Authorization: Bearer eyJhbGci...<snip>...yu5CSpyHI`

This is a stateless authentication method, meaning that the server does not store user state in memory. Instead, the server validates the JWT sent in the Authorization header. If the token is valid, access to protected resources is granted. Since all required information is contained within the JWT, it reduces the need for additional database queries.

Token Management: JWTs can be managed in various ways, including defining a lifetime for the token. Once this time expires, the token is rejected and becomes invalid. If a user needs to invalidate a previously issued token, a short lifetime for tokens is recommended. When the token expires, the client requests a new token from the server, typically by presenting the expired token. The server verifies the validity of the expired token and checks if it is on a blacklist. If the token is not blacklisted, a new token is issued. This allows a token to be remotely invalidated if it is blacklisted or expired.

## 3. Project

The "jsonwebtoken" package is used in this repository for JSON Web Token operations.

At the `api/auth/register` endpoint, the user registers and receives a token.

At the `api/auth/get_me` endpoint, the getAccessToRoute middleware checks the user's token. If the token is valid, access is granted.

At the `api/auth/logout` endpoint, the user logs out, and the token expires.

Refer to the "jsonwebtoken" documentation for further usage instructions.

## 4. Run

`npx tsc`: This command generates a dist folder and translates all codes to JavaScript.
`npm run dev`: This command runs project on localhost.
