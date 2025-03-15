import supabase from "../supabaseClient";

export async function generateTrackingLink(userId) {
    try {
        const trackingLink = `http://localhost:5173/track/${userId}`;

        const { data, error } = await supabase
            .from("location_shares")
            .insert([{ user_id: userId }]);

        if (error) {
            console.error("Error inserting link into Supabase:", error);
            return null;
        }

        const trackId = data[0].id;

        return trackingLink;
    } catch (err) {
        console.error("Error generating tracking link:", err);
        return null;
    }
}