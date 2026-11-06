# SpacesFinder

A serverless application study combining a React client with AWS CDK stacks for API access, authentication, Lambda functions, and storage.

The backend includes handlers for creating, reading, updating, and deleting spaces. Local frontend development still depends on correctly configured AWS-backed endpoints; a cloud deployment is separate from browsing the code.

## Start reading

- [`client/`](client/)
- [`backend/`](backend/)

## Development

Use Node.js and npm compatible with the versions recorded in the package manifest and lockfile. Each package is installed from its own directory.

Start this package from the repository root:

```sh
cd client
npm ci
npm run dev
```

Additional scripts in this package: `npm run build`.

The commands above start individual packages. Full-stack and microfrontend projects need their dependent services or remotes running as well.

## Configuration

The source reads `TABLE_NAME`, `TEST_PASSWORD`. Supply environment-specific values locally. Browser-exposed settings such as `VITE_` and `NEXT_PUBLIC_` variables are public configuration, not a place for private credentials.
