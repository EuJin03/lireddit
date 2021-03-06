import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import theme from "../theme";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
