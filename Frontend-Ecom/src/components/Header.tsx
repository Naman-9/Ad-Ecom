import React, { useState } from 'react';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { User } from '../types/types';

// const user = { };

interface PropsTypes {
  user: User | null;
}

const Header = ({user}: PropsTypes) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='header'>
      <Link to={'/'} onClick={() => setIsOpen(false)}>Home</Link>
      <Link to={'/search'} onClick={() => setIsOpen(false)}>
        <FaSearch />{' '}
      </Link>
      <Link to={'/cart'} onClick={() => setIsOpen(false)}>
        <FaShoppingBag />{' '}
      </Link>
      {user?._id ? (
        <>
          <button 
            onClick={() => setIsOpen((prev) => !prev)}          
          >
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === 'admin' && <Link to="/admin/dashboard">Admin</Link>}
              <Link to="/orders">Orders</Link>
              <button>
                <FaSignInAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <>
          <Link to={'/login'}>
            SignIn
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
