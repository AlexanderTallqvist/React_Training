import React from "react";
import App from "./components/containers/AppContainer";
import { GoogleFont, TypographyStyle } from "react-typography";
import typography from "./services/typography";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:8889/graphql"
});

const Root = props => {
  const { store } = props;
  return (
    <>
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
      <Provider store={store}>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default Root;
