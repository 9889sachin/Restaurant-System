import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function PUT(req, { params }) {
  try {
    const { status } = await req.json();
    await connectDB();

    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder)
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating order" }), {
      status: 500,
    });
  }
}
