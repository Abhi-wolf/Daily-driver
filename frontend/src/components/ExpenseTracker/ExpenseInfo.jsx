import { ArrowUpRightIcon, ArrowDownLeftIcon } from "lucide-react";

function ExpenseInfo() {
  return (
    <div className="flex justify-around gap-8 m-4 p-4 flex-wrap">
      <div className="border-2 border-gray-100 rounded-lg w-[300px] h-[140px] shadow-lg p-4 flex flex-col justify-around">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl underline underline-offset-1 decoration-wavy decoration-1 font-semibold">
            Budget
          </h3>
          {/* <span className="text-md text-red-600">60%</span> */}
        </div>
        <p className="text-gray-500 font-semibold p-2 text-xl">₹ 12,038</p>
        <div className="flex items-center text-green-500 text-sm">
          <ArrowUpRightIcon className="w-5 h-5 " />
          <span className="flex gap-2 items-center">
            6% <span className="text-xs">Greater than last month</span>
          </span>
        </div>
      </div>
      <div className="border-2 border-gray-100 rounded-lg w-[300px] h-[140px] shadow-lg p-4 flex flex-col justify-around">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl underline underline-offset-1 decoration-wavy decoration-1 font-semibold">
            Expenses
          </h3>
          <span className="text-md text-purple-600">60%</span>
        </div>
        <p className="text-gray-500 font-semibold p-2 text-xl">₹ 12,038</p>
        <div className="flex items-center text-red-500 text-sm">
          <ArrowUpRightIcon className="w-5 h-5 " />
          <span className="flex gap-2 items-center">
            6% <span className="text-xs">Greater than last month</span>
          </span>
        </div>
      </div>
      <div className="border-2 border-gray-100 rounded-lg w-[300px] h-[140px] shadow-lg p-4 flex flex-col justify-around">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl underline underline-offset-1 decoration-wavy decoration-1 font-semibold">
            Savings
          </h3>
          <span className="text-md text-purple-600">40%</span>
        </div>
        <p className="text-gray-500 font-semibold p-2 text-xl">₹ 12,038</p>
        <div className="flex items-center text-green-500 text-sm">
          <ArrowDownLeftIcon className="w-5 h-5 " />
          <span className="flex gap-2 items-center">
            6% <span className="text-xs">Greater than last month</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExpenseInfo;
