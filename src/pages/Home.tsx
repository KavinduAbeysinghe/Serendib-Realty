import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.scss";
import logo from "../images/logo-no-background.png";
import CardMainPg from "../components/CardMainPg";

function Home() {
  const cardData = [
    {
      cardTitle: "Houses",
      cardImg:
        "https://st.hzcdn.com/simgs/pictures/exteriors/peaceful-house-in-redmond-with-wood-accents-brent-loe-photography-img~f8b124fa0baa891b_4-1684-1-c2faff2.jpg",
      cardDes:
        "Discover your dream home with our wide range of modern apartments, cozy cottages, spacious family homes, and luxurious villas. Explore now!",
    },
    {
      cardTitle: "Apartments",
      cardImg:
        "https://media.vrbo.com/lodging/35000000/34060000/34058900/34058877/085b63d6.f10.jpg",
      cardDes:
        "Find your ideal apartment with our wide selection of stylish and affordable units. Discover your perfect living space today!",
    },
    {
      cardTitle: "Condos",
      cardImg:
        "https://bostonglobe-prod.cdn.arcpublishing.com/resizer/mUhbapf1KJL5Vi-xVxKgvdWCJ-E=/1280x0/cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/V2Y7BSNC65CZRHXYMUUZZ2EY7A.jpeg",
      cardDes:
        "Find your dream condo with us. Browse our modern and luxurious units and discover your perfect home today!",
    },
  ];

  // const [isIntersecting, setIsIntersecting] = useState(false);
  // const ref = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsIntersecting(entry.isIntersecting);
  //     },
  //     { rootMargin: "-300px" }
  //   );
  //   const section = document.querySelectorAll("section")[1];
  //   observer.observe(section);

  //   return () => observer.disconnect();
  // }, [isIntersecting]);

  // useEffect(() => {
  //   if (isIntersecting) {
  //     document.querySelectorAll(".rev-con").forEach((con) => {
  //       con.classList.add("reveal");
  //     });
  //   } else {
  //     document.querySelectorAll(".rev-con").forEach((con) => {
  //       con.classList.remove("reveal");
  //     });
  //   }
  // });

  return (
    <React.Fragment>
      <section className="vh-100">
        <div className="container pt-5 d-flex justify-content-center align-items-center vh-100">
          <div className="main-container">
            <img src={logo} alt="logo" />
            <p>
              Welcome to Serendib Realty, where we help you find your dream
              home. As a leading real estate company, we provide top-notch
              services that cater to all your housing needs. Whether you're
              buying, selling, or renting, our team of experienced agents is
              here to guide you every step of the way. Trust us to find the
              perfect property that matches your lifestyle and budget. Let's
              start your journey towards your dream home today.
            </p>
            <a
              href="#section1"
              className="get-started-btn text-decoration-none"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      <section id="section1">
        <div className="container pt-5 pb-5 rev-con">
          <h1 className="text-center mb-5">
            Get to know more{" "}
            <span style={{ color: "rgb(0, 120, 130)" }}>About Us</span>
          </h1>
          <div className="container d-flex counter-container justify-content-center mb-5 flex-wrap gap-5">
            <div className="text-center">
              <h1>+1000</h1>
              <h1 className="counter-name">Ratings</h1>
            </div>
            <div className="text-center ms-5 me-5">
              <h1>+1.5M</h1>
              <h1 className="counter-name">Reviews</h1>
            </div>
            <div className="text-center">
              <h1>+100K</h1>
              <h1 className="counter-name">Properties</h1>
            </div>
          </div>
          <p className="text-center">
            Ready to explore the full list of our properties
          </p>
          <div
            className="row row-cols-1 row-cols-md-3 g-4"
            style={{ color: "#000" }}
          >
            {cardData.map((data) => (
              <CardMainPg key={data.cardTitle} cardData={data} />
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Home;
