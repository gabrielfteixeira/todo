import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { v4 as uuidv4 } from "uuid";

function App() {
  //State (estado)
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //useeffect com segundo parametro lista vazia [] é executado apenas uma vez, quando o componente é montado.
  useEffect(() => {
    async function fetchTasks() {
      //CHAMA A API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        },
      );
      //PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json();
      console.log(data);
      //ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
      //COMENTADO ABAIXO MAS É O QUE FAZ A API SER EXIBIDA
      //setTasks(data);
    }
    fetchTasks();
  }, []);

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
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
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
