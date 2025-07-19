import Image from "next/image"

const Header = () => {
  return (
    <div className="flex text-center items-center gap-2 justify-center">
      <div className="">
        <Image src={"/assets/icons/logo.svg"} alt="logo" width={200} height={200} className="w-12"/> 
      </div>
        <h1 className="-translate-y-0.5">SmarTrack</h1>
    </div>
  )
}

export default Header