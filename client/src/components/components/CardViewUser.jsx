import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GiFastBackwardButton } from "react-icons/gi";
import { ProductContext } from "../../contexts/ProductContextProvider";
import { BoxViewBV, BoxView, Skenleton } from "../index.js";
import Swal from "sweetalert2";
import { FUNC_CHANGE_PASS_USER } from "../../service/index.js";
import { useNavigate } from "react-router-dom";
function CardViewUser({ data }) {
  const navigation = useNavigate();
  const { user } = useContext(ProductContext);
  let auth = user?.token;
  const [isMenu, setIsMenu] = useState(1);
  const [isPass, setIsPass] = useState();
  const [isConfirmPass, setIsConfirmPass] = useState();

  // console.log(data);

  function render() {
    if (isMenu == 1) {
      return <BoxView data={data.docs} />;
    } else if (isMenu == 2) {
      return <BoxView data={data.articles} />;
    }
  }

  const handleChange = async (e) => {
    if (isConfirmPass === isPass) {
      const result = await FUNC_CHANGE_PASS_USER(auth, isConfirmPass);
      // console.log(result);
      if (result.data.status == 200) {
        let timerInterval;
        Swal.fire({
          title: "Dữ Liệu Đang Cập Nhật",
          html: "I will close in <b></b> milliseconds.",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thay đổi mật khẩu thành công",
          showConfirmButton: false,
          timer: 1500,
        });

        navigation(`/u/${data._id}`);
      }
    } else {
      // console.log(isConfirmPass);
      // console.log(isPass);
    }
  };

  useEffect(() => {
    // console.log(isConfirmPass);
    // console.log(isPass);
  }, [isPass, isConfirmPass]);
  return (
    <>
      <div>
        {data ? (
          <div class="p-16">
            <div class=" p-8 bg-blue-300 shadow mt-24">
              <div class="grid grid-cols-1 md:grid-cols-3">
                <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                  <div>
                    <p class="font-bold text-gray-700 text-xl">
                      {data?.docs?.length}
                    </p>
                    <p class="text-gray-400">Tài Liệu</p>
                  </div>
                  <div>
                    <p class="font-bold text-gray-700 text-xl">
                      {data?.articles?.length}
                    </p>
                    <p class="text-gray-400">Bài Viết</p>
                  </div>{" "}
                </div>{" "}
                <div class="relative">
                  {" "}
                  <div class="w-44 h-44  mx-auto rounded-full absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    <img
                      className="h-full w-full rounded-xl"
                      src={data.avatar}
                      alt=""
                    />
                  </div>{" "}
                </div>{" "}
                <div
                  class={`${
                    user?.userId != data._id ? "hidden" : "block"
                  }  space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center`}
                >
                  <span className={``}>
                    <Link to={`/u/edit/${data._id}`}>
                      <button class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        Cập Nhật Tài Khoản
                      </button>
                    </Link>
                  </span>
                </div>{" "}
              </div>{" "}
              <div class="mt-20 text-center border-b pb-12">
                {" "}
                <h1 class="text-4xl font-extralight  text-gray-700">
                  {data.first_name + " " + data.last_name}
                </h1>{" "}
                <p class="font-light text-gray-600 mt-3">{data.email}</p>{" "}
                {/* <p class="mt-8 text-gray-500">
                Solution Manager - Creative Tim Officer
              </p>{" "} */}
                {/* <p class="mt-2 text-gray-500">University of Computer Science</p>{" "} */}
              </div>{" "}
              <div class="mt-12 flex flex-col justify-center">
                <div>
                  {" "}
                  <div class="grid grid-cols-2 gap-5">
                    {" "}
                    <button
                      onClick={() => setIsMenu(1)}
                      class={`${
                        isMenu == 1
                          ? "bg-indigo-500 text-white"
                          : "bg-white text-indigo-500  "
                      } p-4 rounded shadow-md flex items-center justify-center`}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {" "}
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />{" "}
                      </svg>{" "}
                      Tài Liệu
                    </button>{" "}
                    <button
                      onClick={() => setIsMenu(2)}
                      class={`${
                        isMenu == 2
                          ? "bg-indigo-500 text-white"
                          : "bg-white text-indigo-500  "
                      } p-4 rounded shadow-md flex items-center justify-center`}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {" "}
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />{" "}
                      </svg>{" "}
                      Bài Viết
                    </button>{" "}
                  </div>{" "}
                  <div
                    class={`${
                      isMenu == 1 ? "block" : "hidden"
                    } bg-green-200 shadow-xl border border-gray-100 font-light p-8 rounded text-gray-500 bg-white mt-6`}
                  >
                    {render()}
                  </div>{" "}
                  <div
                    class={`${
                      isMenu == 2 ? "block" : "hidden"
                    } bg-green-200 shadow-xl border border-gray-100 font-light p-8 rounded text-gray-500 bg-white mt-6`}
                  >
                    {render()}
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Skenleton num={1} />
          </>
        )}
      </div>
    </>
  );
}

export default CardViewUser;
