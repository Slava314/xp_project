import { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import axios from "axios";

type TaskInterface = {
  name: string;
  status: string;
  deadline: number;
};

type ListInterface = {
  name: string;
  tasks: TaskInterface[];
};

async function assignTaskToList(
  login: string,
  listName: string,
  name: string,
  status: string,
  deadline: number
) {
  try {
    const { data } = await axios.post(
      `http://localhost:8000/user/list/task/add?login=${login}&list_name=${listName}&task_name=${name}&task_status=${status}&task_deadline=${deadline}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error;
    } else {
      console.log("unexpected error: ", error);
      return error;
    }
  }
}

async function getListTasks(listName: string) {
  try {
    let login = localStorage.getItem("login");
    if (login === null) {
      login = "";
    }
    const { data } = await axios.get(
      `http://0.0.0.0:8000/user/list/tasks?login=${login}&list_name=${listName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error;
    } else {
      console.log("unexpected error: ", error);
      return error;
    }
  }
}

async function addList(listName: string) {
  try {
    let login = localStorage.getItem("login");
    if (login === null) {
      login = "";
    }
    const { data } = await axios.post(
      `http://0.0.0.0:8000/user/list/add?user_login=${login}&list_name=${listName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error;
    } else {
      console.log("unexpected error: ", error);
      return error;
    }
  }
}

async function getUserLists() {
  try {
    let login = localStorage.getItem("login");
    if (login === null) {
      login = "";
    }
    const { data } = await axios.get(
      `http://0.0.0.0:8000/user/lists?login=${login}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error;
    } else {
      console.log("unexpected error: ", error);
      return error;
    }
  }
}

export default function Home() {
  const [lists, setLists] = useState<ListInterface[]>([]);
  const [listName, setListName] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [deadlineStr, setDeadlineStr] = useState("");

  async function fetchLists() {
    let res = await getUserLists();
    if (res.response?.status === 422) {
      alert("Oops... Something went wrong");
      return;
    }
    let lists = res.lists;
    setLists(lists);
  }

  async function updateTasks(listName: string, newTask: TaskInterface) {
    await fetchLists();
    let newLists = lists.map((obj) => {
      if (obj.name === listName) {
        return { ...obj, tasks: [...obj.tasks, newTask] };
      }
      return obj;
    });
    setLists(newLists);
  }

  useEffect(() => {
    fetchLists();
  }, []);

  const addTodo = async () => {
    if (name !== "" && status !== "" && deadlineStr !== "" && listName !== "") {
      let deadline = new Date(deadlineStr);
      if (isNaN(deadline.valueOf())) {
        alert("Please provide valid deadline date in format YYYY-MM-DD");
        return;
      }
      let login = localStorage.getItem("login");
      if (login === null) {
        login = "";
      }
      let newTodo = await assignTaskToList(
        login,
        listName,
        name,
        status,
        deadline.valueOf()
      );
      if (newTodo.error === "No such list") {
        await addList(listName);
        newTodo = await assignTaskToList(
          login,
          listName,
          name,
          status,
          deadline.valueOf()
        );
      }
      if (newTodo.error === "No such user") {
        alert("Please register before creating tasks");
        return;
      }
      if (newTodo.response?.status === 422) {
        alert(
          "Bad request.\nName and status must be text\nDeadline is a date in format YYYY-MM-DD"
        );
        return;
      }
      console.log(newTodo);
      await fetchLists();
      console.log(lists);
      await updateTasks(listName, newTodo);
      setListName("");
      setName("");
      setStatus("");
      setDeadlineStr("");
    }
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.header}>Список задач</h1>
      <div className={styles.addTask}>
        <input
          className={styles.addInput}
          type="text"
          placeholder="Название листа"
          name="list"
          value={listName}
          onChange={(e) => {
            setListName(e.target.value);
          }}
        />
        <input
          className={styles.addInput}
          type="text"
          placeholder="Новая задача"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className={styles.addInput}
          type="text"
          placeholder="Статус"
          name="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        />
        <input
          className={styles.addInput}
          type="text"
          placeholder="Дедлайн"
          name="deadline"
          value={deadlineStr}
          onChange={(e) => {
            setDeadlineStr(e.target.value);
          }}
        />
        <button className={styles.addButton} onClick={addTodo}>
          Добавить
        </button>
      </div>
      <div className={styles.separator} />
      {lists?.length > 0 ? (
        lists.map((list, index) => (
          <div className={styles.list} key={index}>
            <h1 className={styles.listName}>{list.name}</h1>
            <ul className={styles.todoList}>
              {list.tasks.map((task, index) => (
                <li className={styles.todo} key={index}>
                  <h1>{task.name}</h1>
                  <div className={styles.todoParams}>
                    <p>Статус: {task.status}</p>
                    <p>Дедлайн: {new Date(task.deadline).toDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className={styles.empty}>
          <p>Пока задач нет</p>
        </div>
      )}
    </div>
  );
}
