const Role = require("../model/roleSchema");

const createRole = async (req, res) => {
  try {
    const {
      name
    } = req.body;

    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: "Bu nomdagi role allaqachon mavjud."
      });
    }

    const newRole = new Role({
      name
    });

    const savedRole = await newRole.save();

    return res.status(201).json({
      success: true,
      message: "Role muvaffaqiyatli yaratildi.",
      role: savedRole
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message
    });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    return res.status(200).json({
      success: true,
      message: "Roles muvaffaqiyatli olindi.",
      roles
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role topilmadi."
      });
    }
    return res.status(200).json({
      success: true,
      message: "Role muvaffaqiyatli olindi.",
      innerData: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await Role.findByIdAndDelete(roleId);

    if (!deletedRole) {
      return res.status(404).json({
        success: false,
        message: "Role topilmadi."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role muvaffaqiyatli o'chirildi."
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    const {
      name,
    } = req.body;

    const updatedRole = {
      name,
    };

    const updatedResult = await Role.findByIdAndUpdate(roleId, updatedRole, {
      new: true,
    });

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "Role topilmadi."
      });
    };

    return res.status(200).json({
      success: true,
      message: "Role muvaffaqiyatli yangilandi.",
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

const searchRole = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi."
      });
    }

    const Roles = await Role.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
      ],
    })

    return res.status(200).json({
      success: true,
      message: "Rolelar Muvaffaqiyatli topildi.",
      innerData: Roles,
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
  createRole,
  getRoles,
  getRoleById,
  deleteRole,
  updateRole,
  searchRole,
};