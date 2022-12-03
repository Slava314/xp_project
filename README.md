# Проект по SE

<!-- ## Что успели на второй паре

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
- Связали backend и frontend -->

## Оглавление

- [Требования](https://github.com/Slava314/xp_project#%D1%82%D1%80%D0%B5%D0%B1%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)
- [Как это выглядит](https://github.com/Slava314/xp_project#%D0%BA%D0%B0%D0%BA-%D1%8D%D1%82%D0%BE-%D0%B2%D1%8B%D0%B3%D0%BB%D1%8F%D0%B4%D0%B8%D1%82)
- [Frontend](https://github.com/Slava314/xp_project#frontend)
- [Backend](https://github.com/Slava314/xp_project#backend)
- [Как запустить проект](https://github.com/Slava314/xp_project#%D0%BA%D0%B0%D0%BA-%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D1%82%D0%B8%D1%82%D1%8C-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82)

## Требования

- Регистрация пользователя (логин, пароль)
- Создание списка задач
- Задача: название, статус, срок
- Получение списка со всеми задачами

## Как это выглядит

### Главный экран

![главный экран](https://github.com/Slava314/xp_project/blob/main/readme_images/home_page.png)

### Экран регистрации

![Экран регистрации](https://github.com/Slava314/xp_project/blob/main/readme_images/register_page.png)

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

<b>Add user</b>

- query:

```java
@post /user/add?login=${login}&password=${password}
```

- types:

```json
{
  "login": "str",
  "password": "str"
}
```

<b>Add list</b>

- query:

```java
@post /user/list/add?user_login=${login}&list_name=${list_name}
```

- types:

```json
{
  "user_name": "str",
  "list_name": "str"
}
```

<b>Get all tasks from list</b>

- query:

```java
@get /user/list/tasks?login=${login}&list_name=${list_name}
```

- types:

```json
{
  "login": "str",
  "list_name": "str"
}
```

<b>Add task</b>

- query:

```java
@post /user/list/task/add?login=${login}&list_name=${list_name}&task_name=${task_name}&task_status=${task_status}&task_deadline=${deadline}
```

- types:

```json
{
  "login": "str",
  "list_name": "str",
  "task_name": "str",
  "task_status": "Open | In progress",
  "task_deadline": "Date"
}
```

## Как запустить проект

Склонируйте проект командой

```
git clone https://github.com/Slava314/xp_project.git
```

Чтобы запустить сервер с бекендом локально на компьютере, используйте команду

```bash
# Предварительно установите все необходимые библиотеки для работы с FastAPI

$ uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Для запуска фронтенда выполните следующие команды

```bash
# Установите необходимые зависимости
$ cd frontend
$ npm install
```

Запустите приложение на локальном компьютере

```bash
$ npm run start
```
