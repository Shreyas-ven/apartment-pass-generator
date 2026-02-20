from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from db import users_collection, visitors_collection
import uuid
import random
import string
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# ---------- GENERATE APARTMENT ID ----------
def generate_apartment_id():
    while True:
        apartment_id = "APA" + "".join(random.choices(string.digits, k=4))
        if not users_collection.find_one({"apartment_id": apartment_id}):
            return apartment_id

# ---------- HOME ----------
@app.route("/")
def home():
    return jsonify({"message": "Backend Running"})

# ---------- REGISTER ----------
@app.route("/apartment/register", methods=["POST"])
def apartment_register():
    data = request.json

    if users_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "Apartment already registered"}), 400

    apartment_id = generate_apartment_id()

    apartment = {
        "apartment_id": apartment_id,
        "apartment_name": data["apartment_name"],
        "email": data["email"],
        "password": generate_password_hash(data["password"]),
        "location": data.get("location"),
        "state": data.get("state"),
        "country": data.get("country"),
        "owner_phone": data.get("owner_phone")
    }

    users_collection.insert_one(apartment)

    return jsonify({
        "message": "Apartment registered successfully",
        "apartment_id": apartment_id
    })

# ---------- LOGIN ----------
@app.route("/apartment/login", methods=["POST"])
def apartment_login():
    data = request.json
    apartment = users_collection.find_one({"email": data["email"]})

    if not apartment or not check_password_hash(apartment["password"], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "apartment": {
            "apartment_name": apartment["apartment_name"],
            "email": apartment["email"],
            "apartment_id": apartment["apartment_id"]
        }
    })

# ---------- VISITOR LOGIN ----------
@app.route("/visitor/login", methods=["POST"])
def visitor_login():
    data = request.json
    pass_key = str(uuid.uuid4())[:8]

    visitor = {
        "name": data["name"],
        "phone": data["phone"],
        "block": data["block"],
        "room": data["room"],
        "purpose": data["purpose"],
        "pass_key": pass_key,
        "apartment_id": data["apartment_id"],
        "status": "Pending"
    }

    visitors_collection.insert_one(visitor)

    return jsonify({
        "message": "Visitor logged successfully",
        "pass_key": pass_key
    })

# ---------- VISITOR STATUS ----------
@app.route("/visitor/status/<pass_key>", methods=["GET"])
def visitor_status(pass_key):
    visitor = visitors_collection.find_one({"pass_key": pass_key})

    if not visitor:
        return jsonify({"error": "Invalid Pass Key"}), 404

    return jsonify({
        "name": visitor["name"],
        "block": visitor["block"],
        "room": visitor["room"],
        "purpose": visitor["purpose"],
        "status": visitor["status"]
    })

# ---------- APPROVE VISITOR ----------
@app.route("/visitor/approve/<id>", methods=["PUT"])
def approve_visitor(id):
    visitors_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"status": "Success"}}
    )
    return jsonify({"message": "Visitor approved"})

@app.route("/visitors/<apartment_id>", methods=["GET"])
def get_visitors_by_apartment(apartment_id):
    visitors = list(visitors_collection.find({"apartment_id": apartment_id}))

    formatted = []
    for v in visitors:
        formatted.append({
            "_id": str(v["_id"]),
            "name": v.get("name"),
            "phone": v.get("phone"),
            "block": v.get("block"),
            "room": v.get("room"),
            "purpose": v.get("purpose"),
            "pass_key": v.get("pass_key"),
            "apartment_id": v.get("apartment_id"),
            "status": v.get("status")
        })

    return jsonify(formatted)

@app.route("/apartment/<apartment_id>", methods=["GET"])
def get_apartment(apartment_id):
    apartment = users_collection.find_one({"apartment_id": apartment_id})

    if not apartment:
        return jsonify({"error": "Apartment not found"}), 404

    return jsonify({
        "apartment_name": apartment["apartment_name"],
        "email": apartment["email"],
        "apartment_id": apartment["apartment_id"]
    })


if __name__ == "__main__":
    app.run(debug=True)