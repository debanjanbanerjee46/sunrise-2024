import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";


let tasks: Task[] = [...initialTasks];
let running_group = 1;
let upcomming = 2;
export function initializeTasks() {
  return tasks;
}
export function getTodoTasks(): Task[] {
  return tasks.filter((task) => !task.completed && task.group != running_group);
}

export function getInProgressTasks(): Task[] {
  const task=tasks.filter((task) => !task.completed && task.group == running_group );
  if(task.length<2){
    task.push(tasks[upcomming]);
  }
  return task;
}

export function getActiveTasks(): Task[] {
  const minCompletedGroup = Math.min(
    ...tasks.filter((task) => task.completed).map((task) => task.group),
    Infinity
  );
  const maxIncompleteGroup = Math.min(
    ...tasks.filter((task) => !task.completed).map((task) => task.group),
    minCompletedGroup + 1
  );
  return tasks.filter(
    (task) => !task.completed && task.group <= maxIncompleteGroup
  );
}

export function getCompletedTasks(): Task[] {
  let arr = tasks.filter((task) => task.completed);

 
  return arr;
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const task = tasks.find((task) => task.title === taskTitle);
  if (task && running_group == task.group) {
    task.completed = true;
    upcomming++;
  }

  let taskcom = tasks.filter((task) => task.group == running_group);
  for (let i = 0; i < taskcom.length; i++) {
    if (!taskcom[i].completed) {
      break;
    } else if (taskcom[i].completed && i == taskcom.length - 1) {
      running_group++;
    }
  }
}

export function createTask(
  title: string,
  description: string,
  persona: string,
  group: number
): void {
  
  const newTask:Task= {id:tasks.length + 1, title, description, persona, group,completed:false};
  tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Task>): void {
  tasks[taskId - 1] = { ...tasks[taskId - 1], ...updatedTask };
}

export function deleteTask(taskId: number): void {
  tasks.splice(taskId - 1, 1);
}
