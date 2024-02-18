import { useContext, useEffect, useRef, useState } from "react";
import { TestContext } from "../../Provider/NewsdataProvider";
import searchIcon from "../../assets/icons/search.svg";

const SearchBar = () => {
  const { setQuery } = useContext(TestContext);
  const [text, setText] = useState("");
  const ref = useRef();

  // focus activate//

  useEffect(() => {
    ref.current.focus();
  });

  // debounce start here//

  const Debounce = (fn, delay) => {
    const timeoutIdref = useRef();

    return function () {
      if (timeoutIdref.current) {
        clearTimeout(timeoutIdref.current);
      }

      timeoutIdref.current = setTimeout(() => {
        fn();
      }, delay);
    };
  };
  // debounce end here //

  const ondelay = Debounce(() => {
    setQuery(text);
  }, 1000);

  const handleChange = (e) => {
    setText(e.target.value);
    ondelay();
  };

  return (
    <div className="flex items-center space-x-3 lg:space-x-8 cursor-pointer relative">
      <input
        ref={ref}
        value={text}
        onChange={handleChange}
        className="bg-gray-300 py-2 px-6 rounded-3xl outline-none border-2 hover:border-green-400 duration-300 font-semibold"
        type="text"
      />
      <img
        className="absolute transform top-1/2 -translate-y-1/2 right-3 hover:w-6"
        src={searchIcon}
      />
    </div>
  );
};

export default SearchBar;
