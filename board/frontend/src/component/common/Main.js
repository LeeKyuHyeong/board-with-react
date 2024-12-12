import React from 'react';

const Main = ( {userData, sessionTime} ) => {
	return (
		<div>
			<h1>Welcome to the Home Page</h1>
      {userData ? (
        <p>Hello, {userData.name}! You are logged in.</p>
      ) : (
        <p>Please log in to access more features.</p>
      )}
		</div>
	);
};

export default Main;