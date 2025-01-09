import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id='Contact'>
      <div className="container">
        <div className="row footer-container">
          <div className="col-md-4 footer-section">
            <h4 className="footer-title">KITCHEN KRAFT EQUIPMENTS</h4>
            <p>Crafting Excellence, Empowering Kitchens.</p>
          </div>
          <div className="col-md-4 footer-section social-media">
            <h4 className="footer-title">Follow Us</h4>
            <ul>
              <li>
                <a href="https://www.facebook.com/photo/?fbid=199870049117925&set=a.100656812372583" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                    <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@KitchenKraftEquipments" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30">
                    <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
                  </svg>
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/kitchen_equipments_india/?igshid=MzNlNGNkZWQ4Mg%3D%3D" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                    <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
                  </svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
               <a href="https://maps.app.goo.gl/XPVmLH3EKiVXP1nH8" target='_blank'> Katraj - Kondhwa Rd, near Khadi machine, Dandekar industrial estate, Kondhwa Budruk, Pune, Maharashtra 411048
               </a>
            </p>
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 13L2 6.76V18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6.76L12 13zm0-2L21.82 4H2.18L12 11z"/>
                </svg>
              Email:<a href="mailto:info@kitchenkraftequipments.in"> info@kitchenkraftequipments.in</a>
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24a11.36 11.36 0 003.58.57c.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.4 21 3 13.6 3 4.5 3 4.22 3.22 4 3.5 4H7c.55 0 1 .45 1 1 0 1.23.2 2.43.57 3.58.12.35.03.75-.24 1.02l-2.2 2.19z"/>
              </svg>
              Phone: <a href="tel:+918830696290">+91 8830696290</a>
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/>
              </svg>
              Monday - Friday: 10:00 to 6:00
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center py-3">
        <p>Copyright &copy;2025 KITCHEN KRAFT EQUIPMENTS. All rights reserved. <a href='https://www.instagram.com/crafted_stack/' target='blank' className='Designedby'>Designed by CraftedStack</a></p>
        <p>"Your Partner in Building Perfect Commercial Kitchens."</p>
      </div>
    </footer>
  );
};

export default Footer;
