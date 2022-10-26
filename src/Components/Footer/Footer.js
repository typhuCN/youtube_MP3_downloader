import Facebook from '../../assets/icon/facebook.svg';
import Github from '../../assets/icon/github.svg';
import Email from '../../assets/icon/inbox-solid.svg';
import Instagram from '../../assets/icon/instagram.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
        <p>Made by Nghiem Gia Bao || call me Lucas for short</p>
        <a href="mailto: bao15022016@gmail.com">Mail <img className='footerImg' src={Email}/> me at bao15022016@gmail.com</a>
        <p>Follow me on 
            <a href="https://www.facebook.com/profile.php?id=100086903335271">Facebook <img className='footerImg' src={Facebook} alt="Facebook"/></a> and visit my 
            <a href="https://github.com/typhuCN">Github <img className='footerImg' src={Github} alt="Github"/></a>
        </p>
    </footer>
  )
}

export default Footer