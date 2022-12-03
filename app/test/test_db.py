from app.model import model

test_db = {
    'users': [model.User(login='test_user', password='password')],
    'lists': {
        'test_user': [model.TaskList(name='test user list',
                                     tasks=[model.Task(name='test user task',
                                                       status='help',
                                                       deadline=1)])]
    }
}
