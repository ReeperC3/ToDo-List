import { ProjectMaker, ToDoLists, ListItem } from "./makeproject";
import { index } from "./DOMstuff";

export default class Storage {

  static setToDoList(data) {
    localStorage.setItem('todoList', JSON.stringify(data))
    localStorage.setItem('index', JSON.stringify(index))
  }

  static getToDoList() {
    if (localStorage.getItem('todoList') == undefined) {
      localStorage.setItem('todoList', JSON.stringify(new ToDoLists))
    }
    const todoList = Object.assign(
      new ToDoLists,
      JSON.parse(localStorage.getItem('todoList'))
    )
    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(new ProjectMaker, project))
    )

    todoList
      .getProjects()
      .forEach((project) =>
        project.setItems(
          project.getItems().map((task) => Object.assign(new ListItem, task))
        )
      )

    return todoList
  }

  static getIndex() {
    return localStorage.getItem('index')
  }

  static addProject(project) {
    const todoList = Storage.getToDoList()
    todoList.addToProjectsArray(project)
    Storage.setToDoList(todoList)
  }

  static removeProject(project) {
    const todoList = Storage.getToDoList()
    todoList.removeProject(project)
    Storage.setToDoList(todoList)
  }

  static addItem(projectName, item) {
    const todoList = Storage.getToDoList()
    const project = todoList.getProject(projectName)
    project.addItem(item)
    todoList.setProject(projectName, project)
    Storage.setToDoList(todoList)
  }

  static removeItem(projectName, itemName) {
    const todoList = Storage.getToDoList()
    const project = todoList.getProject(projectName)
    const item = project.findItem(itemName)
    project.removeItem(item)
    Storage.setToDoList(todoList)
  }
}

export { Storage }




