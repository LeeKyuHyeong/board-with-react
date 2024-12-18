import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = ( {userdata} ) => {
  const [error, setError] = useState("");

	const navi = useNavigate();

  useEffect(() => {
		if(!userdata) {
			navi('/');
		}
    if (userdata.role !== "superAdmin") {
      setError("You are not authorized to view this page.");
      return;
    }   
  }, [userdata, navi]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <button>Auth</button>
			<button>List</button>
    </div>
  );
};

export default Admin;