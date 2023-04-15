/** @format */
import Head from "next/head";
import { Container, Row, ThemeProvider } from "react-bootstrap";
// import ButtomNav from "./ButtomNav";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** @format */
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="manifest" href="./manifest.json" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/icons/DrAzzaIcon.ico"
        />
      </Head>
      <ThemeProvider>
        <div className={`App`}>
          <div className="rightSide"></div>
          <div className="leftSide"></div>
          <Navbar />
          {/* <ButtomNav /> */}
          <main className="main">
            {children}
            <Container>
              <Row className="p-0">
                <Footer />
              </Row>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </>
  );
};
export default Layout;
