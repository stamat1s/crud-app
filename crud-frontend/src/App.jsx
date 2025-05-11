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

  return (
    <>
     <NavBar onOpen={() => handleOpen('add')} onSearch = {setSearchTerm} /> 
     <TableList handleOpen={handleOpen} searchTerm={searchTerm}  setTableData={setTableData} tableData={tableData}/>
     <ModalForm isOpen = {isOpen} OnSubmit={handleSubmit} onClose={() => setIsOpen(false)} mode={modalMode} clientData={clientData}/>
    </>
  )
  //onOpen: Called when the user clicks the "Add" button in the NavBar. (OK)
  //onSearch: updates the searchTerm state in the parent when the user types in the search input. 
  //handleOpen: Called when a user clicks "Edit" on a client.
  //searchTerm: Used to filter the client list. Only show items matching the user's search input.
  //setTableData: Lets TableList update the list (e.g., after deletion or local sorting).
  //tableData: The list of all clients to display in the table.
}

export default App
