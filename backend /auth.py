import hashlib
import uuid

class Auth:
    SALT = b"ChF+OFq12-YJ5HP3dUiS3-L("

    def __init__(self, db):
        self.users = db["users"]
        self.tokens = db["tokens"]

    def login(self, login, password, do_register):
        password = self.hash_password(password)

        user = self.users.find_one({"login": login})
        
        if user is None:
            if not do_register:
                return False

            self.users.insert_one({
                "login": login,
                "password": password,
            })

            return True

        return user["password"] == password

    def generate_token(self, login):
        token = str(uuid.uuid4())

        self.tokens.insert_one({
            "login": login,
            "token": token,
        })

        return token

    def validate_token(self, token):
        user = self.tokens.find_one({"token": token})
        if user is None:
            return None

        return user.get("login", None)

    def hash_password(self, password):
        return hashlib.sha256(str.encode(password) + self.SALT).hexdigest()
