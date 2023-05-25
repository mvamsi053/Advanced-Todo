import React from 'react';
import { HiPlusSm } from 'react-icons/hi';
interface Props {
  setTodoDescrip: React.Dispatch<React.SetStateAction<string>>;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  todoDescrip: string;
  todoTitle: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
  isEdit?: boolean;
}

function SectionInput({
  setTodoDescrip,
  setTodoTitle,
  todoDescrip,
  todoTitle,
  isEdit,
  handleSubmit,
}: Props): React.JSX.Element {
  return (
    <div className=''>
      <form
        className={`${
          isEdit ? '' : ' items-start'
        } flex gap-x-4 mt-4 justify-between  flex-col `}
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col  justify-start border rounded-xl '>
          <div className='flex border-b '>
            <input
              className=' p-2 w-[90%] bg-transparent focus:outline-none  focus:border-blue-500 '
              placeholder='Add Todo'
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            {!isEdit && (
              <button
                className={` ${
                  todoTitle && todoDescrip
                    ? 'hover:drop-shadow-2xl hover:scale-90'
                    : 'cursor-default'
                } font-bold text-2xl p-1 rounded-full text-white  bg-blue-500 border  transition-all ease-linear m-2 `}
                type='submit'
              >
                <HiPlusSm />
              </button>
            )}
          </div>

          <textarea
            className=' p-2 w-[90%] bg-transparent focus:outline-none focus:border-blue-500 '
            value={todoDescrip}
            onChange={(e) => setTodoDescrip(e.target.value)}
            placeholder='Add Todo Description'
          />
        </div>
        {isEdit && (
          <button
            className={` ${
              todoTitle && todoDescrip
                ? 'hover:drop-shadow-2xl hover:scale-90'
                : 'cursor-default'
            } font-semibold p-1 rounded-full text-white  bg-blue-500 border  transition-all ease-linear m-2 `}
            type='submit'
          >
            SAVE
          </button>
        )}
      </form>
    </div>
  );
}

export default SectionInput;
