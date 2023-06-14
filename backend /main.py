from pymongo import MongoClient

from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import statistics
import auth

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "secret-key-motya"
jwt = JWTManager(app)

db = MongoClient('localhost', 27017)["db"]

  #Initialize TensorFlow Serving model 
    #for using tf-servering indicate correct path to model
    #stats_service.model.initialize_model("http://localhost:8501/v1/models/model_name:predict")

auth_service = auth.Auth(db)
stats_service = statistics.Statistics(statistics.Model("predict/test_model"), db)

@app.route("/login", methods=["POST"])
def login():
    login = request.json.get("login", None)
    password = request.json.get("password", None)
    do_register = request.json.get("do_register", False)

    is_password_ok = auth_service.login(login, password, do_register)

    if not is_password_ok:
        return jsonify({"msg": "Bad password"}), 401

    access_token = create_access_token(identity=login)
    return jsonify(access_token=access_token)

@app.route("/token", methods=["POST"])
@jwt_required()
def generate_token():
    return jsonify(token=auth_service.generate_token(get_jwt_identity()))


@app.route("/message/<conference_id>")
@jwt_required()
def stats_view(conference_id):
    current_user = get_jwt_identity()

    stats = stats_service.build(current_user, conference_id)
    if stats is None:
        return jsonify({"msg": "not authorized"}), 403

    return jsonify(stats)

@app.route("/message/<conference_id>/append", methods=["POST"])
def stats_append(conference_id):
    token = request.json.get("token")  # TODO: fields validation
    user_id = request.json.get("user_id")
    user_name = request.json.get("user_name")
    message = request.json.get("message")

    login = auth_service.validate_token(token)
    if login is None:
        return jsonify({"msg": "not authorized"}), 403

    stats_service.append(
        login,
        conference_id,
        user_id,
        user_name,
        message,
    )

    return ('', 200)

if __name__ == "__main__":
    app.run()
