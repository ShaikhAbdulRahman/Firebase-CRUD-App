import { HiOutlineUserCircle } from "react-icons/hi";
import {RiEditCircleLine} from "react-icons/ri"
import {IoMdTrash} from "react-icons/io"
import { useState } from "react";
import AddAndUpdate from "./AddAndUpdate";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";

const ContactCard = ({ item }) => {
  const [isOpen,setIsOpen]=useState(false);

  const onOpen=()=>{
    setIsOpen(true)
  }
  const onClose=()=>{
    setIsOpen(false)
  }

  const deleteContact = async(id)=>{
    try {
      await deleteDoc(doc(db,"contacts",id))
      toast.success(`${item.name} deleted Successfully`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        key={item.id}
        className=" bg-yellow flex justify-between items-center p-2.5 rounded-lg"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-orange text-4xl mt-1" />
          <div>
            <h2 className="font-medium">{item.name}</h2>
            <p className="text-sm">{item.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
          <IoMdTrash onClick={()=>deleteContact(item.id)} className="cursor-pointer text-orange"/>
        </div>
      </div>
      <AddAndUpdate isOpen={isOpen} onClose={onClose} item={item} isUpdate/>
      <ToastContainer position="top-center" />
    </>
  );
};

export default ContactCard;
