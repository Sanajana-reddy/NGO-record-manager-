import express from "express";

import {
createBeneficiary,
getBeneficiaries,
} from
"../controllers/beneficiaryController.js";
import {
	updateBeneficiary,
	deleteBeneficiary,
} from "../controllers/beneficiaryController.js";

import {
verifyToken,
} from
"../middleware/AuthMiddleware.js";

const router =
express.Router();

router.post(
"/",
verifyToken,
createBeneficiary
);

router.get(
"/",
verifyToken,
getBeneficiaries
);

router.put(
	"/:id",
	verifyToken,
	updateBeneficiary
);

router.delete(
	"/:id",
	verifyToken,
	deleteBeneficiary
);

export default router;
