import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Headers = () => {
  const cartItems = useSelector(state => {
    return state.cartData.cart;
  });

  return (
    <>
      <Navbar className="bg-black text-white " fixed="top">
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-2">
            <h3 className="text-light">Shoppy</h3>
          </NavLink>
          <NavLink to="/cart" className="text-decoration-none text-light mx-2">
            <div id="ex4" className="relative">
              {cartItems.length ? cartItems.length : null}
              <span className="p1 fa-stack fa-2x has-badge">
                <i className="fas fa-shopping-cart"></i>
              </span>
            </div>
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
