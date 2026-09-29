const Stuff = require('../model/stuffSchema');
const bcrypt = require('bcryptjs');

const createStuff = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      login,
      parol,
      is_active,
    } = req.body;

    const existingStuff = await Stuff.findOne({
      login
    });

    if (existingStuff) {
      return res.status(400).json({
        success: false,
        message: "Login oldin ro'yxatdan o'tib bo'lgan."
      });
    }

    const hashedParol = await bcrypt.hash(parol, 10);

    const newStuff = new Stuff({
      first_name,
      last_name,
      phone_number,
      login,
      parol: hashedParol,
      is_active,
    });

    await newStuff.save();

    const result = await Stuff.findById(newStuff._id).select("-parol");

    return res.status(201).json({
      success: true,
      message: "Stuff muvaffaqiyatli yaratildi.",
      innerData: result,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
}

const getStuffs = async (req, res) => {
  try {
    const stuffs = await Stuff.find().select("-parol");

    return res.status(200).json({
      success: true,
      message: "Stufflar muvaffaqiyatli olindi.",
      innerData: stuffs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message
    });
  }
}

const getStuffById = async (req, res) => {
  try {
    const stuffId = req.params.id;
    const stuff = await Stuff.findById(stuffId).select("-parol");

    if (!stuff) {
      return res.status(404).json({
        success: false,
        message: "Stuff topilmadi."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stuff muvaffaqiyatli olindi.",
      innerData: stuff,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message
    });
  }
}

const deleteStuff = async (req, res) => {
  try {
    const stuffId = req.params.id;
    const deleteStuff = await Stuff.findByIdAndDelete(stuffId);

    if (!deleteStuff) {
      return res.status(404).json({
        success: false,
        message: "Stuff topilmadi."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stuff muvaffaqiyatli o'chirildi."
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
}

const updateStuff = async (req, res) => {
  try {
    const stuffId = req.params.id;

    const {
      first_name,
      last_name,
      phone_number,
      login,
      parol,
      is_active,
    } = req.body;

    const updatedStuff = {
      first_name,
      last_name,
      phone_number,
      login,
      parol,
      is_active,
    };

    if (parol) {
      updatedStuff.parol = await bcrypt.hash(parol, 10);
    }

    const updatedResult = await Stuff.findByIdAndUpdate(stuffId, updatedStuff, {
      new: true,
    }).select("-parol");

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "Stuff topilmadi."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stuff muvaffaqiyatli yangilandi.",
      updatedStuff: updatedResult
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
}

const searchStuff = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi."
      });
    }

    const stuffs = await Stuff.find({
      $or: [
        { first_name: { $regex: searchQuery, $options: "i" } },
        { last_name: { $regex: searchQuery, $options: "i" } },
        { phone_number: { $regex: searchQuery, $options: "i" } },
        { login: { $regex: searchQuery, $options: "i" } },
      ],
    }).select("-parol");

    return res.status(200).json({
      success: true,
      message: "Stuff-lar muvaffaqiyatli topildi.",
      innerData: stuffs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

module.exports = {
  createStuff,
  getStuffs,
  getStuffById,
  deleteStuff,
  updateStuff,
  searchStuff,
};