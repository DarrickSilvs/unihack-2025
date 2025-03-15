import supabase from "../supabaseClient";

export async function generateTrackingLink(userId) {
    const { data, error } = await supabase
        .from("location_shares")
        .insert([{ user_id: userId, active: true }])
        .select("id");

    if (error) {
        console.error("Error generating link:", error);
        return null;
    }

    const trackId = data[0].id;
    return `https://livetag.me/track/${trackId}`;
}