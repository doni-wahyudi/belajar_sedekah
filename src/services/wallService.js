import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { initialPrayers } from '../data/wallOfKindness';

const mapMessageRow = (row) => ({
  id: row.id,
  author: row.author || 'Hamba Allah',
  location: row.location || 'Lampung',
  role: row.role || 'Sahabat Berbagi',
  programTag: row.program_tag || "Jum'at Berkah 💌",
  message: row.message || '',
  date: formatDate(row.created_at),
  likes: row.likes || 0,
  avatarBg: row.avatar_bg || 'linear-gradient(135deg, #15803d, #4ade80)',
});

const formatDate = (dateString) => {
  if (!dateString) return 'Baru saja';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
};

/**
 * Fetch kindness wall messages from Supabase or fallback
 */
export async function fetchKindnessMessages() {
  if (!isSupabaseConfigured) {
    return initialPrayers;
  }

  try {
    const { data, error } = await supabase
      .from('wall_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error for wall messages:', error.message);
      return initialPrayers;
    }

    if (!data || data.length === 0) {
      return initialPrayers;
    }

    return data.map(mapMessageRow);
  } catch (err) {
    console.error('Error in fetchKindnessMessages:', err);
    return initialPrayers;
  }
}

/**
 * Subscribe to real-time prayer messages
 */
export function subscribeKindnessMessages(onNewMessage) {
  if (!isSupabaseConfigured) {
    return () => {};
  }

  try {
    const channel = supabase
      .channel('wall-messages-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wall_messages' },
        (payload) => {
          if (payload && payload.new) {
            onNewMessage(mapMessageRow(payload.new));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.error('Failed to subscribe to wall messages:', err);
    return () => {};
  }
}

/**
 * Submit new prayer to the kindness wall
 */
export async function submitKindnessMessage(prayer) {
  if (!isSupabaseConfigured) {
    return { success: true, isMock: true, data: prayer };
  }

  try {
    const payload = {
      author: prayer.author || 'Hamba Allah',
      location: prayer.location || 'Lampung',
      role: prayer.role || 'Sahabat Berbagi',
      program_tag: prayer.programTag || "Jum'at Berkah 💌",
      message: prayer.message,
      likes: 0,
      avatar_bg: prayer.avatarBg || 'linear-gradient(135deg, #15803d, #4ade80)',
      is_approved: true,
    };

    const { data, error } = await supabase
      .from('wall_messages')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: mapMessageRow(data) };
  } catch (err) {
    console.error('Error submitting prayer to Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Increment like count on a prayer
 */
export async function likeKindnessMessage(id) {
  if (!isSupabaseConfigured) {
    return { success: true, isMock: true };
  }

  try {
    // Try calling the custom RPC function first
    const { error: rpcError } = await supabase.rpc('increment_wall_message_like', {
      message_id: id,
    });

    if (rpcError) {
      // Fallback to fetch + update if RPC is not installed
      const { data: current } = await supabase
        .from('wall_messages')
        .select('likes')
        .eq('id', id)
        .single();
      
      if (current) {
        await supabase
          .from('wall_messages')
          .update({ likes: (current.likes || 0) + 1 })
          .eq('id', id);
      }
    }

    return { success: true };
  } catch (err) {
    console.error('Error liking prayer:', err);
    return { success: false, error: err.message };
  }
}
