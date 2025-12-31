import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const MainLayout = () => {
	return (
		<>
		<Header />
		<main>
			<Outlet />
		</main>
		<Footer />
		</>
	)
}

export default MainLayout;