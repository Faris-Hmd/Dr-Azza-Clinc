/** @format */
import Head from "next/head";
import { ThemeProvider } from "react-bootstrap";
// import ButtomNav from "./ButtomNav";
import Navbar from "./Navbar";
import Footer from "./ContactUs";

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
          <main className="main">{children}</main>
        </div>
      </ThemeProvider>
    </>
  );
};
export default Layout;
