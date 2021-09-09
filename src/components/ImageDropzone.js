import React, { useEffect } from "react";

import { useDropzone } from "react-dropzone";

/**@type {React.FC<{onDrop:(files:File[])=>void}>} */
const ImageDropzone = ({ onDrop }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    onDrop(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="image-dropzone">
      <section className="">
        <div {...getRootProps({ className: "dropzone dropzone-field" })}>
          <input {...getInputProps()} />

          <p>Browse to choose images</p>
        </div>
        <aside>
          <ul>
            <p>{files}</p>
          </ul>
        </aside>
      </section>
    </div>
  );
};

<ImageDropzone />;

export default ImageDropzone;
