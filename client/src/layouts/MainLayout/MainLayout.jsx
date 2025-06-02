import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import {NavigationSidebar, RightSlidebarDefault} from "../../components/Layouts";

function MainLayout({ children }) {
    return ( 
        <div className="main-layout d-flex">
            <NavigationSidebar />
            <div className="main-content">
                <Header />
                <div className="content d-flex">
                    {children}
                    <RightSlidebarDefault />
                </div>
                <Footer />
            </div>
        </div> 
    );
}

export default MainLayout;