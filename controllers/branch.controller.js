const Branch = require('../model/branchSchema');

const createBranch = async (req, res) => {
  try {
    const {
      name,
      address,
      call_number,
    } = req.body;

    const existingBranch = await Branch.findOne({
      name,
    });

    if (existingBranch) {
      return res.status(400).json({
        success: false,
        message: "Bu name bilan o'tgan foydalanuvchi mavjud."
      });
    }

    const newBranch = new Branch({
      name,
      address,
      call_number,
    });

    await newBranch.save();

    return res.status(201).json({
      success: true,
      message: "Branch muvaffaqiyatli yaratildi.",
      innerData: newBranch,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  };
};

const getBranchs = async (req, res) => {
  try {
    const branchs = await Branch.find()

    return res.status(200).json({
      success: true,
      message: "Branchlar muvoffaqiyatli olindi.",
      innerData: branchs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message
    });
  };
};

const getBranchById = async (req, res) => {
  try {
    const branchId = req.params.id;
    const branch = await Branch.findById(branchId);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch topilmadi."
      });
    };

    return res.status(200).json({
      success: true,
      message: "Branch muvaffaqiyatli olindi.",
      innerData: branch,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  };
};

const deleteBranch = async (req, res) => {
  try {
    const branchId = req.params.id;
    const deleteBranch = await Branch.findByIdAndDelete(branchId);

    if (!deleteBranch) {
      return res.status(404).json({
        success: false,
        message: "Branch topilmadi."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Branch muvaffaqiyatli o'chirildi."
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
}

const updateBranch = async (req, res) => {
  try {
    const branchId = req.params.id;

    const {
      name,
      address,
      call_number,
    } = req.body;

    const updatedBranch = {
      name,
      address,
      call_number,
    };

    const updatedResult = await Branch.findByIdAndUpdate(branchId, updatedBranch, {
      new: true,
    })

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "Branch topilmadi."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Branch muvaffaqiyatli yangilandi.",
      innerData: updatedResult,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  };
};

const searchBranch = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi."
      });
    }

    const branchs = await Branch.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { address: { $regex: searchQuery, $options: "i" } },
        { call_number: { $regex: searchQuery, $options: "i" } },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Branchlar muvaffaqiyatli topildi.",
      innerData: branchs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  };
};

module.exports = {
  createBranch,
  getBranchs,
  getBranchById,
  deleteBranch,
  updateBranch,
  searchBranch,
}