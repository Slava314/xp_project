import copy
import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.db import db
from app.main import app
from app.model import model
from app.test.test_db import test_db


class IntegrationTests(unittest.TestCase):
    client = TestClient(app)
    test_user = model.User(login="Bob", password="pass1Word")
    test_list = model.TaskList(name='test list',
                               tasks=[model.Task(name='test user task', status='help',
                                                 deadline=1)])

    @patch.dict(db, copy.deepcopy(test_db), clear=True)
    def test_get_all_lists(self):
        response = self.client.get(
            "/user/lists",
            params={
                "login": "test_user",
            }, )
        self.assertEqual(response.status_code, 200)
        actual = {"lists": db["lists"]["test_user"]}
        self.assertEqual(response.json(), actual)

    @patch.dict(db, copy.deepcopy(test_db), clear=True)
    def test_add_user(self):
        response = self.client.post(
            "/user/add",
            params={
                "login": self.test_user.login,
                "password": self.test_user.password,
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'user': {'login': self.test_user.login,
                                                    'password': self.test_user.password, }})

    @patch.dict(db, copy.deepcopy(test_db), clear=True)
    def test_get_tasks(self):
        self.client.post(
            "/users/sign_up",
            json={
                "login": self.test_user.login,
                "password": self.test_user.password,
            },
        )
        response = self.client.post(
            "/users/courses/add/1",
            json={
                "login": self.test_user.login,
                "password": self.test_user.password,
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"course_name": "Python web"})
    #
    # @patch.dict(db, copy.deepcopy(test_db), clear=True)
    # def test_add_task(self):
    #     pass
