import Controller from "../../components/controller";
import Link from "next/link";
import { } from "react-icons/ai"

export default function Chat() {
  return (
    <div className=" px-10 bg-slate-100 py-5">
      <div className="flex">
        <div className="text-black pt-5 rounded-xl p-5 w-1/2 mr-5 font-bold border-2 hover:bg-[#542ee6] hover:text-white transition duration-300 m-2">
          <Link href="/upload" className="w-full text-sm  ">
            Manage Documents
          </Link>
        </div>
        <div className="text-black pt-5 rounded-xl p-5 w-1/2 font-bold border-2 hover:bg-[#2a8ce6] hover:text-white transition duration-300 m-2">
        <Link href="/profile" className="w-full text-sm ">
            Set API Keys
          </Link>
        </div>
      </div>

      <Controller />
    </div>
  );
}
