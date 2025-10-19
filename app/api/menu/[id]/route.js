import { connectDB } from "@/lib/db";
import MenuItem from "@/models/MenuItem";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const item = await MenuItem.findById(params.id);
    if (!item) return new Response("Item not found", { status: 404 });
    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    return new Response("Error fetching item", { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    await connectDB();
    const updated = await MenuItem.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response("Error updating item", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await MenuItem.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ message: "Item deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error deleting item", { status: 500 });
  }
}
