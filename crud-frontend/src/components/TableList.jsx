export default function TableList({ handleOpen }) {

  const clients = [ {id: 1, name: "John Doe", email: "John1.Doe@gmail.com", job: "Developer1", rate: "100", isactive: true},
    {id: 2, name: "John Doe", email: "John2.Doe@gmail.com", job: "Developer2", rate: "101", isactive: true},
    {id: 3, name: "John Doe", email: "John3.Doe@gmail.com", job: "Developer3", rate: "102", isactive: false},
    {id: 4,name: "John Doe", email: "John4.Doe@gmail.com", job: "Developer4", rate: "103", isactive: true}
  ]

  return (
    <>
      <div className="overflow-x-auto mt-10">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Job</th>
        <th>Rate</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody className="hover">
      {/* row 1 */}
      
        {clients.map((client) => (
            <tr>
        <th>{client.id}</th>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.job}</td>
        <td>{client.rate}</td>
        <td>
            <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary` : `btn-outline btn-primary`}`}>
               {client.isactive ? 'Active' : 'Inactive'}
                
            </button>
        </td>
        <td>
            <button onClick= {() => handleOpen('edit')} className="btn btn-secondary">Update</button>
        </td>
        <td>
            <button className="btn btn-accent">Delete</button>
        </td>
        </tr>))}
     
      {/* row 2 */}
     
    </tbody>
  </table>
</div>
    </>
  )
};

