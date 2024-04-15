import Link from 'next/link';
import '../src/app/globals.css';

const MenuButton = () => {
    return (
        <Link href="/menu">
            <img src="/menu.svg" alt="Menu" width={24} className='hover:animate-bounce delay-75'/>
        </Link>  
    );
};

export default MenuButton;