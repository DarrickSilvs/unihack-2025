import supabase from "../supabaseClient";

export async function generateTrackingLink(userId) {
    try {
        const uniqueId = Math.random().toString(36).substring(2, 10);
        const trackingLink = `https://livetag.me/track/${uniqueId}`;

        const { data, error } = await supabase
            .from("location_shares")
            .insert([{ id: uniqueId, user_id: userId, active:true, created_at: new Date() }]);

        if (error) {
            console.error("Error inserting link into Supabase:", error);
            return null;
        }

        return trackingLink;
    } catch (err) {
        console.error("Error generating tracking link:", err);
        return null;
    }
}