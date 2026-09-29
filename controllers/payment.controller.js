const Payment = require("../model/paymentSchema");

const createPayment = async (req, res) => {
  try {
    const {
      student_id, payment_last_date, payment_date,
      price, is_paid, total_attent,
    } = req.body;

    const newPayment = new Payment({
      student_id, payment_last_date, payment_date,
      price, is_paid, total_attent,
    });
    await newPayment.save();

    const result = await Payment.findById(newPayment._id).populate("student_id");

    return res.status(201).json({
      success: true,
      message: "Payment muvaffaqiyatli yaratildi.",
      innerData: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate("student_id");

    return res.status(200).json({
      success: true,
      message: "Paymentlar ro'yxati muvaffaqiyatli olindi.",
      innerData: payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("student_id");

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment topilmadi." });
    }

    return res.status(200).json({
      success: true,
      message: "Payment topildi.",
      innerData: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const {
      student_id, payment_last_date, payment_date,
      price, is_paid, total_attent,
    } = req.body;

    const updatedPayment = {
      student_id, payment_last_date, payment_date,
      price, is_paid, total_attent,
    };

    const updatedResult = await Payment.findByIdAndUpdate(
      req.params.id, updatedPayment, { new: true }
    ).populate("student_id");

    if (!updatedResult) {
      return res.status(404).json({ success: false, message: "Payment topilmadi." });
    }

    return res.status(200).json({
      success: true,
      message: "Payment muvaffaqiyatli yangilandi.",
      innerData: updatedResult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Payment topilmadi." });
    }
    return res.status(200).json({
      success: true,
      message: "Payment muvaffaqiyatli o'chirildi.",
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
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};