import { IDKitWidget } from "@worldcoin/idkit";
import { useActiveAccount } from "thirdweb/react";

const WorldIDWidget = ({ onSuccess }) => {
  const wallet = useActiveAccount();

  return (
    <IDKitWidget
      app_id="app_staging_54d1dd46dafc3951f980d3b81a97a684"
      action="ticket-purchase-verification"
      signal={wallet?.address}
      onSuccess={onSuccess}
      theme="light"
      autoClose
    >
      {({ open }) => (
        <button
          onClick={open}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all"
        >
          Verify with World ID
        </button>
      )}
    </IDKitWidget>
  );
};

export default WorldIDWidget;
