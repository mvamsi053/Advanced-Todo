import React, { useState, useEffect, useRef } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';

import Section from './components/Pages/Section';
import { TodoList } from './components/Models/TodosModel';
import Input from './components/Input';
import SideBar from './components/Pages/SideBar';

import ThemeSwitch from './components/ThemeSwitch';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';
import { EditTodo } from './components/Models/EditTodo';

function App(): React.JSX.Element {
  const [todolistTitle, setTodolistTitle] = useState<string>('');
  const [todoList, setTodoLists] = useState<TodoList[]>(
    JSON.parse(localStorage.getItem('todos') ?? '[]') || []
  );

  const [edittodoData, setEditTodoData] = useState<EditTodo>();
  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setEditTodoData(undefined);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditTodoData(undefined);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  function handleAddTodoList(e: React.SyntheticEvent) {
    e.preventDefault();
    if (todolistTitle) {
      setTodoLists((prevData) => [...prevData, { id: todolistTitle }]);
      setTodolistTitle('');
    }
  }
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <div>
          <div className='bg-blue-500 flex justify-center items-center gap-x-4 text-white p-4  font-semibold'>
            <p> My Todo</p>
            <ThemeSwitch />
          </div>
          <div className='flex justify-between relative '>
            <div className='flex w-full  items-start mt-4 gap-x-4'>
              <div className='flex gap-x-4 items-start overflow-x-scroll'>
                {todoList.map((todos) => {
                  return (
                    <Section
                      key={todos.id}
                      todoObj={todos}
                      allLists={todoList}
                      setTodoLists={setTodoLists}
                      setEditTodoData={setEditTodoData}
                    />
                  );
                })}
              </div>
              <Input
                value={todolistTitle}
                setValue={setTodolistTitle}
                placeholder='Enter List name'
                handleSubmit={handleAddTodoList}
              />
            </div>
            <div
              ref={sidebarRef}
              className={`shadow-one h-[91vh] border-l-blue-500 border-t-0 border-b-0 border-r-0 border-4   ease-linear duration-300 absolute z-[80] right-0 overflow-hidden select-none ${
                edittodoData ? 'w-64 ' : 'w-0'
              }`}
            >
              {edittodoData && (
                <SideBar
                  id={edittodoData?.id}
                  title={edittodoData?.title}
                  description={edittodoData?.description}
                  setTodoLists={setTodoLists}
                  isEdit={true}
                  lisId={edittodoData?.listId}
                  setEditTodoData={setEditTodoData}
                  isDone={edittodoData?.isDone}
                />
              )}
            </div>
          </div>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
