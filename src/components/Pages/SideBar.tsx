import React, { useState } from 'react';
import SectionInput from '../SectionInput';
import { TodoList } from '../Models/TodosModel';
import { useMantineColorScheme } from '@mantine/core';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { EditTodo } from '../Models/EditTodo';
import { TiTick } from 'react-icons/ti';
import { ImCheckboxUnchecked } from 'react-icons/im';

interface Props {
  id: number;
  title: string;
  description: string;
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
  isEdit?: boolean;
  lisId: string;
  setEditTodoData: React.Dispatch<React.SetStateAction<EditTodo | undefined>>;
  isDone: boolean;
}

function SideBar({
  title,
  isDone,
  lisId,
  description,
  id,
  setTodoLists,
  isEdit,
  setEditTodoData,
}: Props): React.JSX.Element {
  const [todoTitle, setTodoTitle] = useState<string>(title);
  const [todoDescrip, setTodoDescrip] = useState<string>(description);
  const [isRead, setIsread] = useState(isDone);
  const { colorScheme } = useMantineColorScheme();

  function handleEditTodo(e: React.SyntheticEvent) {
    e.preventDefault();

    if (todoDescrip && todoTitle) {
      setTodoLists((prevLists) => {
        return prevLists.map((list) => {
          const updatedTodos = list.todos?.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                title: todoTitle,
                description: todoDescrip,
              };
            }
            return todo;
          });

          return {
            ...list,
            todos: updatedTodos,
          };
        });
      });
      setEditTodoData(undefined);
    }
  }
  const handleDeleteTodo = (listId: string, todoId: number) => {
    setTodoLists((todoLists) =>
      todoLists.map((list) => {
        if (list.id === listId) {
          const updatedTodos = list.todos?.filter((todo) => todo.id !== todoId);
          return { ...list, todos: updatedTodos };
        }
        return list;
      })
    );
    setEditTodoData(undefined);
  };
  const hanldeRead = (listId: string, todoId: number) => {
    if (todoDescrip && todoTitle) {
      setIsread((prev) => !prev);
      setTodoLists((todoLists) =>
        todoLists.map((list) => {
          if (list.id === listId) {
            const updatedTodos = list.todos?.map((todo) => {
              if (todo.id === todoId) {
                return { ...todo, isDone: !todo.isDone };
              }
              return todo;
            });
            return { ...list, todos: updatedTodos };
          }
          return list;
        })
      );
    }
  };

  return (
    <div
      className={`flex h-[91vh] flex-col items-center ${
        colorScheme === 'dark' ? 'bg-[#1a1b1e]' : 'bg-white'
      } `}
    >
      <div className='border-b w-full text-center p-3 font-semibold flex items-center gap-x-4'>
        <IoMdArrowRoundBack
          className='cursor-pointer hover:rotate-180 transition-all ease-in-out duration-200 scale-110 '
          onClick={() => setEditTodoData(undefined)}
        />
        <p> Edit todo</p>
        <button
          className={` ${
            colorScheme === 'dark' ? 'bg-red-700' : 'bg-red-400'
          } rounded-full p-2  hover:drop-shadow-2xl hover:scale-90 transition-all`}
          onClick={() => handleDeleteTodo(lisId, id)}
        >
          <MdDelete />
        </button>

        <button
          className={` ${
            colorScheme === 'dark' ?'bg-green-700' : 'bg-green-400 '
          } rounded-full p-2  hover:drop-shadow-2xl hover:scale-90 transition-all`}
          onClick={() => hanldeRead(lisId, id)}
        >
          {!isRead ? <TiTick /> : <ImCheckboxUnchecked />}
        </button>
      </div>
      <SectionInput
        todoTitle={todoTitle}
        todoDescrip={todoDescrip}
        setTodoTitle={setTodoTitle}
        setTodoDescrip={setTodoDescrip}
        handleSubmit={handleEditTodo}
        isEdit={isEdit}
      />
    </div>
  );
}

export default SideBar;
