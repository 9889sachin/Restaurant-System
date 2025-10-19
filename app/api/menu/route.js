import { connectDB } from "@/lib/db";
import MenuItem from "@/models/MenuItem";

export async function GET() {
  try {
    await connectDB();
    const menu = await MenuItem.find();
    return new Response(JSON.stringify(menu), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching menu" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { name, description, category, price, image } = await req.json();
    await connectDB();

    const item = new MenuItem({ name, description, category, price, image });
    await item.save();

    return new Response(JSON.stringify({ message: "Item added" }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error adding item" }), {
      status: 500,
    });
  }
}
