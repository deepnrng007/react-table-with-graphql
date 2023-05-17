import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Table, { Data } from "@/pages/Table";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const inter = Inter({ subsets: ["latin"] });

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>List of Users</h1>
        <Table />
      </div>
    </ApolloProvider>
  );
}
