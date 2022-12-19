import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import { bookshelfNames } from '../../../Utils/data';
import { Spinner } from '../../index';

const Create = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  //const uploadImage = (e) => {

  //const selectedFile = e.target.files[0];
  // uploading asset to sanity
  /*if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };*/

  /*const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };*/
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please add all fields.
        </p>
      )}
      {/**Create bookshelf title */}
      <div className="flex flex-col justify-center items-center w-full lg:w-4/5">
        <p className="text-2xl font-bold">Create Bookshelf</p>
      </div>
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white dark:bg-black rounded-lg shadow-lg z-20 lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">
                      The cover image is the bookshelf's first book!
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  //onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  //src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  //onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 dark:bg-black lg:pl-5 mt-5 w-full bg-yellow-300">
          <div className="flex flex-col">
            <p className="mb-2 font-semibold text:lg sm:text-xl">
              Bookshelf Title
            </p>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="outline-none w-full text-base border-b-2 border-gray-200 p-2 dark:bg-gray-900 rounded-md cursor-pointer"
            >
              <option
                value="others"
                className="sm:text-bg bg-white dark:bg-gray-900"
              >
                Select bookshelf title
              </option>
              {bookshelfNames.map((bookshelf) => (
                <option
                  className="text-base border-0 outline-none capitalize bg-white  dark:bg-gray-900 text-black dark:text-white "
                  value={bookshelf}
                >
                  {bookshelf}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your your bookshelf is about"
            className="outline-none text-base sm:text-lg border-b-2 dark:bg-gray-900 border-gray-200 p-2"
          />

          {/** Create a search and dropdown input where the selected items will be displayed on the on the top of the search dropdown
           *
           */}
          <div className="flex flex-col">
            <p className="mb-2 font-semibold text:lg sm:text-xl">Add Books</p>
            <div className="flex flex-col gap-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
