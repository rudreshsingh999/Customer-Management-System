from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId
import json

app = Flask(__name__)
CORS(app) 
app.config["MONGO_URI"] = 'mongodb://localhost:27017/demo2'
mongo = PyMongo(app)
db = mongo.db.demo2
mongo1 = PyMongo(app, uri="mongodb://localhost:27017/user")
db1 = mongo1.db.user


@app.route('/', methods = ["GET", "POST"])
def getpost():
    if request.method == "GET":
        o = []
        for i in db.find():
            o.append({
                "_ID":str(ObjectId(i["_id"])), 
                "name": i["name"], 
                "email": i["email"], 
                "password": i["password"]
                })
        return jsonify(o)
    elif request.method == "POST":
        print(request.json)
        id = db.insert({
            "name":request.json["name"], 
            "email":request.json["email"], 
            "password":request.json["password"]
            })
        return jsonify(str(ObjectId(id)))
        

@app.route('/<id>', methods=["DELETE", "PUT"])
def deleteput(id):
    if request.method == "DELETE":
        db.delete_one({"_id":ObjectId(id)})
        return jsonify({"message":"deleted"})
    elif request.method == "PUT":
        db.update({"_id":ObjectId(id)}, {"$set": {
            "name" : request.json["name"],
            "email" : request.json["email"],
            "password" : request.json["password"]
        }})
        return jsonify({"message":"updated"})

@app.route('/getone/<id>', methods = ['GET'])
def getone(id):
    res = db.find_one({"_id": ObjectId(id)})
    return {"_ID":str(ObjectId(res["_id"])), "name": res["name"], "email": res["email"], "password": res["password"]}

@app.route('/signin', methods = ['POST'])
def post():
    for i in db1.find():
        if(i["username"] == request.json["username"]):
            if(i["password"] == request.json["password"]):
                return jsonify({"message" : "success"})
            else:
                return jsonify({"message" : "password incorrect"})

    return jsonify({"message" : "user not registered"})

@app.route('/signup', methods = ["GET", "POST"])
def getpost_user():
    if request.method == "GET":
        o =  []
        for i in db1.find():
            o.append({
                "_ID":str(ObjectId(i["_id"])),
                "username": i["username"],
                "password": i["password"],
                "email": i["email"]
            })
        return jsonify(o)
    elif request.method == "POST":
        print(request.json)
        id = db1.insert({
            "username":request.json["username"], 
            "password":request.json["password"],
            "email":request.json["email"]
            })
        return jsonify(str(ObjectId(id)))
