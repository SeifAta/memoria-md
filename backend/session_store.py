import uuid


class SessionStore:

    def __init__(self):
        self.sessions = {}

    def create(self):

        session_id = str(uuid.uuid4())

        self.sessions[session_id] = {
            "blueprint": None,
            "patient_case": None,
            "conversation": [],
            "examiner_report": None,
            "reinforcement": None,
        }

        return session_id

    def exists(self, session_id):

        return session_id in self.sessions

    def get(self, session_id):

        return self.sessions[session_id]

    def save_blueprint(
        self,
        session_id,
        blueprint,
    ):

        self.sessions[session_id]["blueprint"] = blueprint

    def save_case(
        self,
        session_id,
        patient_case,
    ):

        self.sessions[session_id]["patient_case"] = patient_case

    def add_message(
        self,
        session_id,
        role,
        message,
    ):

        self.sessions[session_id]["conversation"].append(
            {
                "role": role,
                "message": message,
            }
        )

    def save_examiner(
        self,
        session_id,
        report,
    ):

        self.sessions[session_id]["examiner_report"] = report

    def save_reinforcement(
        self,
        session_id,
        reinforcement,
    ):

        self.sessions[session_id]["reinforcement"] = reinforcement


store = SessionStore()