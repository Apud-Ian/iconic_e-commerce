const Footer = ()=>{
    return(
    <footer className="bottom-0 left-0 bg-white rounded-lg mt-auto shadow-sm">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">ICONIC<a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500">
            <li>
                <h5 className="hover:underline me-4 md:me-6">099-###-###</h5>
            </li>
        </ul>
        </div>
    </footer>
    );
};

export default Footer;