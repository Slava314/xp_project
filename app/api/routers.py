import json

from fastapi import APIRouter

import app.db as db

router = APIRouter()


@router.get("/")
def read_root():
    """Description."""
    return {"data": "heeelp"}


@router.post("/user/add")
def add_user(login: str, password: str):
    """Description."""
    return {'user': db.add_user(login, password)}


@router.post("/user/list/add")
def add_list(user_login: str, list_name: str):
    """Description."""
    return {'list': db.add_list(user_login, list_name)}


@router.get("/user/lists")
def get_lists(login: str):
    """Description."""
    try:
        lists = db.get_all_lists(login)
    except Exception as error:
        return {'error': str(error)}
    return {'lists': lists}


@router.get("/user/list/tasks")
def get_list_tasks(login: str, list_name: str):
    """Description."""
    try:
        tasks = db.get_list_tasks(login, list_name)
    except Exception as error:
        return {'error': str(error)}
    return {'tasks': tasks}


@router.post("/user/list/task/add")
def add_task(login: str, list_name: str, task_name: str, task_status: str,
             task_deadline: int):
    """Description."""
    try:
        task = db.add_task_to_list(login, list_name, task_name, task_status,
                                   task_deadline)
    except Exception as error:
        return {'error': str(error)}
    return task


# @router.get("/user/list/task/status")
# def read_root(user_login: str, list_name: str, task_name: str):
#     """Description."""
#     pass
#
#
# @router.get("/user/list/task/deadline")
# def read_root(user_login: str, list_name: str, task_name: str):
#     """Description."""
#     pass
#
#
# @router.post("/user/list/task/edit")
# def read_root(user_login: str, list_name: str):
#     """Description."""
#     pass


def to_json(data):
    return json.dumps(data.__dict__)
