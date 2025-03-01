import React, { useState, useRef, useEffect } from 'react';
import './Browsecategory.css';
import ProfilePopup from './ProfilePopup'; // Import the new pop-up component

const Browsecategory = () => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [searchcategory, setSearchcategory] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const categoryMap = {
    logodesign: "Logo Design",
    brandingservices: "Branding Services",
    socialmediadesign: "Social Media Design",
    websitedesign: "Website Design"
  };

  const formatCategory = (key) => categoryMap[key] || key;



  // Sample category data
  const categories = [
    { id: 1, title: 'All', key: "all" },
    { id: 2, title: 'Logo Design', key: "logodesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/logo-design.webp" },
    { id: 3, title: 'Branding Services', key: "brandingservices", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/branding-services.webp" },
    { id: 4, title: 'Social Media Design', key: "socialmediadesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/social-media-design.webp" },
    { id: 5, title: 'Website Design', key: "websitedesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/website-design.webp" },
    { id: 6, title: 'Illustrations', key: "illustrations", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/illustrations.webp" },
    { id: 7, title: 'Packaging Design', key: "packagingdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/packaging-design.webp" },
    { id: 8, title: 'Landing Page Design', key: "landingpagedesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/landing-page-design.webp" },
    { id: 9, title: 'UI/UX Design', key: "uiuxdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/ui-ux-design.webp" },
    { id: 10, title: 'Architecture & Interior Design', key: "architectureinteriordesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/architecture-interior-design.webp" },
    { id: 11, title: 'Stationary Design', key: "stationarydesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/business-cards-stationary-design.webp" },
    { id: 12, title: 'Fonts & Typography', key: "fontstypography", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/fonts-typography.webp" },
    { id: 13, title: 'Book Design', key: "bookdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/book-design.webp" },
    { id: 14, title: 'Album Cover Design', key: "albumcoverdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/album-cover-design.webp" },
    { id: 15, title: 'Signage Design', key: "signagedesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/signage-design.webp" },
    { id: 16, title: 'Invitation Design', key: "invitationdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/invitation-design.webp" },
    { id: 17, title: 'T-Shirt & Merchandise', key: "tshirtmerchandise", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/t-shirt-merchandise.webp" },
    { id: 18, title: 'Flyer and Brochure Design', key: "flyerandbrochuredesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/flyer-brochure-design.webp" },
    { id: 19, title: 'Poster Design', key: "posterdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/poster-design.webp" },
    { id: 20, title: 'Identity Design', key: "identitydesign", key: "identitydesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/identity-design.webp" },
    { id: 21, title: 'Brand Guidelines', key: "brandguidelines", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/brand-guidelines.webp" },
    { id: 22, title: 'App Design', key: "appdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/app-design.webp" },
    { id: 23, title: 'Icon Design', key: "icondesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/icon-design.webp" },
    { id: 24, title: 'Portraits', key: "portraits", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/portraits.webp" },
    { id: 25, title: 'Comics & Character Design', key: "comicscharacterdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/cartoons-comics.webp" },
    { id: 26, title: 'Fashion Design', key: "fashiondesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/fashion-design.webp" },
    { id: 27, title: 'Pattern Design', key: "patterndesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/pattern-design.webp" },
    { id: 28, title: 'Storyboards', key: "storyboards", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/storyboards.webp" },
    { id: 29, title: 'Tattoo Design', key: "tattoodesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/tattoo-design.webp" },
    { id: 30, title: 'NFT Art', key: "nftart", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/hire-banner.webp" },
    { id: 31, title: '3D Illustration', key: "3dillustration", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/3d-illustration.webp" },
    { id: 32, title: 'Children Illustration', key: "childrenillustration", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/childrens-illustration.webp" },
    { id: 33, title: 'Presentation Design', key: "presentationdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/presentation-design.webp" },
    { id: 34, title: 'Infographic Design', key: "infographicdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/infographic-design.webp" },
    { id: 35, title: 'Resume Design', key: "resumedesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/resume-design.webp" },
    { id: 36, title: 'Copy Writing', key: "copywriting", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/copywriting.webp" },
    { id: 37, title: 'Product Photography', key: "productphotography", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/product-photography.webp" },
    { id: 38, title: 'Landscape Photography', key: "landscapephotography", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/hire-banner.webp" },
    { id: 39, title: 'Image Editing & Retouching', key: "imageeditingretouching", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/image-editing-retouching.webp" },
    { id: 40, title: 'Portrait Photography', key: "portraitphotography", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/portrait-photography.webp" },
    { id: 41, title: 'Landscape Design', key: "landscapedesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/landscape-design.webp" },
    { id: 42, title: 'Industrial Design', key: "industrialdesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/industrial-design.webp" },
    { id: 43, title: 'Graphics For Streamers', key: "graphicsforstreamers", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/graphics-for-streamers.webp" },
    { id: 44, title: 'Game Design', key: "gamedesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/game-design.webp" },
    { id: 45, title: 'Creative Tool Coaching', key: "creativetoolcoaching", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/creative-tool-coaching.webp" },
    { id: 46, title: 'Mentorship & Career Advice', key: "mentorshipcareeradvice", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/career-advice.webp" },
    { id: 47, title: 'Modeling Projects', key: "modelingprojects", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/modeling-projects.webp" },
    { id: 48, title: 'Architecture Renderings', key: "architecturerenderings", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/architecture-renderings.webp" },
    { id: 49, title: 'Music Composition & Production', key: "musiccompositionproduction", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/music-production.webp" },
    { id: 50, title: 'Sound Design', key: "sounddesign", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/sound-design.webp" },
    { id: 51, title: 'Animated Gifs', key: "animatedgifs", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/animated-gifs.webp" },
    { id: 52, title: 'Logo Animations', key: "logoanimations", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/logo-animation.webp" },
    { id: 53, title: 'Motion Graphics', key: "motiongraphics", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/motion-graphics.webp" },
    { id: 54, title: 'Video Production & Editing', key: "videoproductionediting", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/video-production.webp" },
    { id: 55, title: 'Explainer Videos', key: "explainervideos", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/explainer-videos.webp" },
    { id: 56, title: 'Short Video Ads', key: "shortvideoads", image: "https://a5.behance.net/254881daa5740e934beffee00a8abd6f9b0b34a2/img/hire/freelance-categories/short-video-ads.webp" },

  ];

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://localhost:3000/profiles/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setProfiles(data))
        .catch((err) => console.error("Error fetching data:", err));
    } else {
      fetch(`http://localhost:3000/profiles`)
        .then((res) => res.json())
        .then((data) => setProfiles(data))
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [searchTerm]);

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

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector(".category-card").offsetWidth + 16;
      sliderRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector(".category-card").offsetWidth + 16;
      sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    const filtered = categories.filter(category =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const searchCategoryByName = () => {
    const newUrl = `/profiles/${searchTerm.toLowerCase().replace(/\s+/g, '')}`;
    window.history.pushState({}, '', newUrl);
    setSearchcategory(searchTerm.toLowerCase().replace(/\s+/g, ''));
    fetch(`http://localhost:3000/profiles/${searchTerm.toLowerCase().replace(/\s+/g, '')}`)
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  const handleCategoryClick = (categoryKey) => {
    const newUrl = `/profiles/${categoryKey}`;
    window.history.pushState({}, '', newUrl);
    setSearchcategory(categoryKey);
    fetch(`http://localhost:3000/profiles/${categoryKey}`)
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  const onClose = () => {
    setSelectedProfile(null);
  };

  const categoriesToDisplay = searchTerm ? filteredCategories : categories;

  return (
    <div>
      {/* Search Bar and Slider */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={searchCategoryByName}>
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

          {categoriesToDisplay.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.key)}
            >
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

      {/* Profiles */}
      <div className="profiles-container">
        {profiles?.map((profile, index) => (
          <div className="profile-card" key={index} onClick={() => setSelectedProfile(profile)}>
            <img className="profile-photo" src={profile.profilePhoto} alt={profile.name} />
            <div className="name-section">{profile.name}</div>
            <img className='location-1' src={'https://cdn-icons-png.flaticon.com/128/14035/14035451.png'} alt="" />
            <div className="location-2">{profile.location}</div>
            <div className="skills-category">
              {profile.categories?.map((category, categoryIndex) => (
                <div className="skills-category-1" key={categoryIndex}>{formatCategory(category)}</div>
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

      {/* Pop-up */}
      {selectedProfile && (
        <ProfilePopup profile={selectedProfile} onClose={onClose} />
      )}
    </div>
  );
};

export default Browsecategory;