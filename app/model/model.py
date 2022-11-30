from typing import List

from pydantic import BaseModel


class Task(BaseModel):
    """Task class."""

    name: str
    status: str
    deadline: int

class TaskList(BaseModel):
    """Task class."""

    name: str
    tasks: List[Task]

class User(BaseModel):
    """User class."""

    login: str
    password: str
