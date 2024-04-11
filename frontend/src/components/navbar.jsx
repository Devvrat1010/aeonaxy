import dribbbleLogo from '../assets/dribbbleLogo.png';
import { IoChevronBack } from "react-icons/io5";

export default function Navbar(props) {
    return (
        <nav className='font-medium flex justify-between items-center w-full px-2 py-3 lg:px-3 lg:py-4 3xl:px-5 3xl:py-6 text-sm md:text-base'>
            <div className='flex items-center gap-3 sm:gap-6 lg:gap-8'>
                <img src={dribbbleLogo} alt="" className='h-8 sm:h-10 lg:h-10 2xl:h-12' />
                {
                    props.back && <a href={props.backLink} className='text-[#5e51aa] bg-[#b1b1b1] p-2 lg:p-3 2xl:p-3 rounded-md'>
                        <IoChevronBack color='#181818'  />
                    </a>
                }
            </div>
            <h1 className='text-2xl mb-2'>
                {props.username}
            </h1>
        </nav>
    )
}