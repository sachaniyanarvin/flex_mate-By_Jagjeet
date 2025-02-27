// CategorySlider.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Browsecategory.css';

const Browsecategory = () => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const categoryMap = {
    logodesign: "Logo Design",
    brandingservices: "Branding Services",
    socialmediadesign: "Social Media Design",
    websitedesign: "Website Design"
  };
  
  const formatCategory = (key) => categoryMap[key] || key;


  // Sample category data
  const categories = [
    { id: 1, title: 'All' },
    { id: 2, title: 'Logo Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/logo-design.webp" },
    { id: 3, title: 'Branding Services', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/branding-services.webp" },
    { id: 4, title: 'Social Media Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/social-media-design.webp" },
    { id: 5, title: 'Website Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/website-design.webp" },
    { id: 6, title: 'Illustrations', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/illustrations.webp" },
    { id: 7, title: 'Packaging Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/packaging-design.webp" },
    { id: 8, title: 'Landing Page Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/landing-page-design.webp" },
    { id: 9, title: 'UI/UX Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/ui-ux-design.webp" },
    { id: 10, title: 'Architecture & Interior Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/architecture-interior-design.webp" },
    { id: 11, title: 'Stationary Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/business-cards-stationary-design.webp" },
    { id: 12, title: 'Fonts & Typography', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/fonts-typography.webp" },
    { id: 13, title: 'Book Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/book-design.webp" },
    { id: 14, title: 'Album Cover Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/album-cover-design.webp" },
    { id: 15, title: 'Signage Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/signage-design.webp" },
    { id: 16, title: 'Invitation Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/invitation-design.webp" },
    { id: 17, title: 'T-Shirt & Merchandise', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/t-shirt-merchandise.webp" },
    { id: 18, title: 'Flyer and Brochure Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/flyer-brochure-design.webp" },
    { id: 19, title: 'Poster Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/poster-design.webp" },
    { id: 20, title: 'Identity Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/identity-design.webp" },
    { id: 21, title: 'Brand Guidelines', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/brand-guidelines.webp" },
    { id: 22, title: 'App Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/app-design.webp" },
    { id: 23, title: 'Icon Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/icon-design.webp" },
    { id: 24, title: 'Portraits', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/portraits.webp" },
    { id: 25, title: 'Comics & Character Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/cartoons-comics.webp" },
    { id: 26, title: 'Fashion Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/fashion-design.webp" },
    { id: 27, title: 'Pattern Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/pattern-design.webp" },
    { id: 28, title: 'Storyboards', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/storyboards.webp" },
    { id: 29, title: 'Tattoo Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/tattoo-design.webp" },
    { id: 30, title: 'NFT Art', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/hire-banner.webp" },
    { id: 31, title: '3D Illustration', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/3d-illustration.webp" },
    { id: 32, title: 'Children Illustration', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/childrens-illustration.webp" },
    { id: 33, title: 'Presentation Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/presentation-design.webp" },
    { id: 34, title: 'Infographic Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/infographic-design.webp" },
    { id: 35, title: 'Resume Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/resume-design.webp" },
    { id: 36, title: 'Copy Writing', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/copywriting.webp" },
    { id: 37, title: 'Product Photography', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/product-photography.webp" },
    { id: 38, title: 'Landscape Photography', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/hire-banner.webp" },
    { id: 39, title: 'Image Editing & Retouching', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/image-editing-retouching.webp" },
    { id: 40, title: 'Portrait Photography', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/portrait-photography.webp" },
    { id: 41, title: 'Landscape Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/landscape-design.webp" },
    { id: 42, title: 'Industrial Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/industrial-design.webp" },
    { id: 43, title: 'Graphics For Streamers', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/graphics-for-streamers.webp" },
    { id: 44, title: 'Game Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/game-design.webp" },
    { id: 45, title: 'Creative Tool Coaching', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/creative-tool-coaching.webp" },
    { id: 46, title: 'Mentorship & Career Advice', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/career-advice.webp" },
    { id: 47, title: 'Modeling Projects', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/modeling-projects.webp" },
    { id: 48, title: 'Architecture Renderings', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/architecture-renderings.webp" },
    { id: 49, title: 'Music Composition & Production', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/music-production.webp" },
    { id: 50, title: 'Sound Design', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/sound-design.webp" },
    { id: 51, title: 'Animated Gifs', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/animated-gifs.webp" },
    { id: 52, title: 'Logo Animations', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/logo-animation.webp" },
    { id: 53, title: 'Motion Graphics', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/motion-graphics.webp" },
    { id: 54, title: 'Video Production & Editing', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/video-production.webp" },
    { id: 55, title: 'Explainer Videos', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/explainer-videos.webp" },
    { id: 56, title: 'Short Video Ads', image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/short-video-ads.webp" },

  ];


  useEffect(() => {
    fetch("http://localhost:3000/profiles")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        setShowLeftArrow(sliderRef.current.scrollLeft > 0);
      }
    };

    const slider = sliderRef.current;
    slider.addEventListener('scroll', handleScroll);

    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector(".category-card").offsetWidth + 16; // Card width + margin
      sliderRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector(".category-card").offsetWidth + 16; // Card width + margin
      sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    const filtered = categories.filter(category =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const categoriesToDisplay = searchTerm ? filteredCategories : categories;


  return (

    <div>
      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>


      <div className="slider-container">
        {showLeftArrow && (
          <button className="nav-arrow left-arrow" onClick={scrollLeft}>
            &lt;
          </button>
        )}

        <div className="slider-track" ref={sliderRef}>
          <div className="slider-spacer"></div>

          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div
                className="card-content"
                style={{
                  backgroundImage: category.image ? `url(${category.image})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <h3>{category.title}</h3>
              </div>
            </div>
          ))}


          <div className="slider-spacer"></div>
        </div>

        <button className="nav-arrow right-arrow" onClick={scrollRight}>
          &gt;
        </button>
      </div>

      <div className="profiles-container">
      {profiles?.map((profile, index) => (
        <div className="profile-card" key={index}>
          <img className="profile-photo" src={profile.profilePhoto} alt={profile.name} />
          <div className="name-section">{profile.name}</div>
          <img className='location-1' src={'https://cdn-icons-png.flaticon.com/128/14035/14035451.png'} alt="" />
          <div className="location-2">{profile.location}</div>
          <div className="skills-category">
            {profile.categories?.map((categories, categoriesIndex) => (
              <div className="skills-category-1" key={categoriesIndex}>{formatCategory(categories)}</div>
            ))}
          </div>
          <div className="work-category">Work</div>
          <div className="images-category-profile-vise">
            {profile.images?.map((image, imgIndex) => (
              <img className="image-profile-work" src={image} alt="" key={imgIndex} />
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Browsecategory;






