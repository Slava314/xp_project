import logging

from app.model.model import User, Task, TaskList

db = {
    'users': [User(login='test_user', password='password')],
    'lists': {
        'test_user': [TaskList(name='test user list',
                               tasks=[Task(name='test user task', status='help',
                                           deadline=1)])]
    }
}


def add_user(login: str, password: str):
    user = find_user(login)
    if user:
        raise Exception('Such user exists')
    user = User(login=login, password=password, lists=[])
    logging.info('new user: ' + str(user))
    db['users'].append(user)
    db['lists'].update({login: []})
    return user


def find_user(login: str):
    for user in db['users']:
        if user.login == login:
            return user
    return None


def get_all_lists(login: str):
    if login in db['lists']:
        return db['lists'][login]
    else:
        raise Exception('No such user')


def get_list(login: str, list_name: str):
    if login in db['lists']:
        lists = db['lists'][login]
        for item in lists:
            if item.name == list_name:
                return item
        return None
    else:
        raise Exception('No such user')


def get_list_tasks(login: str, list_name: str):
    lst = get_list(login, list_name)
    if lst:
        return lst.tasks
    else:
        return None


def add_list(login: str, list_name: str):
    if login in db['lists']:
        lst = get_list(login, list_name)
        if not lst:
            task_list = TaskList(name=list_name, tasks=[])
            db['lists'][login].append(task_list)
            return task_list
        else:
            raise Exception('Such list exists')
    else:
        raise Exception('No such user')


def add_task_to_list(login: str, list_name: str, task_name: str, task_status: str,
                     task_deadline: int):
    lst = get_list(login, list_name)
    if lst:
        task = Task(name=task_name, status=task_status, deadline=task_deadline)
        lst.tasks.append(task)
        logging.info(f'new task: {task} for user: {login} in list {list_name}')
        return task
    else:
        raise Exception('No such list')
