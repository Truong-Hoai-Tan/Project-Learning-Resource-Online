import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../contexts/ProductContextProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { FileInput, Header, Login } from "../components/index.js";
import {
  FUNC_UPDATE_PROFILE_USER,
  FUNC_VIEW_PROFILE_USER,
} from "../service/index.js";
// import Swal from "sweetalert2";
import Swal from "sweetalert2";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import ChangeAvtUser from "../components/ViewProFile/ChangeAvtUser.jsx";
import { extractString } from "../func/remove.class.js";
import { useNavigate } from "react-router-dom";
function EditProfilePage() {
  const navigation = useNavigate();
  const { id } = useParams();
  const { user } = useContext(ProductContext);
  const form = user?.form == "LRO" ? true : false;

  const auth = user?.token;
  const [dataUser, setDataUser] = useState([]);
  const [first_name, setFirstName] = useState(dataUser?.first_name);
  const [last_name, setLastName] = useState(dataUser?.last_name);
  const [email, setEmail] = useState(dataUser?.email);
  const [phone, setPhone] = useState(dataUser?.phone);
  const [avatar, setAvatar] = useState(dataUser?.avatar);
  const [isSex, setIsSex] = useState(dataUser?.isSex);
  const [Submit, setSubmit] = useState(Boolean(false));
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    avatar: "",
    isSex: "",
  });

  const [Form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    avatar: "",
    isSex: "",
  });

  const CallAPI = async () => {
    try {
      const result = await FUNC_VIEW_PROFILE_USER(id);
      // console.log(result);
      setDataUser(result.data.data);
      var re = result.data.data;
      setFirstName(re.first_name);
      setLastName(re.last_name);
      setEmail(re.email);
      setPhone(re.phone);
      setAvatar(re.avatar);
      setIsSex(re.isSex);
    } catch (error) {}
  };
  const handleInputState = (name, value) => {
    // setForm((prev) => ({ ...prev, [name]: value }));
    setAvatar(value);
  };
  const isFormEmpty = () => {
    return Object.values(Form).some((x) => x === "" || x === null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (Form.phone.length == 10) {
        if (!isFormEmpty()) {
          // console.log(Form);
          const result = await FUNC_UPDATE_PROFILE_USER(auth, Form);
          // console.log(result);
          if (result.status == 200) {
            if (result.data.status == 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `Xác Nhận Cập Nhật Thông Tin`,
                showConfirmButton: false,
                timer: 1500,
              });
              localStorage.clear();
              window.location = "/login";
              // navigation("/login");
            }
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: result.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Vui Lòng Điền Đủ Thông tin",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Số điện thoại không hợp lệ",
        });
      }
    } catch (error) {}
  };
  const uploadImage = (e) => {
    e.preventDefault();
    try {
      const imageFile = e.target.files[0];
      // console.log(imageFile);
      // const fileName = new Date().getTime() + imageFile.name;

      const fileName = form ? extractString(user?.avatar) : user?.userId;

      const storageRef = ref(
        storage,
        `avt/${fileName.split("").join("").toUpperCase()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setAvatar(downloadURL);
            // console.log(downloadURL);
          });
        }
      );
    } catch (error) {}
  };

  const CheckDataForm = () => {};

  useEffect(() => {
    CallAPI();
  }, []);
  useEffect(() => {
    // console.table(dataUser);
    setForm({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      avatar: avatar,
      isSex: isSex,
    });
    console.table(Form);
  }, [dataUser, first_name, last_name, email, phone, avatar, isSex]);
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="w-full h-[90vh] bg-white flex justify-center items-center">
        <div className="w-[80%] h-full  ">
          <div className="w-full h-[89%] border-2 bg-blue-400 my-4 border-green-400 shadow-xl shadow-pink-300/30 rounded-3xl">
            <div class="w-full h-full grid grid-cols-3 gap-4">
              <div class="w-full h-full flex justify-center items-center ">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="">
                    <img
                      className="w-60 h-60 m-3 flex justify-center items-center rounded-full"
                      src={avatar}
                      alt=""
                    />
                    <h1 className="items-center justify-center flex text-2xl font-semibold">
                      {last_name + " " + first_name}
                    </h1>
                    <h2 className="items-center justify-center flex text-xl font-extralight">
                      {email}
                    </h2>
                    {/* <div className="items-center justify-center flex text-xl font-extralight">
                      <span>{phone}</span>
                      <span>{isSex}</span>
                      <span>{}</span>
                    </div> */}
                  </div>
                </div>
              </div>
              <div class="col-span-2 w-full h-full flex justify-center items-center ">
                <div className="w-full h-full flex justify-center items-center">
                  <div>
                    <div class="grid max-w-3xl gap-2 pt-5 pb-1 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-blue-400">
                      <div class="grid">
                        <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                          <input
                            type="text"
                            name="first_name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            id="first-name"
                            class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                            placeholder="First name"
                          />
                          <label
                            html="first-name"
                            class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                          >
                            Họ
                          </label>
                        </div>
                      </div>
                      <div class="grid">
                        <div class="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                          <input
                            type="text"
                            name="last_name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            id="last-name"
                            class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                            placeholder="Last name"
                          />
                          <label
                            html="last-name"
                            class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                          >
                            Tên
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="grid max-w-3xl gap-2 pt-5 pb-1 px-8 sm:grid-cols-2 bg-white rounded-md ">
                      <div class="grid">
                        <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                          <input
                            type="number"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            // onChange={handleChange}
                            id="phone"
                            class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                            placeholder="Phone"
                          />
                          <label
                            html="first-name"
                            class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                          >
                            Số điện thoại
                          </label>
                        </div>
                      </div>
                      <div class="grid">
                        <div class="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                          <select
                            id="countries"
                            // onChange={handleChange}
                            value={isSex}
                            onChange={(e) => setIsSex(e.target.value)}
                            name="isSex"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {/* <option selected>Choose a Sex</option> */}
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="3">Khác</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="max-w-3xl gap-2 py-5 px-8 sm:grid-cols-2 bg-white  border-b-4 border-blue-400">
                      <div class="block my-2">
                        <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                          {form ? (
                            <input
                              type="text"
                              name="email"
                              // onChange={handleChange}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              id="email"
                              class="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                              placeholder="Email"
                            />
                          ) : (
                            <>
                              <span>{email}</span>
                            </>
                          )}
                          <label
                            html="email"
                            class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                          >
                            Email
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div class="block">
                          {/* <input
                            type="file"
                            name="upload"
                            onChange={(e) => handleUploadImg(e)}
                            class="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 "
                          /> */}

                          <input
                            type="file"
                            name="upload-image"
                            accept="image/*"
                            onChange={uploadImage}
                            class="mt-4 bg-blue-400 text-white py-2 px-6 rounded-md hover:bg-blue-600 "
                          />
                        </div>
                      </div>
                    </div>
                    <div onClick={(e) => handleUpdate(e)} class="block ">
                      <button
                        // type="submit"
                        class="mt-4 bg-green-400 text-white py-2 px-6 rounded-md hover:bg-green-500 hover:shadow-xl"
                      >
                        Cập nhật hồ sơ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <Login />
      </div> */}
    </>
  );
}

export default EditProfilePage;
