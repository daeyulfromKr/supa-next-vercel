import { supabase } from "@/lib/supabaseClient";

async function getPosts() {
  const { data, error } = await supabase.from("page").select("*");

    if (error) {
        console.error("Supabase connection failed:", error.message)
        return new Response(JSON.stringify({ connect: false, error}), { status: 500 })
    }
    
    console.log("Supabase connected successfully!");
    return new Response(JSON.stringify({ connect: true, users: data}), { status: 200})
}

export async function GET() {
  const post = await getPosts();

  return post;
}