import supabase from "../supabaseClient";

export async function registerUser(name) {
    try {
        const { data, error } = await supabase
        .from("users")
        .insert([{ name: name}]);

        if (error) {
            console.error("Error registering user", error);
            return null;
        }

        const trackId = data[0].id;

        return trackId;
        
    } catch (err) {
        console.error("Error registering user", err);
        return null;
    }
}