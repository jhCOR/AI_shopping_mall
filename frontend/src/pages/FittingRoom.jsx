import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";

function FittingRoom() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/fitting-room/${productId}`);
      if (res.data.success) {
        setProduct(res.data.product);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("피팅룸 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [productId]);

  if (!product) return <div>로딩중...</div>;

  return (
    <div>
      <h2>피팅룸</h2>
      <p>선택된 상품: {product.name}</p>
      <p>카테고리: {product.category}</p>
      <p>인기도: {product.popularity}</p>
      <hr />
      {/* 실제로는 여기서 옷 입히기 기능 등을 구현할 수 있음 */}
      <p>여기에서 가상의 피팅 기능을 구현하세요.</p>
    </div>
  );
}

export default FittingRoom;