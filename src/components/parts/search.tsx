import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Search } from '@/types/parts';

function Search({ placeholder, setInputValue, setSubmitAction }: Search) {
  return (
    <div className="flex relative justify-center align-center h-max w-10/12 my-5">
      <form
        action=""
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitAction();
          return false;
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-1/2 max-h-max w-full py-3 pl-7 bg-slate-100 shadow-lg rounded-lg px-4 text-center"
        />
        <div className="flex absolute pl-3 inset-y-0 py-2 px-3 end-0">
          <button type="submit">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="h-[30px]"
              color="#555555"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
