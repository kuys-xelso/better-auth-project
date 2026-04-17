import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // Using local file path instead of URL to avoid ECONNREFUSED when backend is not running
  schema: "../better-auth-backend/schema.gql",
  documents: [
    "lib/graphql/**/*.ts",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  ignoreNoDocuments: true,
  generates: {
    "lib/graphql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
