import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import "./css/Shop.css"; // CSS 파일을 따로 만들어 스타일을 관리해도 좋습니다.

function Shop() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("men"); // men or women
  const [subCategory, setSubCategory] = useState("underwear"); // underwear, top, bottom, outer
  const [sort, setSort] = useState(""); // popularity
  const [hasError, setHasError] = useState(false);

  // 백엔드 연결이 실패하거나, 응답이 없을 때 사용할 예시 상품
  const fallbackProducts = [
    {
      id: 101,
      name: "예시 남성 언더웨어",
      category: "men",
      subCategory: "underwear",
      popularity: 10,
      image: "https://via.placeholder.com/300?text=%EB%82%A8%EC%84%B1+%EC%96%B8%EB%8D%94%EC%9B%A8%EC%96%B4",
    },
    {
      id: 102,
      name: "예시 남성 상의",
      category: "men",
      subCategory: "top",
      popularity: 20,
      image: "https://via.placeholder.com/300?text=%EB%82%A8%EC%84%B1+%EC%83%81%EC%9D%98",
    },
    {
      id: 103,
      name: "예시 여성 하의",
      category: "women",
      subCategory: "bottom",
      popularity: 15,
      image: "https://via.placeholder.com/300?text=%EC%97%AC%EC%84%B1+%ED%95%98%EC%9D%98",
    },
    {
      id: 104,
      name: "예시 여성 아우터",
      category: "women",
      subCategory: "outer",
      popularity: 50,
      image: "https://via.placeholder.com/300?text=%EC%97%AC%EC%84%B1+%EC%95%84%EC%9A%B0%ED%84%B0",
    },
  ];

  const fetchProducts = async () => {
    try {
      setHasError(false);
      let url = `/products?category=${category}&subCategory=${subCategory}`;
      if (sort === "popularity") {
        url += "&sort=popularity";
      }
      const res = await axios.get(url);
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      } else {
        // 데이터가 비어있으면 예시 상품 사용
        setProducts(fallbackProducts);
      }
    } catch (err) {
      console.error(err);
      setHasError(true);
      // 오류가 나도 예시 상품 보여주기
      setProducts(fallbackProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [category, subCategory, sort]);

  return (
    <div className="shop-container">
      <h1>쇼핑</h1>

      <div className="shop-controls">
        <div className="category-buttons">
          <button
            onClick={() => setCategory("men")}
            className={category === "men" ? "active" : ""}
          >
            남성의류
          </button>
          <button
            onClick={() => setCategory("women")}
            className={category === "women" ? "active" : ""}
          >
            여성의류
          </button>
        </div>

        <div className="sub-category-buttons">
          <button
            onClick={() => setSubCategory("underwear")}
            className={subCategory === "underwear" ? "active" : ""}
          >
            언더웨어
          </button>
          <button
            onClick={() => setSubCategory("top")}
            className={subCategory === "top" ? "active" : ""}
          >
            상의
          </button>
          <button
            onClick={() => setSubCategory("bottom")}
            className={subCategory === "bottom" ? "active" : ""}
          >
            하의
          </button>
          <button
            onClick={() => setSubCategory("outer")}
            className={subCategory === "outer" ? "active" : ""}
          >
            아우터
          </button>
        </div>

        <div className="sort-buttons">
          정렬:{" "}
          <button
            onClick={() => setSort("popularity")}
            className={sort === "popularity" ? "active" : ""}
          >
            인기순
          </button>
          <button
            onClick={() => setSort("")}
            className={sort === "" ? "active" : ""}
          >
            기본
          </button>
        </div>
      </div>

      {hasError && (
        <div className="error-message">
          백엔드 연결 오류가 발생했습니다. 예시 상품을 표시합니다.
        </div>
      )}

      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            {/* 이미지 없을 시 placeholder 이미지를 사용할 수도 있음 */}
            <img
              src={p.image || "https://via.placeholder.com/300?text=No+Image"}
              alt={p.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{p.name}</h3>
              <p>인기도: {p.popularity}</p>
              <a href={`/fitting-room/${p.id}`} className="fitting-room-link">
                피팅룸으로
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
