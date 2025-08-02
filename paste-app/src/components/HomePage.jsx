import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../slices/pasteSlice";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const pasteTemp = allData.find((p) => p._id === pasteId);
      setTitle(pasteTemp.title);
      setValue(pasteTemp.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update the paste
      dispatch(updateToPastes(paste));
    } else {
      // create
      dispatch(addToPastes(paste));
    }

    // after the work
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex  gap-5 justify-between">
        <input
          className="bg-[#d9d9d9] p-2 rounded-lg  placeholder:text-gray-950 w-full text-black"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(val) => setTitle(val.target.value)}
        />

        <button className="p-2 bg-orange-500 rounded-lg" onClick={createPaste}>
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      <div>
        <textarea
          className="w-full h-[30rem] mt-8 ring-1  bg-[#1e1e1e] px-3 py-2"
          value={value}
          placeholder="Enter Content here"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default HomePage;
