import React from 'react';
import { HiPlusSm } from 'react-icons/hi';
interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
}

function Input({
  value,
  setValue,
  placeholder,
  handleSubmit,
}: Props): React.JSX.Element {
  return (
    <div>
      <form
        className=' flex gap-x-4 justify-between  items-center min-w-[20vw]'
        onSubmit={handleSubmit}
      >
        <input
          className='border p-2 w-[90%] bg-transparent focus:outline-none focus:border-blue-500 rounded-xl'
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className={` ${
            value ? 'hover:drop-shadow-2xl hover:scale-90' : 'cursor-default'
          } font-bold text-2xl p-1 rounded-full text-white  bg-blue-500 border  transition-all ease-linear `}
          type='submit'
        >
          <HiPlusSm />
        </button>
      </form>
    </div>
  );
}

export default Input;
