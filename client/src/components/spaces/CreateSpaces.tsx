import React, { useState } from "react";
import { DataServices } from "../../services/DataServices";
import { useNavigate } from "react-router-dom";

interface CreateSpacePorpsInterface {
  dataServices: DataServices;
}

interface CustomEventInterface {
  target: HTMLInputElement;
}

const CreateSpaces = ({ dataServices }: CreateSpacePorpsInterface) => {
  const [spaceName, setSpaceName] = useState<string>("");
  const [spaceLocation, setSpaceLocation] = useState<string>("");
  const [spacePhoto, setSpacePhoto] = useState<File | undefined>();
  const [actionResult, setActionResult] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dataServices.getIsAuthorized()) {
      navigate("/login");
    }

    if (spaceName && spaceLocation) {
      const id = await dataServices.createSpace(
        spaceName,
        spaceLocation,
        spacePhoto
      );
      setActionResult(`Created Space with id: ${id}`);
      setSpaceName("");
      setSpaceLocation("");
    } else {
      setActionResult("spaceName and spaceLocation are needed");
    }
  };

  const setPhotoUrl = (event: CustomEventInterface) => {
    if (event.target) {
      if (event.target.files && event.target.files[0]) {
        setSpacePhoto(event.target.files[0]);
      }
    }
  };

  const renderPhoto = () => {
    if (spacePhoto) {
      const localPhotoURL = URL.createObjectURL(spacePhoto);
      return (
        <img
          className="w-84 rounded-md"
          src={localPhotoURL}
          alt={`${spaceName} image`}
        />
      );
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="text-3xl">Create space</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Space name"
            className="input input-bordered w-full max-w-xs"
            onChange={(event) => setSpaceName(event.target.value)}
          />
          <input
            type="password"
            placeholder="Space location"
            className="input input-bordered w-full max-w-xs"
            onChange={(event) => setSpaceLocation(event.target.value)}
          />
          <input
            onChange={(event) => setPhotoUrl(event)}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          {renderPhoto()}
          <div className="card-actions justify-end">
            <button className="btn btn-primary w-full">Add space</button>
          </div>
        </form>
        {actionResult && <p>{actionResult}</p>}
      </div>
    </div>
  );
};

export default CreateSpaces;
