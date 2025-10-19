import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SessionWrapper from "../components/SessionWrapper";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper> 
          
          <Navbar/>
        <main>{children}</main>         
          <Footer></Footer>
        
        </SessionWrapper>
      </body>
    </html>
  );
}