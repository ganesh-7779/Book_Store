const mongoose = require("mongoose");

const wishList = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Registration",
  },
  bookId: {
    type : mongoose.Screen.Types.ObjectId,
    ref: "Product"
  },
  addedDate: {
    type: Date,
    default: Date.now(),
  },
});

const wishList = mongoose.model("wishList", BookWishList);
