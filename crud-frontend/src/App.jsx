import { useState, useEffect } from 'react'
import './App.css'
import ModalForm from './components/ModalForm'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import axios from 'axios'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchClients = async () => {
    try {
      const response  = await axios.get('http://localhost:3000/api/clients')
      setTableData(response.data); // Set the fetched data

    } catch (err) {
        setError(err.message);
    }
};

useEffect(() => {
fetchClients();
}, []);

  const handleOpen = (mode,client) => {
    setClientData(client);
    setModalMode(mode)
    setIsOpen(true);
    ;
   
  }
  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData); // Replace with your actual API URL
        console.log('Client added:', response.data); // Log the response
        setTableData((prevData) => [...prevData, response.data]);
        // Optionally, update your state here to reflect the newly added client
        } catch (error) {
            console.error('Error adding client:', error); // Log any errors
        }
      console.log('modal mode Add');

    } else {
      console.log('Updating client with ID:', clientData.id); // Log the ID being updated
            try {
                const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
                console.log('Client updated:', response.data);
                setTableData((prevData) =>
                  prevData.map((client) => (client.id === clientData.id ? response.data : client))
                );
                } catch (error) {
                console.error('Error updating client:', error); 
            }

    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (confirmDelete) {
        try {
            await axios.delete(`http://localhost:3000/api/clients/${id}`); // API call to delete client
            setTableData((prevData) => prevData.filter(client => client.id !== id)); // Update state
        } catch (err) {
            setError(err.message); // Handle any errors
        }
    }
};


  return (
    <>
     <NavBar onOpen={() => handleOpen('add')} onSearch = {setSearchTerm} /> 
     <TableList handleOpen={handleOpen} handleDelete={handleDelete} searchTerm={searchTerm} tableData={tableData}/>
     <ModalForm isOpen = {isOpen} OnSubmit={handleSubmit} onClose={() => setIsOpen(false)} mode={modalMode} clientData={clientData}/>
    </>
  )
  //onOpen: Called when the user clicks the "Add" button in the NavBar. 
  //onSearch: updates the searchTerm state in the parent when the user types in the search input. 
  //handleOpen: Called when a user clicks "Edit" on a client. 
  //handleDelete: Called when a user clicks "Delete" on a record.
  //searchTerm: Used to filter the client list. Only show items matching the user's search input, from onSearch of Navbar 
  //tableData: The list of all clients to display in the table.
  //...
}

export default App
