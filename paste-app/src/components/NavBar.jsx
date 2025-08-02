import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='flex py-8 justify-between'>
      <h1 className='text-xl font-semibold text-orange-400'>PasteIt</h1>
      <div className='flex gap-8'>
      <NavLink to="/">
        Home 
      </NavLink>
      <NavLink to= "/pastes">
        Pastes 
      </NavLink>
    </div>
    </div>
  );
}

export default NavBar;
