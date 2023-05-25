import React from 'react';
import { MdEdit } from 'react-icons/md';
import { useMantineColorScheme } from '@mantine/core';

import { EditTodo } from './Models/EditTodo';
import { TiTick } from 'react-icons/ti';

interface Props {
  title: string;
  description: string;
  isDone: boolean;
  id: number;
  listId: string;
  setEditTodoData: React.Dispatch<React.SetStateAction<EditTodo | undefined>>;
}
function TodoCard({
  title,
  setEditTodoData,
  description,
  listId,
  isDone,
  id,
}: Props): React.JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  return (
    <div
      className={` ${
        isDone ? 'border-green-400' : ''
      } flex flex-col border rounded-xl my-4 `}
    >
      <div className='flex justify-between items-center py-4 px-2 border-b'>
        <div className='flex gap-x-2 items-center'>
          <p className='font-semibold'>{title}</p>
          {isDone && <TiTick className='text-green-600 shadow-lg' />}
        </div>

        <div
          className={`${
            colorScheme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
          }   p-2 rounded-full hover:drop-shadow-2xl hover:scale-90 transition-all ease-linear cursor-pointer`}
          onClick={() =>
            setEditTodoData((prev) => {
              return {
                id: id,
                title: title,
                description: description,
                isDone: isDone,
                listId: listId,
              };
            })
          }
        >
          <MdEdit />
        </div>
      </div>
      <div className='px-2 py-4'>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TodoCard;
