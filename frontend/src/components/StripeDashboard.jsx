import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";

const StripeDashboard = () => {
    const { user } = useUser();
    const { defaultTexts, setLoading } = useData();
    const [stripeData, setStripeData] = useState(null);
    const [isPayoutProcessing, setIsPayoutProcessing] = useState(false);
    const [userData, setUserData] = useState();

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
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Handle Payout action
    async function handlePayout() {
        setIsPayoutProcessing(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/payment/withdraw/${userData.stripe_id}`
            );
            if (response.data.success) {
                alert("Payout successful!");
                // Optionally refetch data after a successful payout
                fetchData();
            } else {
                alert("Failed to initiate payout. Try again later.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while processing the payout.");
        } finally {
            setIsPayoutProcessing(false);
        }
    }

    const fetchUserData = async() => {
        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.id}`);
        if(userResponse.data.success === true){
            setUserData(userResponse.data.user)
        }
        else{
            console.log(userResponse.data);
            alert(userResponse.data.message);
        }
    }

    useEffect(() => {
        fetchData();
        fetchUserData()
        console.log(defaultTexts.stripeDashboard)
    }, []);

    return (
        <div className="flex flex-col">
            {stripeData && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">
                        {defaultTexts.stripeDashboard.title}
                    </h2>

                    <div className="flex md:flex-row flex-col">
                        <div className="py-6 px-10 m-5 border rounded-2xl border-black/10 w-fit">
                            <h3 className="text-3xl font-semibold tracking-tighter mb-5">
                                {defaultTexts.stripeDashboard.balance.sectionTitle}
                            </h3>
                            <div className="flex md:gap-40 gap-28">
                                <div className="">
                                    <h3 className="text-lg">
                                        {defaultTexts.stripeDashboard.balance.available}
                                    </h3>
                                    <h3 className="text-2xl font-semibold">
                                        {stripeData.balance.available}
                                    </h3>
                                </div>

                                <div className="">
                                    <h3 className="text-lg">
                                        {defaultTexts.stripeDashboard.balance.pending}
                                    </h3>
                                    <h3 className="text-2xl font-semibold">
                                        {stripeData.balance.pending}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Payout Section - Replace Recent Payout with Withdraw Button */}
                        <div className="py-6 px-10 m-5 border rounded-2xl border-black/10 flex-1">
                            <h3 className="text-3xl font-semibold tracking-tighter mb-5">
                                {defaultTexts.stripeDashboard.payouts.sectionTitle}
                            </h3>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg">
                                    {defaultTexts.stripeDashboard.payouts.noPayouts}
                                </h3>

                                {/* Withdraw Button */}
                                <button
                                    onClick={handlePayout}
                                    disabled={isPayoutProcessing || stripeData.balance.available === 0}
                                    className={`py-2 px-4 rounded-md text-white font-semibold ${
                                        isPayoutProcessing
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                >
                                    {isPayoutProcessing ? "Processing..." : "Withdraw"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="py-6 px-10 m-5 border rounded-2xl border-black/10 overflow-auto">
                        <h3 className="text-3xl font-semibold tracking-tighter mb-5">
                            {defaultTexts.stripeDashboard.transactions.sectionTitle}
                        </h3>
                        <div>
                            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-16 py-3 text-left text-sm font-medium">
                                            {defaultTexts.stripeDashboard.transactions.table.headers.id}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            {defaultTexts.stripeDashboard.transactions.table.headers.amount}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            {defaultTexts.stripeDashboard.transactions.table.headers.date}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            {defaultTexts.stripeDashboard.transactions.table.headers.status}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            {defaultTexts.stripeDashboard.transactions.table.headers.type}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stripeData.transactions.length > 0 && (
                                        <>
                                            {stripeData.transactions.map((e) => (
                                                <tr key={e.id} className="border-b">
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
                                            ))}
                                        </>
                                    )}
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
