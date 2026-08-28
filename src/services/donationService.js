import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { liveDonationHistory } from '../data/liveDonations';

// Helper to format currency in IDR
const formatRupiah = (num) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num);
};

// Helper to get initials
const getInitials = (name) => {
  if (!name || name === 'Hamba Allah') return 'HA';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

// Helper to map DB row to client UI model
const mapDonationRow = (row) => ({
  id: row.id,
  donorName: row.donor_name || 'Hamba Allah',
  isAnonymous: Boolean(row.is_anonymous),
  amount: Number(row.amount) || 0,
  formattedAmount: formatRupiah(Number(row.amount) || 0),
  program: row.program_name || "Jum'at Berkah (Jumber 💌)",
  programTag: row.program_tag || 'jumat-berkah',
  message: row.message || '',
  timeAgo: calculateTimeAgo(row.created_at),
  badge: row.is_verified ? 'Terverifikasi BSI' : 'Menunggu Verifikasi',
  avatarBg: row.avatar_bg || 'linear-gradient(135deg, #15803d, #4ade80)',
  initials: getInitials(row.is_anonymous ? 'Hamba Allah' : row.donor_name),
  location: row.location || 'Lampung',
});

const calculateTimeAgo = (dateString) => {
  if (!dateString) return 'Baru saja';
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'Baru saja';
  if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} jam lalu`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} hari lalu`;
};

/**
 * Fetch latest donations with fallback to local mock data
 */
export async function fetchLiveDonations(limit = 20) {
  if (!isSupabaseConfigured) {
    return liveDonationHistory.slice(0, limit);
  }

  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Supabase fetch error, using fallback:', error.message);
      return liveDonationHistory.slice(0, limit);
    }

    if (!data || data.length === 0) {
      return liveDonationHistory.slice(0, limit);
    }

    return data.map(mapDonationRow);
  } catch (err) {
    console.error('Error fetching donations from Supabase:', err);
    return liveDonationHistory.slice(0, limit);
  }
}

/**
 * Subscribe to real-time donation updates via Supabase Realtime
 */
export function subscribeLiveDonations(onNewDonation) {
  if (!isSupabaseConfigured) {
    return () => {}; // No-op cleanup
  }

  try {
    const channel = supabase
      .channel('live-donations-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'donations' },
        (payload) => {
          if (payload && payload.new) {
            const mapped = mapDonationRow(payload.new);
            onNewDonation(mapped);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.error('Failed to subscribe to live donations:', err);
    return () => {};
  }
}

/**
 * Submit a new donation record to Supabase
 */
export async function submitDonation(donation) {
  if (!isSupabaseConfigured) {
    return { success: true, isMock: true, data: donation };
  }

  try {
    const payload = {
      donor_name: donation.donorName || 'Hamba Allah',
      is_anonymous: Boolean(donation.isAnonymous),
      amount: donation.amount,
      program_name: donation.program,
      program_tag: donation.programTag || 'jumat-berkah',
      message: donation.message || '',
      location: donation.location || 'Lampung',
      is_verified: true, // Auto-verified for community demo
      avatar_bg: donation.avatarBg || 'linear-gradient(135deg, #15803d, #4ade80)',
    };

    const { data, error } = await supabase
      .from('donations')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: mapDonationRow(data) };
  } catch (err) {
    console.error('Error saving donation to Supabase:', err);
    return { success: false, error: err.message };
  }
}
