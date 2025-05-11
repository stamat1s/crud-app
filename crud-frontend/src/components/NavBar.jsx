export default function NavBar({ onOpen, onSearch }) {


  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  }
  return (<>
    <div className="navbar bg-base-100 shadow-sm p-4">
    <div className="navbar-start">
     
      <a className="btn btn-ghost text-xl">Clients</a>
    </div>
    <div className="navbar-center">
        <div className="form-control">
    <input type="text" placeholder="Search" class="input input-bordered w-48 md:w-auto" onChange={handleSearchChange} />
        </div>
    </div>
    <div className="navbar-end">
      <a className="btn btn-primary" onClick={onOpen}>Add Client</a>
    </div>
  </div>
  </>
  )
};



