from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from config import Config
from models import db, User
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
app.config.from_object(Config)

# JWT secret (add in .env for production)
app.config["JWT_SECRET_KEY"] = app.config.get("SECRET_KEY", "supersecret")

db.init_app(app)
jwt = JWTManager(app)

# Allow React frontend origin and allow credentials
CORS(app, origins=["http://localhost:8080"], supports_credentials=True)

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"message": "Internal server error", "details": str(error)}), 500

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email').lower().strip()   # ✅ Normalize email
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    # ✅ Hash password properly
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
    email = data.get('email').lower().strip()   # ✅ Normalize email
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    # ✅ Use JWT instead of plain ID
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
    app.run(debug=True)
