import React from 'react';

function NavBar() {
  return (
    <div className='flex justify-center p-3 bg-black'>
        <img src="title.svg" className='h-12 pr-3' alt="" />
      <h1 className='text-4xl font-bold text-white'>Taskify</h1>
    </div>
  );
}

export default NavBar;
