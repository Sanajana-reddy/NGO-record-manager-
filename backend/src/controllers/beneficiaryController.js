import Beneficiary from
"../models/BeneficiaryModel.js";

export const createBeneficiary =
async (req, res) => {


try {

  const beneficiary =
    await Beneficiary.create({
      ...req.body,
      registeredBy: req.user.id,
    });

  res.status(201).json(
    beneficiary
  );

} catch (error) {

  res.status(500).json({
    message:
      "Failed to create beneficiary",
  });
}


};

export const updateBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await Beneficiary.findById(id);
    if (!beneficiary) return res.status(404).json({ message: "Beneficiary not found" });

    // only admin or owner can update
    if (req.user.role !== "admin" && beneficiary.registeredBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update" });
    }

    const updated = await Beneficiary.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update beneficiary" });
  }
};

export const deleteBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await Beneficiary.findById(id);
    if (!beneficiary) return res.status(404).json({ message: "Beneficiary not found" });

    if (req.user.role !== "admin" && beneficiary.registeredBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await Beneficiary.findByIdAndDelete(id);
    res.status(200).json({ message: "Beneficiary deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete beneficiary" });
  }
};

export const getBeneficiaries =
async (req, res) => {


try {

  const query =
    req.user.role === "admin"
      ? {}
      : {
          registeredBy:
            req.user.id,
        };

  const beneficiaries =
    await Beneficiary.find(
      query
    ).sort({
      createdAt: -1,
    });

  res.status(200).json(
    beneficiaries
  );

} catch (error) {

  res.status(500).json({
    message:
      "Failed to fetch beneficiaries",
  });
}


};
