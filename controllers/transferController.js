const createTransferRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, amount } = req.body;

    const result = await req.db
      .collection("transfers")
      .insertOne({ userId, title, amount, status: "pending" });

    res.json({
      message: "Transfer request created successfully.",
      transferId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating transfer request:", error);
    res.status(500).json({ error: "Failed to create transfer request." });
  }
};

const getTransferList = async (req, res) => {
  try {
    const userId = req.user._id;

    const transferList = await req.db
      .collection("transfers")
      .find({ userId })
      .toArray();

    res.json({ transferList });
  } catch (error) {
    console.error("Error getting transfer list:", error);
    res.status(500).json({ error: "Failed to get transfer list." });
  }
};

module.exports = {
  createTransferRequest,
  getTransferList,
};
