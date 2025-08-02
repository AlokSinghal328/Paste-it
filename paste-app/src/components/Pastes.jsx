import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../slices/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Pastes = () => {
  const allData = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = allData.filter((allData) =>
    allData.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function deletePaste(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function sharePaste(pasteId) {
    const shareLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareLink);
    toast.success("Share Link copied");
  }

  function createdDate(pasteId) {
    const pasteReq = allData.find((p) => p._id === pasteId);
    if (!pasteReq || !pasteReq.createdAt) return "";

    const date = new Date(pasteReq.createdAt);

    return date.toLocaleDateString("en-us", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div>
      <div className="flex  gap-5 justify-between">
        <input
          className="bg-[#d9d9d9] p-2 rounded-lg  w-full text-black "
          type="text"
          placeholder="Search Pastes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="p-2 bg-orange-500 rounded-lg">Search</button>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((allData) => {
            return (
              <div
                className="border-2 p-4 flex flex-col  md:flex-row md:place-items-start"
                key={allData?._id}
              >
                <div className="w-8/12">
                  <h1 className="text-2xl font-semibold">{allData.title}</h1>
                  <p className="text-sm opacity-90 mt-2">{allData.content}</p>
                </div>

                <div className="flex mt-5 gap-5 md:flex-col md:mt-0 md:justify-between">
                  <div className="flex gap-2 ">
                    <button
                      className="p-1 bg-orange-500 rounded-sm text-[12px]"
                      onClick={() => {
                        navigate(`/?pasteId=${allData?._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="p-1 bg-orange-500 rounded-sm text-[12px]"
                      onClick={() => {
                        navigate(`/pastes/${allData?._id}`);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="p-1 bg-orange-500 rounded-sm text-[12px]"
                      onClick={() => deletePaste(allData?._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="p-1 bg-orange-500 rounded-sm text-[12px]"
                      onClick={() => {
                        navigator.clipboard.writeText(allData?.content);
                        toast.success("Copied successfully");
                      }}
                    >
                      Copy
                    </button>
                    <button
                      className="p-1 bg-orange-500 rounded-sm text-[12px]"
                      onClick={() => sharePaste(allData?._id)}
                    >
                      Share
                    </button>
                  </div>
                  <p> {createdDate(allData?._id)} </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Pastes;
