from flask import Flask, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "SOME_RANDOM_SECRET_KEY"
CORS(app, supports_credentials=True)

# 임시로 DB 대신 사용
users = []  # [{"email": ..., "password": ..., "gender": ...}, ...]
products = [
    {
        "id": 1,
        "name": "남성 언더웨어 예시",
        "category": "men",
        "subCategory": "underwear",
        "popularity": 50
    },
    {
        "id": 2,
        "name": "여성 상의 예시",
        "category": "women",
        "subCategory": "top",
        "popularity": 100
    },
    {
        "id": 3,
        "name": "남성 하의 예시",
        "category": "men",
        "subCategory": "bottom",
        "popularity": 75
    },
    # ... 필요에 따라 더 추가
]

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    gender = data.get("gender")

    # 이메일 중복체크
    if any(u["email"] == email for u in users):
        return jsonify({"success": False, "message": "이미 가입된 이메일입니다."}), 400

    new_user = {
        "email": email,
        "password": password,
        "gender": gender
    }
    users.append(new_user)
    return jsonify({"success": True, "message": "회원가입 완료!"})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = next((u for u in users if u["email"] == email and u["password"] == password), None)
    if user:
        session["email"] = email
        return jsonify({"success": True, "message": "로그인 성공!"})
    else:
        return jsonify({"success": False, "message": "이메일 또는 비밀번호가 틀렸습니다."}), 401

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("email", None)
    return jsonify({"success": True, "message": "로그아웃 완료"})

@app.route("/products", methods=["GET"])
def get_products():
    """
    예시 쿼리 파라미터:
    /products?category=men&subCategory=underwear&sort=popularity
    """
    category = request.args.get("category")
    sub_category = request.args.get("subCategory")
    sort_type = request.args.get("sort")  # popularity

    filtered_products = products

    if category:
        filtered_products = [p for p in filtered_products if p["category"] == category]

    if sub_category:
        filtered_products = [p for p in filtered_products if p["subCategory"] == sub_category]

    if sort_type == "popularity":
        filtered_products = sorted(filtered_products, key=lambda x: x["popularity"], reverse=True)

    return jsonify(filtered_products)

@app.route("/fitting-room/<int:product_id>", methods=["GET"])
def fitting_room(product_id):
    """
    간단한 피팅룸 용 API. 선택한 상품 정보만 내려준다.
    실제로는 여기서 3D 모델, AR 등 다양한 기능을 확장 가능.
    """
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        return jsonify({
            "success": True,
            "product": product
        })
    else:
        return jsonify({"success": False, "message": "상품을 찾을 수 없습니다."}), 404

if __name__ == "__main__":
    app.run(debug=True)