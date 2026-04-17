import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { cookies } from "next/headers";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  });

  const authLink = setContext(async (_, { headers }) => {
    const cookieStore = await cookies();
    return {
      headers: {
        ...headers,
        cookie: cookieStore.toString(),
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});
