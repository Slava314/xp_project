# Проект по SE

## Что успели на второй паре
- Добавить списки задач на backend
- Добавить списки задач на frontend
- Добавить обработку ошибок на frontend с сообщениями пользователю
- Изменить формат даты дедлайна таски на frontend
- Добавить тесты на backend

## Что успели на паре

- Составить требования
- Написать frontend
- Написать backend
- 2 части не связаны друг с другом (Столкнулись с ошибкой CORS policy)

## Что доделали потом

- Починили ошибку CORS policy
- Связали backend и frontend

## Требования

- Регистрация пользователя (логин, пароль)
- Создание списка задач
- Задача: название, статус, срок
- Получение списка со всеми задачами
- Редактирование параметров задачи в списке
- Удаление задачи из списка

## Frontend

### Технологии

- React
- Typescript

### Экраны

- Главная страница со списком задач
- Страница регистрации

## Backend

### Технологии

- Python
- FastApi

### Структура API

- Add user: post /user/add {login: str, password: str} {id: int}
- Add list: post /user/list/add {user_id: int, name: str} {id: int}
- Get all tasks from list: get /user/`list id`/tasks {user_id: int} {tasks: list[Task]}
- Get task: get /user/`list id`/`task id` {user_id: int} {name: str, status: str, deadline: str}
- Get task feature: get /user/`list id`/`task id`/`status, name, deadline` {} {data: str}
- Edit task: post /user/`list id`/`task id`/edit {user_id: int, feature1: str ... } {}
- Delete task: post /user/`list id`/`task id`/delete {user_id: int} {}
