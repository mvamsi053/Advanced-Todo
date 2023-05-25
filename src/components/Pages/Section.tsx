import React, { useState } from 'react';

import { TodoList } from '../Models/TodosModel';
import { Todo } from '../Models/Todo';

import SectionInput from '../SectionInput';
import TodoCard from '../TodoCard';
import { EditTodo } from '../Models/EditTodo';

interface Props {
  todoObj: TodoList;
  allLists: TodoList[];
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
  setEditTodoData: React.Dispatch<React.SetStateAction<EditTodo | undefined>>;
}

function Section({
  todoObj,
  setTodoLists,
  allLists,
  setEditTodoData,
}: Props): React.JSX.Element {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoDescrip, setTodoDescrip] = useState<string>('');

  function handleAddTodo(e: React.SyntheticEvent) {
    e.preventDefault();

    if (todoDescrip && todoTitle) {
      const updatedLists = allLists.map((todoobj) => {
        if (todoobj.id === todoObj.id) {
          const newTodo: Todo = {
            id: new Date().valueOf(),
            title: todoTitle,
            description: todoDescrip,
            isDone: false,
          };
          const updatedTodos = todoobj.todos
            ? [...todoobj.todos, newTodo]
            : [newTodo];
          return {
            ...todoobj,
            todos: updatedTodos,
          };
        }
        return todoobj;
      });

      setTodoLists(updatedLists);

      setTodoTitle('');
      setTodoDescrip('');
    }
  }

  return (
    <div className='px-4 min-w-[20vw]  w-[20vw] min-h-screen'>
      <p className='border rounded-xl p-2 font-semibold'>
        <span className='font-normal'>List Name: </span>
        {todoObj.id}
      </p>
      <SectionInput
        todoTitle={todoTitle}
        todoDescrip={todoDescrip}
        setTodoTitle={setTodoTitle}
        setTodoDescrip={setTodoDescrip}
        handleSubmit={handleAddTodo}
      />
      {todoObj?.todos?.map((todo) => {
        return (
          <TodoCard
            key={todo.id}
            title={todo.title}
            isDone={todo.isDone}
            description={todo.description}
            setEditTodoData={setEditTodoData}
            listId={todoObj.id}
            id={todo.id}
          />
        );
      })}
    </div>
  );
}
export default Section;
