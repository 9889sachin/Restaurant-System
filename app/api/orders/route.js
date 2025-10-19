import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const { user, items, totalAmount, address } = await req.json();
    await connectDB();

    const newOrder = new Order({ user, items, totalAmount, address });
    await newOrder.save();

    return new Response(
      JSON.stringify({ message: "Order placed successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Order create error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.menuItem", "name price");
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching orders" }), {
      status: 500,
    });
  }
}
