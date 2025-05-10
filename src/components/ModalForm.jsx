import { useState } from "react"


export default function ModalForm({isOpen, onClose, mode, onSubmit}) {
  const [rate, setRate] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [job, setJob] = useState('')
  const [status, setStatus] = useState(false)
 
  const handleStatusChange = (e) => {
    setStatus(e.target.value === 'Active');
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      onClose();
  }

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
<dialog id="my_modal_3" className="modal" open={isOpen}>
  <div className="modal-box"
  >
    <h3 className="font-bold text-lg py-4" >{mode === 'edit' ? 'Edit Client' : 'Client Details'} </h3>
    <form method="dialog" onSubmit={handleSubmit}>

    <label className="input input-bordered flex items-center gap-2 w-full">
  
Name
  <input type="text" className="grow"  value={name} onChange={(e) => setName(e.target.value)}/> 

  </label>  
  <label className="input input-bordered flex my-4 items-center gap-2 w-full">
  
  Email
    <input type="text" className="grow"  value={email} onChange={(e) => setEmail(e.target.value)} /> 
  
    </label>  
    <label className="input input-bordered my-4 flex items-center gap-2 w-full">
  
  Job
    <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)} /> 
  
    </label>  
    <div className="flex mb-4 justify-between my-4">
    <label className="input input-bordered flex mr-4 items-center gap-2 w-full">
  
  Rate
    <input type="number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)}  /> 
  
    </label>  
    
    <select value = {status ? 'Active' : 'Inactive'} className="select select-bordered w-full max-w-xs" onChange={handleStatusChange}>
  <option>Inactive</option>
  <option>Active</option>

</select>
    </div>
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>X</button>
      <button className="btn btn-success">{mode === 'edit' ? 'Save Changes' : 'Add Client'}</button>
    </form>
   
  </div>
</dialog>
    </>
  )
};

