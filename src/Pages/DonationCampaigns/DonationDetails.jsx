import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

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

  // Load campaign
  useEffect(() => {
    axiosSecure.get(`/donations/${id}`).then((res) => {
      setCampaign(res.data);
    });
  }, [id, axiosSecure]);

  // Load recommended
  useEffect(() => {
    axiosSecure.get(`/donations/recommended?exclude=${id}&limit=3`).then((res) => {
      setRecommended(res.data);
    });
  }, [id, axiosSecure]);

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const amount = parseFloat(donationAmount.trim());
    const remainingAmount = campaign.maxAmount - (campaign.totalDonated || 0);

    if (isNaN(amount) || amount <= 0) {
      Swal.fire("Error", "Please enter a valid donation amount greater than zero.", "error");
      return;
    }

    if (amount > remainingAmount) {
      Swal.fire(
        "Limit Exceeded",
        `You can donate a maximum of $${remainingAmount.toFixed(2)} for this campaign.`,
        "warning"
      );
      return;
    }

    try {
      const { data: clientSecret } = await axiosSecure.post("/create-payment-intent", { amount });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        Swal.fire("Error", result.error.message, "error");
      } else if (result.paymentIntent.status === "succeeded") {
        const res = await axiosSecure.post("/donations/donate", {
          campaignId: id,
          amount,
          donor: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "user@example.com",
          },
        });

        Swal.fire("Success", "Thank you for your donation!", "success");
        setDonationAmount("");
        setModalOpen(false);

        // Update state
        setCampaign((prev) => ({
          ...prev,
          totalDonated: res.data.totalDonated,
          donators: [
            ...(prev.donators || []),
            {
              name: user?.displayName || "Anonymous",
              email: user?.email || "user@example.com",
              amount,
              donatedAt: new Date().toISOString(),
            },
          ],
        }));
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Payment failed or server error.", "error");
    }
  };

  if (!campaign) return <p className="text-center mt-10">Loading donation details...</p>;

  const remainingAmount = (campaign.maxAmount - (campaign.totalDonated || 0)).toFixed(2);

  return (
    <section className="max-w-4xl mx-auto px-4 py-25">
      <h2 className="text-3xl font-bold mb-4">{campaign.petName}</h2>
      <img src={campaign.image} alt={campaign.petName} className="w-full h-80 object-cover rounded-lg mb-6" />

      <p className="mb-2 text-gray-700 dark:text-gray-300">
        <strong>Maximum Amount:</strong> ${campaign.maxAmount.toFixed(2)}
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <strong>Donated:</strong> ${campaign.totalDonated || 0}
      </p>
      <progress
        className="progress progress-success w-full mb-6"
        value={campaign.totalDonated || 0}
        max={campaign.maxAmount}
      ></progress>

      <p className="mb-4">{campaign.longDescription}</p>

      <button
        className="btn rounded-2xl p-3 text-white bg-yellow-500 hover:bg-green-800 mx-auto btn-primary"
        onClick={() => setModalOpen(true)}
      >
        Donate Now
      </button>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white dark:bg-gray-800 p-10 w-3xl h-80 mx-auto mt-20 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-background/80 backdrop-blur-md shadow-sm p-20 flex items-start justify-center"
      >
        <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
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
          />
          <CardElement className="p-3 border rounded-md dark:bg-gray-900" />
          <button
            type="submit"
            className="btn rounded-2xl text-white p-3 bg-yellow-500 hover:bg-green-800 mx-auto mt-4"
            disabled={!donationAmount || parseFloat(donationAmount) <= 0}
          >
            Submit Donation
          </button>
        </form>
      </Modal>

      {/* Recommended */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Recommended Donations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommended.map((rec) => (
            <div
              key={rec._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
            >
              <img src={rec.image} alt={rec.petName} className="w-full h-36 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-1">{rec.petName}</h4>
                <p className="text-sm text-gray-500">
                  Max: ${rec.maxAmount.toFixed(2)} | Donated: ${rec.totalDonated || 0}
                </p>
                <Link to={`/donations/${rec._id}`} className="btn btn-sm btn-primary mt-2">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationDetails;
