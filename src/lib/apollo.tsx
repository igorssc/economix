"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HYGRAPH_URI,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_CLIENT_SECRET}`,
  },
  cache: new InMemoryCache(),
});

export function Apollo({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
}
