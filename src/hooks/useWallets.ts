
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'

interface Wallet {
  id: string
  currency: string
  balance: number
  locked_balance: number
  wallet_address: string | null
  is_primary: boolean
}

export function useWallets() {
  const { user } = useAuth()
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setWallets([])
      setLoading(false)
      return
    }

    const fetchWallets = async () => {
      try {
        const { data, error } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .order('is_primary', { ascending: false })

        if (error) {
          console.error('Error fetching wallets:', error)
        } else {
          // Set default GAiA wallet address for all GAiA wallets
          const processedData = data?.map(wallet => ({
            ...wallet,
            wallet_address: wallet.currency === 'GAiA' ? '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh' : wallet.wallet_address
          })) || []
          setWallets(processedData)
        }
      } catch (error) {
        console.error('Error fetching wallets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWallets()

    // Set up real-time subscription for wallet updates
    const channel = supabase
      .channel('wallet_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wallets',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchWallets()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  const getWalletByCurrency = (currency: string) => {
    return wallets.find(wallet => wallet.currency === currency)
  }

  const getPrimaryWallet = () => {
    return wallets.find(wallet => wallet.is_primary) || wallets.find(wallet => wallet.currency === 'GAiA')
  }

  return {
    wallets,
    loading,
    getWalletByCurrency,
    getPrimaryWallet
  }
}
