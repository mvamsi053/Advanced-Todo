import React from 'react';
interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
}

function TextArea({
  value,
  setValue,
  placeholder,
  handleSubmit,
}: Props): React.JSX.Element {
  return (
    <form
      className=' flex gap-x-4 justify-between  items-center'
      onSubmit={handleSubmit}
    >
      <textarea
        className='border p-2 w-[90%]  focus:outline-none focus:border-blue-500 rounded-xl'
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={` ${
          value ? 'hover:drop-shadow-2xl hover:scale-90' : 'cursor-default'
        } font-bold text-2xl w-10 h-8 rounded-full text-white  bg-blue-500 border  transition-all ease-linear `}
        type='submit'
      >
        +
      </button>
    </form>
  );
}

export default TextArea;
