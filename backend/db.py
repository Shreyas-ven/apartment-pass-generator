import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["apartment_tracker"]

users_collection = db["users"]
requests_collection = db["requests"]

users_collection = db["apartments"]
visitors_collection = db["visitors"]

