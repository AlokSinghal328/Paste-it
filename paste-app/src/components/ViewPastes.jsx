import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPastes = () => {

  const {id} = useParams();

  const pasteAll = useSelector((state) => state.paste.pastes);

  const reqPaste = pasteAll.filter((p) => p._id == id)[0];


  return (
    <div>
      <div className="flex  gap-5 justify-between">
        <input
          className="bg-[#d9d9d9] p-2 rounded-lg  placeholder:text-gray-950 w-full text-black"
          type="text"
          placeholder="Enter Title Here"
          disabled
          value={reqPaste.title}
          onChange={(val) => setTitle(val.target.value)}
        />

      </div>

      <div>
        <textarea
          className="w-full h-[30rem] mt-8 ring-1  bg-[#1e1e1e] px-3 py-2"
          value={reqPaste.content}
          disabled
          placeholder="Enter Content here"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ViewPastes;
