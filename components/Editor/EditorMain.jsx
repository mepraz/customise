"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CropImage from "./CropImage";
import PhoneModal from "./phone/PhoneModal";

const Designs = [
  {
    image: "https://i.ibb.co/PDMTbdG/image.png",
    title: "airpods",
    aspect: [1, 1],
    id: 1,
  },
  {
    image: "https://i.ibb.co/jhxVBv8/MOUSEPAD-TEMPLETE-UPDATED.png",
    title: "mousepads",
    aspect: [1, 0.43],
    id: 2,
  },
  {
    image: "https://i.ibb.co/qY1SVXS/laptop.png",
    title: "laptopsleeves",
    aspect: [1, 1],
    id: 3,
  },
  {
    image: "https://i.ibb.co/dMxR0Kg/POP-SOCKET-TEPLETE-UPDATED.png",
    title: "popsockets",
    aspect: [1, 1],
    id: 4,
  },
  {
    image: "https://i.ibb.co/PDMTbdG/image.png",
    title: "phonecases",
    aspect: [0.52, 1],
    id: 5,
  },
];

function EditorMain({ id, phone, product }) {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [showCrop, setShowCrop] = useState(false);
  const [cropedPic, setCropedPic] = useState(null);
  useEffect(() => {
    // scroll to editor
    const editor = document.getElementById("editor");
    if (!!editor) editor.scrollIntoView({ behavior: "smooth" });
  }, []);

  const design = Designs.find((design) => design?.title === id);
  const imgref = useRef(null);

  if (!design) return <h1>Design not found</h1>;

  return (
    <div className="flex flex-col gap-5 p-2">
      <div className="flex gap-2 items-center">
        <Link
          href={"/"}
          className="text-gray-400 cursor-pointer hover:text-blue-400 duration-300"
        >
          Home
        </Link>
        <p className="text-gray-400">/</p>
        <p className="text-gray-400">{design?.title}</p>
      </div>

      <div
        id="editor"
        className="
        px-5 py-5 flex flex-col md:flex-row items-center justify-center bg-gray-100 gap-4
        "
      >
        {/* preview Screen */}
        <div
          className="
                 md:w-1/2 w-full   shadow-md rounded-md border-dashed border-2 bg-white flex justify-center items-center border-gray-300 h-full
                "
        >
          <div
            className="relative bg-white  h-[500px]"
            style={{
              height: "500px",
              width: `${design?.aspect[0] * 500}px`,
            }}
          >
            {(!phone && (
              <img
                ref={imgref}
                src={`${design?.image}`}
                alt="preview"
                className="   z-20 object-contain h-[500px] absolute top-0 left-0 "
                style={{
                  aspectRatio: `${design?.aspect[0]}/${design?.aspect[1]}`,
                }}
              />
            )) || (
              // if phone
              <div className="flex justify-center items-center h-full">
                <PhoneModal data={product[0]} cropedPic={cropedPic} />
              </div>
            )}
            {!!cropedPic && !phone && (
              <img
                src={cropedPic ? URL.createObjectURL(cropedPic) : ""}
                alt="custom"
                className="h-[420px] z-10  object-contain border border-transparent"
                style={{
                  position: "absolute",
                  top: design?.id === 3 ? "58%" : "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              />
            )}
          </div>
        </div>

        {/* editor */}
        <div className=" md:w-1/2 w-full  bg-white shadow-md rounded-md p-2 border-dashed border-2 border-gray-300 h-full flex flex-col gap-3    ">
          {(!showCrop && (
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl font-bold text-center">
                Customise <span className="capitalize ">{design?.title}</span>
              </h1>
              <p className="text-gray-400 text-center">
                Customise your {design?.title} with your own design
              </p>
              {/* write a short description */}
              <p className="text-gray-700 ">
                How to customise your {design?.title}? <br />
                1. Click on the upload button below <br />
                2. Upload your image <br />
                3. Resize and adjust the image <br />
                4. Click on the Order button <br />
                5. Fill in the details and place the order
              </p>
              {/* images */}
              <div className="flex gap-2 flex-col">
                {!!image && (
                  <div className="flex flex-col">
                    <p className="text-gray-900">Choosen Design</p>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="custom"
                      className="w-20 h-20 object-contain border border-transparent"
                    />
                  </div>
                )}
                {images.length !== 0 && (
                  <div className="flex flex-col gap-3">
                    <p className="text-gray-900">Your Photos</p>
                    <div className="flex flex-wrap gap-3">
                      {images.map((img, index) => (
                        <img
                          onClick={() => {
                            setImage(img);
                            setShowCrop(true);
                          }}
                          key={index}
                          src={URL.createObjectURL(img)}
                          alt="custom"
                          className="w-20 h-20 object-contain border border-transparent"
                          style={{
                            border:
                              image === img
                                ? "2px solid blue"
                                : "2px solid transparent",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 justify-center items-center p-5 border-dashed rounded-md ">
                <input
                  onChange={(e) => {
                    if (e.target.files.length === 0) return;
                    setImage(e.target.files[0]);
                    setImages([...images, e.target.files[0]]);
                    setShowCrop(true);
                  }}
                  type="file"
                  id="file"
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="
                          bg-blue-400 text-white px-5 py-2 rounded-md cursor-pointer
                          "
                >
                  Upload Image
                </label>
                <button
                  className="
                          bg-red-400 text-white px-5 py-2 rounded-md cursor-pointer
                          "
                >
                  Order
                </button>
              </div>
            </div>
          )) || (
            <div
              className="
                   bg-white shadow-md rounded-md p-5 flex flex-col gap-5
                   "
            >
              <h1 className="text-2xl font-bold text-center">Crop Image</h1>
              <div
                className="
                       w-full h-[500px] bg-gray-100 flex items-center justify-center
                       "
              >
                <CropImage
                  image={image}
                  aspect={design?.aspect}
                  setCropedPic={setCropedPic}
                  setShowCrop={setShowCrop}
                />
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setImage(cropedPic);
                    setShowCrop(false);
                  }}
                  className="
                           bg-blue-400 text-white px-5 py-2 rounded-md cursor-pointer
                           "
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowCrop(false);
                  }}
                  className="
                           bg-red-400 text-white px-5 py-2 rounded-md cursor-pointer
                           "
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorMain;
