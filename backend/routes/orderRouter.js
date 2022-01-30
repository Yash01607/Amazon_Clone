import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productsModel.js";
import { isAuth, isAdmin } from "../util";

const orderRouter = express.Router();

orderRouter.get("/", isAuth, isAdmin, async (req, res) => {
  const Orders = await Order.find({}).populate("user", "name");
  res.send(Orders);
});

orderRouter.get("/summary", isAuth, isAdmin, async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);

  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 },
      },
    },
  ]);

  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        orders: { $sum: 1 },
        sales: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const productCategories = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  if (users && orders && dailyOrders && productCategories) {
    res.status(200).send({ users, orders, dailyOrders, productCategories });
  } else {
    res.status(404).send({ message: "Request Failed" });
  }
});

orderRouter.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.send(orders);
});

orderRouter.post("/", isAuth, async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ msg: "Cart is Empty" });
  } else {
    // console.log(req.body.orderItems)
    const order = new Order({
      orderItems: req.body.orderItems,
      paymentMethod: req.body.paymentMethod.paymentMethod,
      shippingAddress: req.body.shippingAddress,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user.id,
    });
    const createdOrder = await order.save();
    res.status(201).send({ msg: "New order created", order: createdOrder });
  }
});

orderRouter.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ msg: "Order not Found" });
  }
});

// orderRouter.put(
//   "/:id/pay",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       const updatedOrder = await order.save();
//       res.send({ message: "Order Paid", order: updatedOrder });
//     } else {
//       res.status(404).send({ message: "Order Not Found" });
//     }
//   })
// );

orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    // console.log(order);
    if (order) {
      await order.remove();
      res.send({ message: "Order Deleted" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/deliver",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = !order.isDelivered;
      if (order.isDelivered) {
        order.deliveredAt = Date.now();
      } else {
        order.deliveredAt = null;
      }
      order.deliveredBy = req.user.name;

      const updatedOrder = await order.save();
      // console.log(updatedOrder);
      res.status(200).send({ message: "Order Delivered", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pack",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPacked = !order.isPacked;
      if (order.isPacked) {
        order.packedAt = Date.now();
      } else {
        order.packedAt = null;
      }
      order.packedBy = req.user.name;

      const updatedOrder = await order.save();
      // console.log(updatedOrder);
      res.status(200).send({ message: "Order Packed", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/dispatch",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDispatched = !order.isDispatched;
      if (order.isDispatched) {
        order.dispatchedAt = Date.now();
      } else {
        order.dispatchedAt = null;
      }
      order.dispatchedBy = req.user.name;

      const updatedOrder = await order.save();
      // console.log(updatedOrder);
      res
        .status(200)
        .send({ message: "Order Dispatched", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = !order.isPaid;
      if (order.isPaid) {
        order.paidAt = Date.now();
      } else {
        order.paidAt = null;
      }
      order.paidBy = req.user.name;

      const updatedOrder = await order.save();
      res.status(200).send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

// orderRouter.put(
//   "/:id/pay",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };
//       order.paidBy = req.user.name;
//       const updatedOrder = await order.save();
//       res.send({ message: "Order Paid", order: updatedOrder });
//     } else {
//       res.status(404).send({ message: "Order Not Found" });
//     }
//   })
// );

export default orderRouter;
