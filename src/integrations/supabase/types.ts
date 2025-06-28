export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_sessions: {
        Row: {
          created_at: string | null
          device_fingerprint: string | null
          expires_at: string
          id: string
          ip_address: unknown
          session_token: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          device_fingerprint?: string | null
          expires_at?: string
          id?: string
          ip_address: unknown
          session_token: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          device_fingerprint?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown
          session_token?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_vault_access: {
        Row: {
          access_granted: boolean | null
          admin_user_id: string
          created_at: string
          expires_at: string | null
          id: string
          session_token: string | null
          step_1_verified: boolean | null
          step_2_verified: boolean | null
          step_3_verified: boolean | null
          step_4_verified: boolean | null
        }
        Insert: {
          access_granted?: boolean | null
          admin_user_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          session_token?: string | null
          step_1_verified?: boolean | null
          step_2_verified?: boolean | null
          step_3_verified?: boolean | null
          step_4_verified?: boolean | null
        }
        Update: {
          access_granted?: boolean | null
          admin_user_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          session_token?: string | null
          step_1_verified?: boolean | null
          step_2_verified?: boolean | null
          step_3_verified?: boolean | null
          step_4_verified?: boolean | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          contact_type: string
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          contact_type?: string
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          contact_type?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      environmental_impact: {
        Row: {
          action_type: string
          carbon_offset: number | null
          created_at: string | null
          description: string | null
          id: string
          ocean_cleanup_contribution: number | null
          transaction_id: string | null
          trees_planted: number | null
          user_id: string
        }
        Insert: {
          action_type: string
          carbon_offset?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          ocean_cleanup_contribution?: number | null
          transaction_id?: string | null
          trees_planted?: number | null
          user_id: string
        }
        Update: {
          action_type?: string
          carbon_offset?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          ocean_cleanup_contribution?: number | null
          transaction_id?: string | null
          trees_planted?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "environmental_impact_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_destinations: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          percentage_allocation: number | null
          wallet_address: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          percentage_allocation?: number | null
          wallet_address?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          percentage_allocation?: number | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      fee_transactions: {
        Row: {
          created_at: string
          destination_id: string | null
          destination_type: string
          fee_amount: number
          fee_currency: string
          id: string
          status: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          destination_id?: string | null
          destination_type: string
          fee_amount: number
          fee_currency?: string
          id?: string
          status?: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          destination_id?: string | null
          destination_type?: string
          fee_amount?: number
          fee_currency?: string
          id?: string
          status?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fee_transactions_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "fee_destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_transactions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_vault: {
        Row: {
          created_at: string
          currency: string
          id: string
          last_updated: string
          total_balance: number
        }
        Insert: {
          created_at?: string
          currency?: string
          id?: string
          last_updated?: string
          total_balance?: number
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          last_updated?: string
          total_balance?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          created_at: string | null
          fee: number | null
          filled_amount: number | null
          id: string
          order_type: Database["public"]["Enums"]["transaction_type"]
          price: number
          status: Database["public"]["Enums"]["order_status"] | null
          trading_pair_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          fee?: number | null
          filled_amount?: number | null
          id?: string
          order_type: Database["public"]["Enums"]["transaction_type"]
          price: number
          status?: Database["public"]["Enums"]["order_status"] | null
          trading_pair_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          fee?: number | null
          filled_amount?: number | null
          id?: string
          order_type?: Database["public"]["Enums"]["transaction_type"]
          price?: number
          status?: Database["public"]["Enums"]["order_status"] | null
          trading_pair_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_trading_pair_id_fkey"
            columns: ["trading_pair_id"]
            isOneToOne: false
            referencedRelation: "trading_pairs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string | null
          full_name: string | null
          id: string
          kyc_status: string | null
          phone: string | null
          security_level: Database["public"]["Enums"]["security_level"] | null
          two_factor_enabled: boolean | null
          updated_at: string | null
          username: string | null
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          kyc_status?: string | null
          phone?: string | null
          security_level?: Database["public"]["Enums"]["security_level"] | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          username?: string | null
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          kyc_status?: string | null
          phone?: string | null
          security_level?: Database["public"]["Enums"]["security_level"] | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          username?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      security_events: {
        Row: {
          created_at: string | null
          event_description: string
          event_type: string
          id: string
          ip_address: unknown | null
          resolved: boolean | null
          severity: Database["public"]["Enums"]["security_level"] | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_description: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          resolved?: boolean | null
          severity?: Database["public"]["Enums"]["security_level"] | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_description?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          resolved?: boolean | null
          severity?: Database["public"]["Enums"]["security_level"] | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      staking_pools: {
        Row: {
          active: boolean | null
          apy_rate: number
          created_at: string | null
          currency: string
          id: string
          max_stake_amount: number | null
          min_stake_amount: number | null
          reward_pool: number | null
          total_staked: number | null
        }
        Insert: {
          active?: boolean | null
          apy_rate: number
          created_at?: string | null
          currency: string
          id?: string
          max_stake_amount?: number | null
          min_stake_amount?: number | null
          reward_pool?: number | null
          total_staked?: number | null
        }
        Update: {
          active?: boolean | null
          apy_rate?: number
          created_at?: string | null
          currency?: string
          id?: string
          max_stake_amount?: number | null
          min_stake_amount?: number | null
          reward_pool?: number | null
          total_staked?: number | null
        }
        Relationships: []
      }
      swap_configurations: {
        Row: {
          created_at: string
          custom_fee_amount: number | null
          default_fee_percentage: number | null
          id: string
          preferred_fee_destination: string | null
          updated_at: string
          user_id: string
          zero_fee_enabled: boolean | null
        }
        Insert: {
          created_at?: string
          custom_fee_amount?: number | null
          default_fee_percentage?: number | null
          id?: string
          preferred_fee_destination?: string | null
          updated_at?: string
          user_id: string
          zero_fee_enabled?: boolean | null
        }
        Update: {
          created_at?: string
          custom_fee_amount?: number | null
          default_fee_percentage?: number | null
          id?: string
          preferred_fee_destination?: string | null
          updated_at?: string
          user_id?: string
          zero_fee_enabled?: boolean | null
        }
        Relationships: []
      }
      trading_pairs: {
        Row: {
          base_currency: string
          created_at: string | null
          current_price: number | null
          id: string
          market_cap: number | null
          max_trade_amount: number | null
          min_trade_amount: number | null
          price_change_24h: number | null
          quote_currency: string
          status: Database["public"]["Enums"]["trading_pair_status"] | null
          symbol: string
          trading_fee_percentage: number | null
          updated_at: string | null
          volume_24h: number | null
        }
        Insert: {
          base_currency: string
          created_at?: string | null
          current_price?: number | null
          id?: string
          market_cap?: number | null
          max_trade_amount?: number | null
          min_trade_amount?: number | null
          price_change_24h?: number | null
          quote_currency: string
          status?: Database["public"]["Enums"]["trading_pair_status"] | null
          symbol: string
          trading_fee_percentage?: number | null
          updated_at?: string | null
          volume_24h?: number | null
        }
        Update: {
          base_currency?: string
          created_at?: string | null
          current_price?: number | null
          id?: string
          market_cap?: number | null
          max_trade_amount?: number | null
          min_trade_amount?: number | null
          price_change_24h?: number | null
          quote_currency?: string
          status?: Database["public"]["Enums"]["trading_pair_status"] | null
          symbol?: string
          trading_fee_percentage?: number | null
          updated_at?: string | null
          volume_24h?: number | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          block_number: number | null
          created_at: string | null
          currency: string
          fee: number | null
          from_address: string | null
          id: string
          metadata: Json | null
          order_id: string | null
          status: string | null
          to_address: string | null
          transaction_hash: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          amount: number
          block_number?: number | null
          created_at?: string | null
          currency: string
          fee?: number | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string | null
          status?: string | null
          to_address?: string | null
          transaction_hash?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          amount?: number
          block_number?: number | null
          created_at?: string | null
          currency?: string
          fee?: number | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string | null
          status?: string | null
          to_address?: string | null
          transaction_hash?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stakes: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          last_reward_calculation: string | null
          rewards_earned: number | null
          staking_pool_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          last_reward_calculation?: string | null
          rewards_earned?: number | null
          staking_pool_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          last_reward_calculation?: string | null
          rewards_earned?: number | null
          staking_pool_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stakes_staking_pool_id_fkey"
            columns: ["staking_pool_id"]
            isOneToOne: false
            referencedRelation: "staking_pools"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          currency: string
          id: string
          is_primary: boolean | null
          locked_balance: number | null
          updated_at: string | null
          user_id: string
          wallet_address: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          currency: string
          id?: string
          is_primary?: boolean | null
          locked_balance?: number | null
          updated_at?: string | null
          user_id: string
          wallet_address?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          currency?: string
          id?: string
          is_primary?: boolean | null
          locked_balance?: number | null
          updated_at?: string | null
          user_id?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_session: {
        Args: {
          client_ip: unknown
          client_user_agent?: string
          client_fingerprint?: string
        }
        Returns: string
      }
      validate_admin_access: {
        Args: { client_ip: unknown }
        Returns: boolean
      }
      validate_admin_session: {
        Args: { token: string; client_ip: unknown }
        Returns: boolean
      }
    }
    Enums: {
      order_status: "pending" | "completed" | "cancelled" | "partial"
      security_level: "low" | "medium" | "high" | "maximum"
      trading_pair_status: "active" | "inactive" | "maintenance"
      transaction_type:
        | "buy"
        | "sell"
        | "transfer"
        | "stake"
        | "unstake"
        | "reward"
        | "burn"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status: ["pending", "completed", "cancelled", "partial"],
      security_level: ["low", "medium", "high", "maximum"],
      trading_pair_status: ["active", "inactive", "maintenance"],
      transaction_type: [
        "buy",
        "sell",
        "transfer",
        "stake",
        "unstake",
        "reward",
        "burn",
      ],
    },
  },
} as const
