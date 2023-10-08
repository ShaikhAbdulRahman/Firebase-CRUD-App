import { ErrorMessage, Field, Form, Formik } from "formik";
import Model from "./Model";
import * as Yup from "yup";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required!!!"),
  email: Yup.string().email("Invalid email").required("Email is required1!!"),
});

const AddAndUpdate = ({ isOpen, onClose, item, isUpdate }) => {
  const initialValues = {
    name: item ? item.name : "",
    email: item ? item.email : "",
  };

  const hnadleSubmit = async (values) => {
    try {
      if (isUpdate) {
        const contactRef = doc(db, "contacts", item.id);
        await updateDoc(contactRef, values);
        toast.success("Contact Updated Successfully!!!")
      } else {
        const newContactRef = await addDoc(collection(db, "contacts"), values);
        toast.success(`${values.name} added Successfully!!!`)  
    }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={contactSchemaValidation}
          onSubmit={hnadleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="border h-8" />
              <div className="text-red-700 text-sm">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="border h-8" />
              <div className="text-red-700 text-sm">
                <ErrorMessage name="email"/>
              </div>
            </div>
            <button className="bg-orange px-3 py-1.5 border self-end">
              {isUpdate ? "Update " : "Add "} Contact
            </button>
          </Form>
        </Formik>
      </Model>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddAndUpdate;
