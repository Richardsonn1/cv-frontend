import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.scss";

export const config: {
  graphQlUri: string;
  langUrl: string;
} = {
  graphQlUri: process.env.SERVER_URL
    ? process.env.SERVER_URL
    : "http://localhost:4000",
  langUrl: process.env.SERVER_URL
    ? `${process.env.SERVER_URL}/language/frontend/{{lng}}`
    : "http://localhost:4000/language/frontend/{{lng}}",
};

const httpLink = createHttpLink({
  uri: `${config.graphQlUri}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

export const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#303030",
        paper: "#383838",
      },
      primary: {
        main: "#f2800a",
      },
      secondary: {
        main: "#f2800a",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={graphqlClient}>
        <Routes>
          <Route />
        </Routes>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
