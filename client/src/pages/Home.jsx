import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">
            <section className="hero">
                <h1>Create Your Developer Portfolio in Minutes</h1>

                <p>
                    DevFolio Generator helps developers create a clean, professional, and
                    shareable portfolio website by filling out a simple form.
                </p>

                <Link to="/create" className="primary-btn">
                    Create Portfolio
                </Link>
            </section>
        </div>
    );
}

export default Home;