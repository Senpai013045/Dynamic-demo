import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import ImageDropzone from "./ImageDropzone";

/**@type {React.FC<{index:number;name:string}>} */
const SubCategory = ({ index, name }) => {
  const formik = useFormikContext();
  return (
    <div className="flex">
      <div>
        <Field
          name={`${name}.${index}.title`}
          type="text"
          placeholder="title"
        />
        <ErrorMessage
          name={`${name}.${index}.title`}
          component="div"
          className="error"
        />
      </div>
      <div>
        <ImageDropzone
          onDrop={(files) => {
            formik.setFieldValue(`${name}.${index}.image`, files);
          }}
        />
        {/* {formik.errors[name]?.[index]?.["image"] && (
          <div className="error">{formik.errors[name]?.[index]?.["image"]}</div>
        )} */}
        <ErrorMessage
          name={`${name}.${index}.image`}
          component="div"
          className="error"
        />
      </div>
    </div>
  );
};

export default SubCategory;
