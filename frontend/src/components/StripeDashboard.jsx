import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";

const StripeDashboard = () => {
    const { user } = useUser();

    const { setLoading } = useData();

    const [stripeData, setStripeData] = useState(null);

    async function fetchData() {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/payment/details/${user.id}`
            );
            console.log(response);
            if (response.data.success === true) {
                setStripeData(response.data.data);
            } else {
                console.log(response.data);
                alert(response.data.message);
            }
        } catch (err) {
            throw err;
        }
        setLoading(false);
    }
    

    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className=" flex flex-col">
            {stripeData && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

                    <div className="flex">
                        <div className="py-6 px-10  m-5 border rounded-2xl border-black/10 w-fit">
                            <h3 className="text-3xl font-semibold tracking-tighter mb-5">
                                Balance
                            </h3>
                            <div className="flex gap-40 ">
                                <div className="">
                                    <h3 className="text-lg ">Available</h3>
                                    <h3 className="text-2xl font-semibold">
                                        {stripeData.balance.available}
                                    </h3>
                                </div>

                                <div className="">
                                    <h3 className="text-lg ">Pending</h3>
                                    <h3 className="text-2xl font-semibold">
                                        {stripeData.balance.pending}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="py-6 px-10  m-5 border rounded-2xl border-black/10 flex-1">
                            <h3 className="text-3xl font-semibold tracking-tighter mb-5">
                                Recent Payouts
                            </h3>
                            <h3 className="text-lg ">No Payout Available</h3>
                        </div>
                    </div>
                    <div className="py-6 px-10  m-5 border rounded-2xl border-black/10 ">
                        <h3 className="text-3xl font-semibold tracking-tighter mb-5">
                            Recent Transactions
                        </h3>
                        <div>
                            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-16 py-3 text-left text-sm font-medium">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Amount
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stripeData.transactions.length > 0 && (
                                        <>
                                            {stripeData.transactions.map(
                                                (e) => {
                                                    console.log(e);
                                                    return (
                                                        <>
                                                            <tr className=" border-b">
                                                                <td className="px-16 py-4 text-sm text-gray-700">
                                                                    {e.id}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-700">
                                                                    ${e.amount}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-700">
                                                                    {formatDate(e.created)}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-green-600">
                                                                    {e.status}
                                                                </td>
                                                                <td className="px-4 py-4 text-sm text-gray-700">
                                                                    {e.type}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    );
                                                }
                                            )}
                                        </>
                                    )}
                                    {console.log(stripeData)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default StripeDashboard;
