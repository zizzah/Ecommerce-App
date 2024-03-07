import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <div className="  mx-auto h-16 ">
      <div className="  py-[8px] px-5 flex flex-wrap  gap-1 justify-between  ">
        <div className="  flex flex-1  h-12  items-center  justify-around">
          <span className=" cursor-pointer mx-1 text-sm">EN</span>
          <div className=" border   border-solid-[0.5px]">
            <input type="text" className=" border-none" />
            <SearchIcon />
          </div>
        </div>
        <div className="flex-1  h-12    items-center  ">
          <h1 className=" text-center my-2 font-bold ">EL-ZIZZAH</h1>
        </div>
        <div className="flex-1 bg-gray-600 h-12">
          <div className="menu text-sm  cursor-pointer">REGISTER</div>
          <div className="menu text-sm cursor-pointer">SIGNIN</div>
          <div className="menu text-sm cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
