import { useEffect, useState } from "react";
import { useRange } from "react-instantsearch";
import * as Slider from "@radix-ui/react-slider";

import "./RangeSliderCSS.css";

function RadixSlider(props: any) {
  const { start, range, canRefine, refine } = useRange(props);
  const { min, max }: any = range;
  const [value, setValue] = useState([min, max]);

  const [toggleDropdown, setToggleDropdown] = useState(true);

  const from = Math.max(min, Number.isFinite(start[0]) ? start[0] : min);
  const to = Math.min(max, Number.isFinite(start[1]) ? start[1] : max);

  useEffect(() => {
    setValue([from, to]);
  }, [from, to]);

  return (
    canRefine && (
      <div className='bg-white shadow-1 rounded-lg'>
        <div
          onClick={() => setToggleDropdown(!toggleDropdown)}
          className='cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 shadow-filter'
        >
          <p className='text-dark'>Price</p>
          <button
            onClick={() => setToggleDropdown(!toggleDropdown)}
            id='price-dropdown-btn'
            aria-label='button for price dropdown'
            className={`text-dark ease-out duration-200 ${
              toggleDropdown && "rotate-180"
            }`}
          >
            <svg
              className='fill-current'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z'
                fill=''
              />
            </svg>
          </button>
        </div>

        {/* // <!-- dropdown menu --> */}
        <div className={`p-6 mt-7.5 ${toggleDropdown ? "block" : "hidden"}`}>
          <div id='pricingOne'>
            <div className='price-range'>
              <Slider.Root
                className='slider-root'
                min={min}
                max={max}
                value={value}
                onValueChange={setValue}
                onValueCommit={refine as any}
                disabled={!canRefine}
              >
                <Slider.Track className='slider-track'>
                  <Slider.Range className='slider-range' />
                </Slider.Track>
                <Slider.Thumb className='slider-thumb' />
                <Slider.Thumb className='slider-thumb' />
              </Slider.Root>

              <div className='price-amount flex items-center justify-between pt-4'>
                <div className='text-custom-xs text-dark-4 flex rounded border border-gray-3/80'>
                  <span className='block border-r border-gray-3/80 px-2.5 py-1.5'>
                    $
                  </span>
                  <span id='minAmount' className='block px-3 py-1.5'>
                    {value[0]}
                  </span>
                </div>

                <div className='text-custom-xs text-dark-4 flex rounded border border-gray-3/80'>
                  <span className='block border-r border-gray-3/80 px-2.5 py-1.5'>
                    $
                  </span>
                  <span id='maxAmount' className='block px-3 py-1.5'>
                    {value[1]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default RadixSlider;
