import { useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { v4 as uuidv4 } from "uuid";

function App() {
  //State (estado)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar prog",
      description: "Estudar programação todos os dias",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Aprender matematica",
      description: "Estudar programação todos os dias",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Estudar biologia",
      description: "Estudar programação todos os dias",
      isCompleted: false,
    },
  ]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // SE ENTROU AQUI É PQ É IGUAL E DEVO ALTERAR
        return { ...task, isCompleted: !task.isCompleted };
      }
      //  AQUI É DIFERENTE E NÃO DEVO ALTERAR
      return task;
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-gray-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl font-bold text-slate-100 text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
