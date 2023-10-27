import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import { useEffect, useState } from "react";

const firstInitialTodos = [
  { id: 1, text: "Aprender React" },
  { id: 2, text: "Aprender JS" },
  { id: 3, text: "Aprender NextJS" },
  { id: 4, text: "Aprender NestJS" },
];

const initialTodos = JSON.parse(localStorage.getItem('todos2')) ?? firstInitialTodos;

function App() {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('todos2', JSON.stringify(todos));
  },[todos])

  const handlehandleDragEnd = result => {
    if (!result.destination) {
      return;
    };

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    
    const copyArray = [...todos];
    const [reorderedItem] = copyArray.splice(startIndex, 1);
    copyArray.splice(endIndex, 0, reorderedItem);

    setTodos(copyArray);
  }

  return (
    <>
      <DragDropContext onDragEnd={handlehandleDragEnd}>
        <h1>Todos</h1>

        <Droppable droppableId="todos">
          {(dropableProvider) => (
            <ul ref={dropableProvider.innerRef} { ...dropableProvider.droppableProps }>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} index={index} draggableId={`${todo.id}`} innerRef>
                  {
                    (draggableProvider) => (
                      <li  
                        ref={draggableProvider.innerRef}
                        {...draggableProvider.dragHandleProps}
                        {...draggableProvider.draggableProps}
                      >
                        {todo.text}
                      </li>
                    )
                  }
                </Draggable>
              ))}
              {dropableProvider.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;
