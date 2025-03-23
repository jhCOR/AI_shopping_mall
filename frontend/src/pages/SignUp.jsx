import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/signup", {
        email,
        password,
        gender,
      });
      if (res.data.success) {
        alert("회원가입 완료");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "회원가입 오류");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          성별:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </label>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
