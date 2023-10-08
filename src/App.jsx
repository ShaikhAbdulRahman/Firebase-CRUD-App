import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import ContactCard from "./components/ContactCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import AddAndUpdate from "./components/AddAndUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contacts");

        onSnapshot(contactRef, (snapshot) => {
          const contactLists = snapshot.docs.map((item) => {
            return {
              id: item.id,
              ...item.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-1">
          <div className="flex relative flex-grow items-center">
            <FiSearch className="text-white text-3xl ml-2 absolute" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Contact..."
              className="border bg-transparent border-white rounded-md h-10 flex-grow text-white pl-12"
            />
          </div>
          <div className="mr-[-6px]" onClick={onOpen}>
            <AiFillPlusCircle className="text-5xl text-white cursor-pointer" />
          </div>
        </div>
        <div className="mt-4 gap-2 flex flex-col">
          {filteredContacts.map((item) => (
            <ContactCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <AddAndUpdate isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
