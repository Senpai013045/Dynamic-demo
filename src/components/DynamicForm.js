import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import ImageDropzone from "./ImageDropzone";
import SubCategory from "./SubCategory";
import * as Yup from "yup";
const DynamicForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          image: null,
          color: "",
          subCategories: [],
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("required"),
          color: Yup.string().required("required"),
          image: Yup.array()
            .of(
              Yup.object()
                .shape({
                  name: Yup.string,
                })
                .nullable()
            )
            .min(1, "at least one image is required")
            .required("required"),
          subCategories: Yup.array().of(
            Yup.object().shape({
              title: Yup.string().required("Required"),
              image: Yup.array()
                .of(
                  Yup.object()
                    .shape({
                      name: Yup.string,
                    })
                    .nullable()
                )
                .min(1, "at least one image is required")
                .required("required"),
            })
          ),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <Form>
              <div>
                <h2>Categories</h2>
                <div class="flex">
                  <div>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Title of this form"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div>
                    <ImageDropzone
                      onDrop={(files) => {
                        setFieldValue("image", files);
                      }}
                    />
                    {/* {errors["image"] && (
                      <div className="error">{errors["image"]}</div>
                    )} */}
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div>
                    <Field type="color" name="color" />
                    <ErrorMessage
                      name="color"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <hr />
                <FieldArray name="subCategories">
                  {({ remove, push }) => {
                    return (
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            push({
                              title: "",
                              image: null,
                            });
                          }}
                        >
                          Add
                        </button>
                        <hr />

                        {values["subCategories"].map((item, index) => {
                          return (
                            <div style={{ marginBottom: 20 }}>
                              <SubCategory
                                key={index}
                                index={index}
                                name="subCategories"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DynamicForm;
