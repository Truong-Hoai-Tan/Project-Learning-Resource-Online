import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";
import { FileInput } from "../../components";
import { FUNC_CREATE_DOC } from "../../service/FuncDoc/index.js";
import { CategoryArr } from "../../data/CategoryDoc.js";
import { useNavigate } from "react-router-dom";
function DocForm() {
  const navigation = useNavigate();
  const { user } = useContext(ProductContext);
  const token = user?.token;
  const [isP, setisP] = useState(false);
  // const [isHP, setisHP] = useState(false);
  // const [tagName, setTagName] = useState([]);
  const [selected, setSelected] = useState([]);
  const [upload, setUpload] = useState(Boolean(false));

  const [data, setData] = useState({
    title: "",
    tag: "",
    category: "",
    content: "",
    docs_URL: "",
    id_URL: "",
    creatorsName: user.first_name + " " + user.last_name,
    creatorsId: user.userId,
    creatorsPhoto: user.avatar,
    isPrivate: "",
  });
  const [data2, setData2] = useState({
    title: "",
    tag: "",
    category: "",
    content: "",
    docs_URL: "",
    id_URL: "",
    creatorsName: user.first_name + " " + user.last_name,
    creatorsId: user.userId,
    creatorsPhoto: user.avatar,
    isPrivate: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setData2({ ...data2, [input.name]: input.value });
  };

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setData2((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.title != "" &&
      data.category != "" &&
      data.content != "" &&
      data.docs_URL != "" &&
      checkForm()
    ) {
      const resultLogin = await FUNC_CREATE_DOC(token, data);
      // console.log(resultLogin);
      if (resultLogin.status == 200) {
        if (resultLogin.data.status === 200) {
          toast.success("Đăng Tải Tài Liệu Thành Công");
          setData({
            title: "",
            tag: "",
            category: "",
            content: "",
            docs_URL: "",
            creatorsName: user.first_name + " " + user.last_name,
            creatorsId: user.userId,
            creatorsPhoto: user.avatar,
            isPrivate: "",
          });
          setUpload(!upload);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Đăng Tải Tài Liệu Thành Công",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigation("/tailieu");
          }, 1000);
          return;
        }
        if (resultLogin.data.status === 201) {
          toast.error("Đăng Tải Tài Liệu Thất Bại");

          return;
        }
        if (resultLogin.data.status === 202) {
          toast.error("Đăng Tải Tài Liệu Thất Bại");
          return;
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Vui Lòng Điền Đủ Thông Tin",
        text: ``,
      });
    }
  };

  function checkForm() {
    if (selected.length > 0 && selected.length < 6) {
      if (selected.length > 2) {
        return true;
      }
      return false;
    } else return false;
  }

  function handleClear() {
    setData({
      title: "",
      tag: "",
      category: "",
      content: "",
      docs_URL: data2.docs_URL,
      id_URL: data2.docs_URL,
      creatorsName: user.first_name + " " + user.last_name,
      creatorsId: user.userId,
      creatorsPhoto: user.avatar,
      isPrivate: data2.isPrivate,
    });

    setSelected([]);
  }
  useEffect(() => {
    data.isPrivate = isP;
    data.tag = selected;
    // console.table(data);
    // console.log(upload);
    // console.log(checkForm());
  }, [data, isP, selected]);
  useEffect(() => {
    if (data.docs_URL?.size == undefined) {
      setUpload(!upload);
    }
  }, [data.docs_URL]);
  // function back() {
  //   data.docs_URL = "";
  //   setUpload(!upload);
  //   setData({
  //     title: "",
  //     tag: "",
  //     category: "",
  //     content: "",
  //     docs_URL: "",
  //     id_URL: "",
  //     creatorsName: user.first_name + user.last_name,
  //     creatorsId: user.userId,
  //     creatorsPhoto: user.avatar,
  //     isPrivate: "",
  //   });
  // }

  function UploadFile() {
    return (
      <>
        <div className={`h-full `}>
          <div class="flex w-full h-full  items-center justify-center bg-grey-lighter t">
            <div class="max-w-2xl mx-auto">
              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Nhấn Để Tải Lên</span> Hoặc
                      Kéo và Thả vào đây
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      PDF (MAX. 800x400px)
                    </p>
                  </div>
                  {/* <input id="dropzone-file" type="file" class="hidden" />
                   */}
                  <div className="">
                    <FileInput
                      className={`w-full `}
                      name="docs_URL"
                      label="Chọn Tài Liệu PDF"
                      handleInputState={handleInputState}
                      type="docs"
                      value={data.docs_URL}
                    />
                  </div>
                </label>
              </div>

              <p class="mt-5">
                Các loại tệp được hỗ trợ : PDF
                <a
                  class="text-blue-600 hover:underlin block"
                  href="#"
                  target="_blank"
                >
                  Bằng cách tải lên, bạn đồng ý với Thỏa thuận Trình tải lên LRO
                  của chúng tôi
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  function InfoDocForm() {
    return <></>;
  }
  return (
    <div>
      <ToastContainer />

      <div
        className={`flex justify-center items-center w-full  h-[90vh]  bg-white`}
      >
        {upload ? (
          <UploadFile />
        ) : (
          <>
            <div className={` w-full  h-full bg-white`}>
              <div class="w-full h-full">
                <div className="w-full  h-full flex justify-center items-center ">
                  <div className="w-[60%] h-auto p-5  bg-blue-200 rounded-2xl">
                    <div className="flex justify-between w-full gap-4">
                      <div className="mb-2 w-full">
                        <label
                          for="email"
                          className="block text-sm font-semibold text-gray-800"
                        >
                          Tiêu đề
                        </label>
                        <input
                          required
                          type="text"
                          id="title"
                          onChange={handleChange}
                          value={data.title}
                          name="title"
                          placeholder="Nhập tiêu đề cho tài liệu"
                          className="placeholder:font-thin placeholder:italic placeholder:text-sm block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                      <div className="mb-2 w-full">
                        <label
                          for="small"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Danh Mục
                        </label>
                        <select
                          onChange={handleChange}
                          value={data.category}
                          id="small"
                          name="category"
                          required
                          className="placeholder:font-thin placeholder:italic placeholder:text-sm block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        >
                          <option selected>Chọn một danh mục</option>
                          {CategoryArr.map((i) => {
                            return <option value={i.value}>{i.name}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="w-full flex justify-between gap-4">
                      <div className="mb-2 w-full">
                        <div className="mb-2 w-full">
                          <label
                            for="small"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Thẻ
                          </label>
                          <TagsInput
                            value={selected}
                            onChange={setSelected}
                            name="tag"
                            id="tag"
                            placeHolder="Gắn thẻ bài viết của bạn. Tối đa 5 thẻ. Ít nhất 3 thẻ!"
                            classNames={`placeholder:font-thin placeholder:italic placeholder:text-sm w-full border-0`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 w-full">
                      <div className="mb-2 w-full h-full">
                        <label
                          for="small"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Diễn giải
                        </label>
                        <textarea
                          required
                          name="content"
                          onChange={handleChange}
                          value={data.content}
                          placeholder="Hãy viết vài dòng để mô tả tài liệu này"
                          className="placeholder:font-thin placeholder:italic placeholder:text-sm mb-2 w-full h-40"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full flex justify-end mb-4">
                      <div className=" w-1/3">
                        <label
                          for="small"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Chế độ đăng tin
                        </label>
                        <div className="flex gap-1 bg-white  rounded-md justify-center items-center">
                          <div
                            onClick={(e) => setisP(!isP)}
                            className={`${
                              isP ? "bg-white" : "bg-green-400"
                            } cursor-pointer block w-full px-4 py-2  text-blue-700  border-none rounded-md duration-100 ease-in-out focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                          >
                            Công khai
                          </div>
                          <div
                            onClick={(e) => setisP(!isP)}
                            className={`${
                              !isP ? "bg-white" : "bg-green-400"
                            } cursor-pointer block w-full px-4 py-2  text-blue-700  border-none rounded-md duration-100 ease-in-out focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                          >
                            Riêng Tư
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between gap-4">
                      <div className="flex gap-4">
                        <div
                          onClick={(e) => setUpload(!upload)}
                          class="flex cursor-pointer"
                        >
                          <label
                            for="choose-me"
                            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          >
                            Quay Lại
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div onClick={handleClear} class="flex">
                          <label
                            for="choose-me"
                            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          >
                            Xoá
                          </label>
                        </div>
                        <div onClick={(e) => handleSubmit(e)} class="flex">
                          <label
                            for="choose-me"
                            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          >
                            Đăng Tin
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DocForm;
