import React from "react";
import { Link } from "react-router-dom";

function CardSearch({ data }) {
  return (
    <>
      <div className="h-auto">
        <>
          {data &&
            data.map((item, index) => {
              return (
                <>
                  <div
                    key={item?._id}
                    class={`${
                      !item?.isPrivate ? " " : "hidden"
                    } w-full min-h-[117px] flex items-center justify-center `}
                  >
                    <div class="w-[90%] h-full flex items-center justify-center bg-blue-100 rounded-md  hover:bg-blue-400 ease-in-out duration-100 ">
                      <div class="w-full h-full bg-blue-100  py-3 px-4 rounded-lg    shadow-md shadow-blue-300/30">
                        <div className="flex justify-between items-center">
                          <div className="flex justify-start items-center">
                            <img
                              src={item?.creatorsPhoto}
                              alt="avatar"
                              className="w-8 h-8 rounded-full mr-2 "
                            />
                            <span className="lg:text-lg font-mono text-blue-500 hover:text-blue-300 cursor-pointer">
                              {item?.creatorsName}
                            </span>
                          </div>
                          <span className="">
                            <span className="mx-1 p-1 ">
                              {item?.view} Lượt Xem
                            </span>
                            <span className="mx-1 p-1 ">
                              {item?.like.length} Lượt thích
                            </span>
                          </span>
                        </div>
                        <div className="block">
                          {item?.docs_URL ? (
                            <Link to={`/tailieu/view/${item?._id}`}>
                              <h1 className="lg:text-lg md:text-md font-bold text-blue-800 hover:text-blue-400 cursor-pointer">
                                {item?.title}
                              </h1>
                            </Link>
                          ) : (
                            <Link to={`/baiviet/view/${item?._id}`}>
                              <h1 className="lg:text-lg md:text-md font-bold text-blue-800 hover:text-blue-400 cursor-pointer">
                                {item?.title}
                              </h1>
                            </Link>
                          )}
                          <p>
                            {item?.tag.map((i) => {
                              return (
                                <span className="p-1 mx-1 justify-center items-center text-xs rounded-md bg-blue-gray-100">
                                  {i}
                                </span>
                              );
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </>
      </div>
    </>
  );
}

export default CardSearch;
