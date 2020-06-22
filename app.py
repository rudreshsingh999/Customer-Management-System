from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_mail import Mail
from bson import ObjectId
import json

app = Flask(__name__)

app.config.update(
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 465,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = 'rudreshsingh999@gmail.com',
    MAIL_PASSWORD = 'bpudlfeitrrdvxxx'
)
mail = Mail(app)
mongo1 = PyMongo(app, uri="mongodb://localhost:27017/user")
CORS(app)
db = mongo1.db.user
admin_db = mongo1.db.admin
col1 = mongo1.db.userstatus



@app.route('/sendmail/<id>', methods = ["POST"])
def sendmail(id):
    subject = "Account {}"
    body = "Your account is {}. Please contact admin for queries"
    if id == "1":
        subject = subject.format("deleted")
        body = body.format("deleted")
        print("yes") 
    if id == "2":
        subject = subject.format("approved")
        body = body.format("approved")
    if id == "3":
        subject = subject.format("updated")
        body = body.format("updated")
    msg = mail.send_message(
        subject,
        sender = 'rudreshsingh999@gmail.com',
        recipients = [request.json['email']],
        body = body
    )
    return 'Mail sent'

@app.route('/status', methods = ["GET", "POST"])
def status():
    if request.method == "GET":
        o = []
        for i in col1.find():
            o.append({
                "_ID":str(ObjectId(i["_id"])),
                "name": i["name"],
                "vc": i["vc"],
                "phone": i["phone"],
                "address": i["address"],
                "payment": i["payment"]
            })
        return jsonify(o)
    elif request.method == "POST":
        # print(request.json["details"][0]["name"])
        id = col1.insert({
            "name": request.json["name"],
            "vc": request.json["vc"],
            "phone": request.json["phone"],
            "address": request.json["address"],
            "payment": {"January": False,
                        "February": False,
                        "March": False,
                        "April": False,
                        "May": False,
                        "June": False,
                        "July": False,
                        "August": False,
                        "September": False,
                        "October": False,
                        "November": False,
                        "December": False}
        })
        return jsonify(str(ObjectId(id)))

@app.route('/<id>', methods=["DELETE"])
def delete1(id):
    col1.delete_one({"_id":ObjectId(id)})
    return jsonify({"message":"deleted"})


@app.route('/status/<id>', methods=["PUT"])
def put_all(id):
    if request.method == "PUT":
        col1.update({"_id":ObjectId(id)}, {"$set": {
            "name" : request.json["name"],
            "phone" : request.json["phone"],
            "vc" : request.json["vc"],
            "address": request.json["address"],
            "payment": request.json["payment"]
        }})
        return jsonify({"message":"updated"})

@app.route('/status/payment/<id>', methods=["PUT"])
def put_payment(id):
    if request.method == "PUT":
        col1.update({"_id":ObjectId(id)}, {"$set": {
            "payment": request.json["payment"],
            "name": request.json["name"],
            "vc": request.json["vc"]
        }})
        return jsonify({"message":"updated"})
# @app.route('/<id>', methods = ["PUT"])
# def add(id):
#     if request.method == "PUT":
#         res = col1.find_one({"_id": ObjectId(id)})
#         list_add = res["details"]
#         list_add.append(request.json)
#         col1.update({"_id":ObjectId(id)}, {"$set" : {
#             "details": list_add
#         }})
#         return jsonify({"message":"updated"})


@app.route('/', methods = ["GET", "POST"])
def getpost():
    if request.method == "GET":
        o =  []
        for i in admin_db.find():
            o.append({
                "_ID":str(ObjectId(i["_id"])),
                "username": i["username"],
                "password": i["password"],
                "email": i["email"],
                "customers": i["customers"]
            })
        return jsonify(o)
    elif request.method == "POST":
        print(request.json)
        id = admin_db.insert({
            "username":request.json["username"], 
            "password":request.json["password"],
            "email":request.json["email"],
            "customers":request.json["customers"]
            })
        return jsonify(str(ObjectId(id)))

@app.route('/<id>', methods = ["PUT"])
def addCustomer(id):
    if request.method == "PUT":
        res = admin_db.find_one({"_id": ObjectId(id)})
        list_add = res["customers"]
        list_add.append(request.json)
        admin_db.update({"_id":ObjectId(id)}, {"$set" : {
            "customers": list_add
        }})
        return jsonify({"message":"updated"})

@app.route('/signin_admin', methods = ['POST'])
def post():
    for i in admin_db.find():
        if(i["username"] == request.json["username"]):
            if(i["password"] == request.json["password"]):
                return jsonify({"message" : "success"})
            else:
                return jsonify({"message" : "password incorrect"})

    return jsonify({"message" : "user not registered"})

@app.route('/signin_customer', methods = ['POST'])
def post_customer():
    for i in admin_db.find():
        list_customers = i["customers"]
        for x in list_customers:
            if(x["username"] == request.json["username"]):
                if(x["password"] == request.json["password"]):
                    return jsonify({"message" : "success"})
                else:
                    return jsonify({"message" : "password incorrect"})

    return jsonify({"message" : "user not registered"})

@app.route('/<id>', methods=["DELETE"])
def delete(id):
    admin_db.delete_one({"_id":ObjectId(id)})
    return jsonify({"message":"deleted"})

@app.route('/<id1>/<username>', methods=["DELETE"])
def deleteCustomer(id1, username):
    res = admin_db.find_one({"_id": ObjectId(id1)})
    list_customers = res["customers"]
    updated_res = list(filter(lambda i: i['username'] != username, list_customers))
    admin_db.update({"_id":ObjectId(id1)}, {"$set" : {
        "customers": updated_res
    }})
    return jsonify({"message":"deleted"})


@app.route('/getone/<id>/<username>', methods=["GET"])
def getone(id, username):
    res = admin_db.find_one({"_id": ObjectId(id)})
    list_customers = res["customers"]
    for i in range(len(list_customers)):
        if(list_customers[i].get("username") == username):
            return {"id": list_customers[i]["id"], "username": username, "email": list_customers[i]["email"], "password": list_customers[i]["password"], "is_new": list_customers[i]["is_new"]}
    

@app.route('/<id>/<username>', methods = ["PUT"])
def updateCustomer(id, username):
    if request.method == "PUT":
        res = admin_db.find_one({"_id": ObjectId(id)})
        list_add = res["customers"]
        for i in range(len(list_add)):
            if(list_add[i].get("username") == username):
                list_add[i]["email"] = request.json["email"]
                list_add[i]["password"] = request.json["password"]
                list_add[i]["is_new"] = "0"
                break
        admin_db.update({"_id":ObjectId(id)}, {"$set" : {
            "customers": list_add
        }})
        return jsonify({"message":"updated"})

