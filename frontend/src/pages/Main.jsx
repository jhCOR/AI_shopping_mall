import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./css/Main.css";

// 이미지 경로 import
import bannerImg from "../assets/banner.png";
import product1 from "../assets/product/product1.png";
import product2 from "../assets/product/product2.png";
import product3 from "../assets/product/product3.png";

const recommendedProducts = [
  { id: 201, name: "스타일리시 남성 아우터", image: product1 },
  { id: 202, name: "여성 봄맞이 상의", image: product2 },
  { id: 203, name: "남성 인기 하의", image: product3 },
];

function Main() {
  return (
    <div className="main-container">
      {/* 상단 메뉴 바 */}
      <header className="header">
        <h1 className="logo">Fashion Fit</h1>
        <nav className="nav">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
          <Link to="/shop">SHOP</Link>
        </nav>
      </header>

      {/* 중앙 배너 이미지 */}
      <section className="hero">
        <img src={bannerImg} alt="Fashion Fit Banner" />
      </section>

      {/* 메뉴 버튼 */}
      <section className="menu-buttons">
        <Link to="/shop" className="menu-btn">남성의류</Link>
        <Link to="/shop" className="menu-btn">여성의류</Link>
        <Link to="/fitting-room/1" className="menu-btn">피팅룸 체험하기</Link>
      </section>

      {/* 추천상품 캐러셀 */}
      <section className="carousel-section">
        <h2>추천 상품</h2>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          centerMode={true}
          centerSlidePercentage={33}  /* 각 이미지의 너비를 화면의 33%로 설정 (한 화면에 3개 보이도록) */
        >
          {recommendedProducts.map((product) => (
            <div key={product.id} className="carousel-slide">
              <img src={product.image} alt={product.name} />
              <p className="legend">{product.name}</p>
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
}

export default Main;
