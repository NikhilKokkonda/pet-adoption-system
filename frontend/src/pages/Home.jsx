import React from 'react';
import './Home.css';

const Home = () => {

    const pets = [
        {
            id: 1,
            name: "Max",
            breed: "German Shepherd",
            image: "https://images.theconversation.com/files/625049/original/file-20241010-15-95v3ha.jpg"
        },
        {
            id: 2,
            name: "Bella",
            breed: "Siberian Husky",
            image: "https://images.fastcompany.com/image/upload/f_webp,c_fit,w_1920,q_auto/wp-cms/uploads/2014/01/3025003-poster-p-dog-2.jpg"
        },
        {
            id: 3,
            name: "Luna",
            breed: "Golden Retriever",
            image: "https://www.petbarn.com.au/petspot/app/uploads/2018/12/Golden-retriever.jpg"
        }
    ];

    const features = [
        {
            id: 1,
            title: "Save a Life",
            desc: "Give a second chance to homeless pets."
        },
        {
            id: 2,
            title: "Find Best Match",
            desc: "Choose pets that suit your lifestyle."
        },
        {
            id: 3,
            title: "Trusted Shelters",
            desc: "Verified shelters ensure safe adoption."
        }
    ];

    return (
        <div className="home-container">

            {/* HERO */}
            <section className="hero-banner">
                <div className="hero-content">
                    <h1>Where Hearts Meet Paws ❤</h1>
                    <p>
                        Give a loving home to pets in need. Browse through our adorable
                        companions waiting for their forever family.
                    </p>
                </div>

                <div className="hero-images">
                    {pets.map((pet) => (
                        <img key={pet.id} src={pet.image} alt={pet.name} />
                    ))}
                </div>
            </section>

            {/* PETS */}
            <section className="featured-section">
                <h2>Available for Adoption</h2>
                <p>Meet our lovely pets looking for their forever homes</p>

                <div className="pet-grid">
                    {pets.map((pet) => (
                        <div key={pet.id} className="pet-card">
                            <img src={pet.image} alt={pet.name} />
                            <h3>{pet.name}</h3>
                            <p>{pet.breed}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES (ADOPTION BENEFITS) */}
            <section className="features-section">
                <h2>Why Adopt From Us?</h2>

                <div className="features-grid">
                    {features.map((f) => (
                        <div key={f.id} className="feature-card">
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* STATS */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div>
                        <h2>500+</h2>
                        <p>Pets Adopted</p>
                    </div>
                    <div>
                        <h2>50+</h2>
                        <p>Shelters</p>
                    </div>
                    <div>
                        <h2>1000+</h2>
                        <p>Happy Families</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;