import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FaHandHoldingHeart,
  FaDollarSign,
  FaCoins,
  FaPauseCircle,
  FaRocket,
  FaPaw,
} from "react-icons/fa";

Modal.setAppElement("#root");

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [campaign, setCampaign] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    axiosSecure.get(`/donations/${id}`).then((res) => {
      setCampaign(res.data);
    });
  }, [id, axiosSecure]);

  useEffect(() => {
    axiosSecure
      .get(`/donations/recommended?exclude=${id}&limit=3`)
      .then((res) => setRecommended(res.data));
  }, [id, axiosSecure]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (campaign.paused) {
      Swal.fire("Paused", "Donations are currently disabled.", "warning");
      return;
    }

    const amount = parseFloat(donationAmount.trim());
    const remainingAmount = campaign.maxAmount - (campaign.totalDonated || 0);

    if (isNaN(amount) || amount <= 0) {
      return Swal.fire("Error", "Enter a valid donation amount.", "error");
    }
    if (amount > remainingAmount) {
      return Swal.fire(
        "Limit Exceeded",
        `You can donate up to $${remainingAmount.toFixed(2)}.`,
        "warning"
      );
    }

    try {
      const { data: clientSecret } = await axiosSecure.post(
        "/create-payment-intent",
        { amount }
      );

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        Swal.fire("Error", result.error.message, "error");
      } else if (result.paymentIntent.status === "succeeded") {
        const res = await axiosSecure.post("/donations/donate", {
          campaignId: id,
          amount,
          donor: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@example.com",
          },
        });

        Swal.fire("Success", "Thanks for your donation!", "success");
        setDonationAmount("");
        setModalOpen(false);

        setCampaign((prev) => ({
          ...prev,
          totalDonated: res.data.totalDonated,
          donators: [
            ...(prev.donators || []),
            {
              name: user?.displayName || "Anonymous",
              email: user?.email || "unknown@example.com",
              amount,
              donatedAt: new Date().toISOString(),
            },
          ],
        }));
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Payment or server error.", "error");
    }
  };

  const remainingAmount = campaign
    ? (campaign.maxAmount - (campaign.totalDonated || 0)).toFixed(2)
    : 0;

  return (
    <section className="max-w-5xl mx-auto px-4 py-25">
      {!campaign ? (
        <div className="space-y-6">
          <Skeleton height={40} width={300} />
          <Skeleton height={320} />
          <Skeleton count={3} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl fredoka font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
            <FaHandHoldingHeart className="text-red-500" /> {campaign.petName}
          </h2>

          <img
            src={campaign.image}
            alt={campaign.petName}
            className="w-full h-100 object-cover rounded-lg mb-6"
          />

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
          
            <p className="flex lato items-center gap-2">
              <FaDollarSign /> Max Amount: ${campaign.maxAmount.toFixed(2)}
            </p>
            <p className="flex lato items-center gap-2">
              <FaCoins /> Donated: ${campaign.totalDonated || 0}
            </p>
          </div>

          <progress
            className="progress progress-success w-full mt-3"
            value={campaign.totalDonated || 0}
            max={campaign.maxAmount}
          ></progress>

          <p className="mt-4 lato text-gray-700 dark:text-gray-200">
            {campaign.longDescription}
          </p>

          <button
            className={`btn mt-6 rounded-2xl fredoka p-3 text-white w-full max-w-xs flex items-center justify-center gap-2 ${
              campaign.paused
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-green-800"
            }`}
            onClick={() => !campaign.paused && setModalOpen(true)}
            disabled={campaign.paused}
          >
            {campaign.paused ? (
              <>
                <FaPauseCircle /> Campaign Paused
              </>
            ) : (
              <>
                <FaRocket /> Donate Now
              </>
            )}
          </button>

          {/* Modal */}
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            className="bg-white dark:bg-gray-800 p-10 w-full max-w-xl rounded-lg shadow-lg"
            overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>

            {campaign.paused && (
              <p className="text-red-600 lato font-semibold mb-4 text-center">
                This campaign is paused. Donations are disabled.
              </p>
            )}

            <p className="text-sm text-gray-600 lato dark:text-gray-300 mb-2">
              You can donate up to <strong>${remainingAmount}</strong>
            </p>

            <form onSubmit={handleDonate} className="space-y-4">
              <input
                type="number"
                className="input input-bordered border rounded w-full"
                placeholder="Enter donation amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                min="0.01"
                max={remainingAmount}
                step="0.01"
                disabled={campaign.paused}
              />
              <CardElement
                className="p-3 border rounded-md dark:bg-gray-900"
                options={{ disabled: campaign.paused }}
              />
              <button
                type="submit"
                className={`btn rounded-2xl fredoka text-white p-3 mt-4 w-full ${
                  campaign.paused
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-green-800"
                }`}
                disabled={
                  !donationAmount ||
                  parseFloat(donationAmount) <= 0 ||
                  campaign.paused
                }
              >
                Submit Donation
              </button>
            </form>
          </Modal>

          {/* Recommended Section */}
          <div className="mt-10">
            <h3 className="text-2xl fredoka font-semibold mb-4">
              Recommended Donations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommended.length === 0
                ? [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-800 p-4 rounded shadow"
                    >
                      <Skeleton height={120} />
                      <Skeleton width={100} />
                      <Skeleton width={140} />
                    </div>
                  ))
                : recommended.map((rec) => (
                    <motion.div
                      key={rec._id}
                      className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={rec.image}
                        alt={rec.petName}
                        className="w-full h-36 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold fredoka text-lg mb-1">
                          {rec.petName}
                        </h4>
                        <p className="text-sm lato text-gray-500">
                          Max: ${rec.maxAmount.toFixed(2)} | Donated: $
                          {rec.totalDonated || 0}
                        </p>
                        <Link
                          to={`/donations/${rec._id}`}
                          className="btn fredoka btn-sm btn-primary mt-2"
                        >
                          View
                        </Link>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default DonationDetails;
