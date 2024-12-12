import { verifyCloudProof } from "@worldcoin/idkit";

export default async function handler(req, res) {
  console.log("Received verification request:", req.body);

  try {
    const proof = req.body;
    const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID;
    const action = process.env.NEXT_PUBLIC_WLD_ACTION;

    const verifyRes = await verifyCloudProof(proof, app_id, action);

    if (verifyRes.success) {
      // Verification succeeded
      console.log("Verification successful:", verifyRes);
      res.status(200).json(verifyRes);
    } else {
      // Verification failed
      console.log("Verification failed:", verifyRes);
      res.status(400).json(verifyRes);
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Verification failed",
    });
  }
}
