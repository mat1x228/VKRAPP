from bson.son import SON
from datetime import datetime
from dataclasses import dataclass
from typing import List
import requests
import http



class Prediction:
    NEUTRAL_SCORE = 0
    INDECENCY_SCORE = 0.26
    INSULT_SCORE = 0.31
    THREAT_SCORE = 0.43

    INVALID = -1
    NEUTRAL = 0
    INDECENCY = 1
    INSULT = 2
    THREAT = 3

    def to_str(prediction: int):
        if prediction == Prediction.NEUTRAL:
            return "neutral"
        elif prediction == Prediction.INDECENCY:
            return "indecency"
        elif prediction == Prediction.INSULT:
            return "insult"
        elif prediction == Prediction.THREAT:
            return "threat"        

    def from_str(prediction: str):
        if prediction == "neutral":
            return Prediction.NEUTRAL
        elif prediction == "indecency":
            return Prediction.INDECENCY
        elif prediction == "insult":
            return Prediction.INSULT
        elif prediction == "threat":
            return Prediction.THREAT
        return Prediction.INVALID

class Model:
    def __init__(self, url):
        self.url = url

#for tf-servering 
#return predict string
#  def initialize_model(self, serving_url):
#         self.model = tf.keras.models.load_model(serving_url)
#         self.model.make_predict_function()

#     def predict(self, message: str):
#         if self.model is None:
#             return Prediction.INVALID

        prediction = self.model.predict([message])
        prediction_class = np.argmax(prediction)
        return Prediction.from_str(prediction_class)


    def predict(self, message: str):
        resp = requests.get(self.url, json={ # TODO: replace get with post
            "instances": [message]
        })

        if resp.status_code == http.HTTPStatus.OK:
            result = resp.json()

            prediction = result.get("prediction", None)
            if prediction is None:
                return Prediction.INVALID

            return Prediction.from_str(prediction)

        return Prediction.INVALID

class Statistics:
    def __init__(self, model, db):
        self.model = model
        self.messages = db["messages"]
        self.conferences = db["conferences"]

    def has_conference_access(self, conference_id, login):
        conference = self.conferences.find_one({"conference_id": conference_id})
        if conference is None:
            self.conferences.insert_one({
                "conference_id": conference_id,
                "login": login
            })

            return True

        return conference["login"] == login

    def build(self, login: str, conference_id: str):
        if not self.has_conference_access(conference_id, login):
            return None

        stats = {}

        for message in self.messages.find({"conference_id": conference_id}):
            user_id = message["user_id"]
            prediction = message["prediction"]

            user_stats = stats.get(
                user_id, 
                {   
                    "neutral": 0,
                    "indecency": 0,
                    "insult": 0,
                    "threat": 0,
                    "total_messages": 0,
                    "user_id": message["user_id"],
                    "user_name": message["user_name"],
                    "messages": [], 
                },
            )

            user_stats["messages"].append({
                "created_at": message["created_at"],
                "prediction": Prediction.to_str(prediction)
            })

            if prediction == Prediction.NEUTRAL:
                user_stats["neutral"] += 1
            elif prediction == Prediction.INDECENCY:
                user_stats["indecency"] += 1
            elif prediction == Prediction.INSULT:
                user_stats["insult"] += 1
            elif prediction == Prediction.THREAT:
                user_stats["threat"] += 1

            user_stats["total_messages"] += 1

            stats[user_id] = user_stats

        for _, user in stats.items():
            user["rating"] = (user["neutral"] * Prediction.NEUTRAL_SCORE 
            + user["indecency"] * Prediction.INDECENCY_SCORE 
            + user["insult"] * Prediction.INSULT_SCORE
            + user["threat"] * Prediction.THREAT_SCORE) / user["total_messages"]

        return stats

    def append(self, login: str, conference_id: str, user_id: str, user_name: str, message: str):
        if not self.has_conference_access(conference_id, login):
            return

        prediction = self.model.predict(message)

        if prediction == Prediction.INVALID:
            return

        self.messages.insert_one({
            "conference_id": conference_id,
            "user_id": user_id,
            "user_name": user_name,
            "prediction": prediction,
            "created_at": datetime.now()
        })
