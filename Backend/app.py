import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from config import Config
from models import db, User
from flask_jwt_extended import JWTManager, create_access_token
from dotenv import load_dotenv

# ✅ Load .env variables
load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

# ✅ JWT secret from env (fallback if missing)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "supersecret")

# ✅ CORS allowed origins from env (comma-separated list, works for dev + prod)
CORS_ALLOWED_ORIGINS = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:8080,http://127.0.0.1:3000,https://your-frontend-domain.com"
).split(",")

CORS(
    app,
    origins=[origin.strip() for origin in CORS_ALLOWED_ORIGINS],
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

db.init_app(app)
jwt = JWTManager(app)


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"message": "Internal server error", "details": str(error)}), 500


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email').lower().strip()
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email').lower().strip()
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "access_token": access_token,
        "message": "Login successful",
        "user": {
            "id": user.id,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "email": user.email
        }
    }), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(
        debug=os.getenv("FLASK_DEBUG", "True").lower() == "true",
        host=os.getenv("FLASK_RUN_HOST", "127.0.0.1"),
        port=int(os.getenv("FLASK_RUN_PORT", 5000))
    )
