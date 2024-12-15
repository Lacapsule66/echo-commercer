import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Dropdown = ({ menuItem, stickyMenu }: any) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();

  return (
    <li
      onClick={() => setDropdownToggler(!dropdownToggler)}
      className={`group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full ${
        pathUrl.includes(menuItem.title) && "before:!w-full"
      }`}
    >
      <a
        href='#'
        className={`hover:text-blue text-custom-sm font-medium text-dark flex items-center gap-1.5 capitalize ${
          stickyMenu ? "xl:py-4" : "xl:py-6"
        } ${pathUrl.includes(menuItem.title) && "!text-blue"}`}
      >
        {menuItem.title}

        <svg
          className='stroke-current cursor-pointer group-hover:rotate-180'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3.83331 5.91669L7.99998 10.0834L12.1666 5.91669'
            stroke=''
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </a>

      {/* <!-- Dropdown Start --> */}
      <ul
        className={`dropdown ${dropdownToggler && "flex"} ${
          stickyMenu
            ? "xl:group-hover:translate-y-0"
            : "xl:group-hover:translate-y-0"
        }`}
      >
        {menuItem.submenu.map((item: any, i: any) => (
          <li key={i}>
            <Link
              href={item.path}
              className={`flex text-custom-sm hover:text-blue hover:bg-gray-1 py-[7px] px-4.5 ${
                pathUrl === item.path && "text-blue bg-gray-1"
              } `}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
};

export default Dropdown;
