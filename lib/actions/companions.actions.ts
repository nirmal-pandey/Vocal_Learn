"use server"

import { createSupabaseClient } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server";

export const createCompanion = async( formData:CreateCompanion)=>{
            const {userId: author} = await auth()
            const supabase = createSupabaseClient();

            const { data , error} = await supabase
            .from('Companions')
            .insert({...formData, author})
            .select();

            if(error|| !data) throw new Error(error?.message || 'Failed to create a Companion');

            return data[0];
}


export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('Companions').select();

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: Companions, error } = await query;

    if(error) throw new Error(error.message);

    return Companions;
}

export const getCompanion = async (id:string)=>{

    const supabase = createSupabaseClient();

    const {data , error} = await supabase
        .from('Companions')
        .select()
        .eq('id', id);

    if(error) {
        throw new Error(error.message || 'Failed to fetch Companion');
    }
    
    return data[0];
}

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('session_history')
        .insert({ 
            companion_id : companionId,
            user_id: userId,
        })
        

    if (error) {
        throw new Error(error.message || 'Failed to add to session history');
    }

    return data;
}

export const getRecentSessions = async (limit = 10) => {

    
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('session_history')
        .select( `companions : companion_id(*)`)    
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        throw new Error(error.message || 'Failed to fetch recent sessions');
    }

    return data.map(({companions}) => companions);
}

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}

export const getUserCompanions = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('Companions')
        .select()
        .eq('author', userId)
        .order('created_at', { ascending: false })
        

    if(error) throw new Error(error.message);

    return data;
}

