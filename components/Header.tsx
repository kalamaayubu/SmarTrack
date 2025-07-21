import Image from "next/image"

const Header = () => {
  return (
    <div className="flex m-auto items-center size-32 justify-center bg-green-600 rounded-full">
        <Image priority src={"/assets/icons/logo2.svg"} alt="logo" width={200} height={200} className="w-24"/> 
    </div>
  )
}

export default Header