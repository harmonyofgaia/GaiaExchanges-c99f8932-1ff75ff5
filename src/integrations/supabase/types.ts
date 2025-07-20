export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          details: Json | null
          id: number
          ip_address: unknown | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          id?: never
          ip_address?: unknown | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          id?: never
          ip_address?: unknown | null
        }
        Relationships: []
      }
      admin_media_library: {
        Row: {
          category: string
          created_at: string
          file_size: number
          file_type: string
          filename: string
          id: string
          is_active: boolean | null
          is_background_music: boolean | null
          metadata: Json | null
          mime_type: string
          original_name: string
          storage_bucket: string
          storage_path: string
          tags: string[] | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          file_size: number
          file_type: string
          filename: string
          id?: string
          is_active?: boolean | null
          is_background_music?: boolean | null
          metadata?: Json | null
          mime_type: string
          original_name: string
          storage_bucket?: string
          storage_path: string
          tags?: string[] | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          file_size?: number
          file_type?: string
          filename?: string
          id?: string
          is_active?: boolean | null
          is_background_music?: boolean | null
          metadata?: Json | null
          mime_type?: string
          original_name?: string
          storage_bucket?: string
          storage_path?: string
          tags?: string[] | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      admin_metrics: {
        Row: {
          id: string
          last_updated: string
          metadata: Json | null
          metric_name: string
          metric_type: string
          metric_value: number
        }
        Insert: {
          id?: string
          last_updated?: string
          metadata?: Json | null
          metric_name: string
          metric_type?: string
          metric_value?: number
        }
        Update: {
          id?: string
          last_updated?: string
          metadata?: Json | null
          metric_name?: string
          metric_type?: string
          metric_value?: number
        }
        Relationships: []
      }
      admin_role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["admin_permission"]
          role: Database["public"]["Enums"]["admin_role_type"]
        }
        Insert: {
          id?: never
          permission: Database["public"]["Enums"]["admin_permission"]
          role: Database["public"]["Enums"]["admin_role_type"]
        }
        Update: {
          id?: never
          permission?: Database["public"]["Enums"]["admin_permission"]
          role?: Database["public"]["Enums"]["admin_role_type"]
        }
        Relationships: []
      }
      admin_roles: {
        Row: {
          created_at: string
          is_active: boolean
          role: Database["public"]["Enums"]["admin_role_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          is_active?: boolean
          role: Database["public"]["Enums"]["admin_role_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          is_active?: boolean
          role?: Database["public"]["Enums"]["admin_role_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
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
      admin_users: {
        Row: {
          created_at: string | null
          is_active: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          is_active?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          is_active?: boolean | null
          user_id?: string
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
      bike_sessions: {
        Row: {
          bike_type: string
          created_at: string
          distance: number
          end_time: string | null
          id: string
          route_data: Json | null
          start_time: string
          tokens_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          bike_type: string
          created_at?: string
          distance?: number
          end_time?: string | null
          id?: string
          route_data?: Json | null
          start_time: string
          tokens_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          bike_type?: string
          created_at?: string
          distance?: number
          end_time?: string | null
          id?: string
          route_data?: Json | null
          start_time?: string
          tokens_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      configuration_management: {
        Row: {
          config_name: string
          config_value: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          config_name: string
          config_value: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          config_name?: string
          config_value?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
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
        Relationships: []
      }
      error_logs: {
        Row: {
          context: Json | null
          created_at: string | null
          error_message: string
          error_type: string
          id: number
          is_critical: boolean | null
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          error_message: string
          error_type: string
          id?: never
          is_critical?: boolean | null
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          error_message?: string
          error_type?: string
          id?: never
          is_critical?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      feature_toggles: {
        Row: {
          admin_only: boolean | null
          category: string | null
          created_at: string | null
          created_by: string | null
          feature_description: string | null
          feature_name: string
          id: string
          is_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          admin_only?: boolean | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          feature_description?: string | null
          feature_name: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          admin_only?: boolean | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          feature_description?: string | null
          feature_name?: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
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
      food_places: {
        Row: {
          created_at: string
          description: string | null
          food_types: string[] | null
          forest_layer: number | null
          id: string
          is_active: boolean | null
          location_data: Json
          name: string
          owner_id: string
          tokens_accepted: boolean | null
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          food_types?: string[] | null
          forest_layer?: number | null
          id?: string
          is_active?: boolean | null
          location_data?: Json
          name: string
          owner_id: string
          tokens_accepted?: boolean | null
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          description?: string | null
          food_types?: string[] | null
          forest_layer?: number | null
          id?: string
          is_active?: boolean | null
          location_data?: Json
          name?: string
          owner_id?: string
          tokens_accepted?: boolean | null
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      gaia_earning_activities: {
        Row: {
          activity_description: string | null
          activity_type: string
          completed_at: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          reference_id: string | null
          status: string | null
          tokens_earned: number
          user_id: string
        }
        Insert: {
          activity_description?: string | null
          activity_type: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          status?: string | null
          tokens_earned?: number
          user_id: string
        }
        Update: {
          activity_description?: string | null
          activity_type?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          status?: string | null
          tokens_earned?: number
          user_id?: string
        }
        Relationships: []
      }
      generated_artwork: {
        Row: {
          artwork_type: string
          cloud_path: string | null
          cloud_url: string | null
          created_at: string | null
          downloads: number | null
          file_size: number | null
          generated_at: string | null
          id: string
          image_data: string
          nft_ready: boolean | null
          prompt: string
          storage_metadata: Json | null
          style: string
          updated_at: string | null
        }
        Insert: {
          artwork_type: string
          cloud_path?: string | null
          cloud_url?: string | null
          created_at?: string | null
          downloads?: number | null
          file_size?: number | null
          generated_at?: string | null
          id?: string
          image_data: string
          nft_ready?: boolean | null
          prompt: string
          storage_metadata?: Json | null
          style: string
          updated_at?: string | null
        }
        Update: {
          artwork_type?: string
          cloud_path?: string | null
          cloud_url?: string | null
          created_at?: string | null
          downloads?: number | null
          file_size?: number | null
          generated_at?: string | null
          id?: string
          image_data?: string
          nft_ready?: boolean | null
          prompt?: string
          storage_metadata?: Json | null
          style?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      high_severity_alerts: {
        Row: {
          created_at: string | null
          event_id: string
          event_type: string
          id: string
          notification_sent: boolean | null
          resolution_notes: string | null
          resolved_at: string | null
          severity_level: number
        }
        Insert: {
          created_at?: string | null
          event_id: string
          event_type: string
          id?: string
          notification_sent?: boolean | null
          resolution_notes?: string | null
          resolved_at?: string | null
          severity_level: number
        }
        Update: {
          created_at?: string | null
          event_id?: string
          event_type?: string
          id?: string
          notification_sent?: boolean | null
          resolution_notes?: string | null
          resolved_at?: string | null
          severity_level?: number
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
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          product_id: string
          quantity: number
          total_price: number | null
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          product_id: string
          quantity?: number
          total_price?: number | null
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          total_price?: number | null
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
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
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          last_login: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      security_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          details: Json
          id: string
          resolved_at: string | null
          severity: number
          status: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          details: Json
          id?: string
          resolved_at?: string | null
          severity: number
          status?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          details?: Json
          id?: string
          resolved_at?: string | null
          severity?: number
          status?: string | null
        }
        Relationships: []
      }
      security_events: {
        Row: {
          created_at: string | null
          event_category: string
          event_details: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          severity: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_category?: string
          event_details?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          severity?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_category?: string
          event_details?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          severity?: number
          user_id?: string | null
        }
        Relationships: []
      }
      security_log: {
        Row: {
          additional_details: Json | null
          event_timestamp: string | null
          event_type: string
          id: number
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          additional_details?: Json | null
          event_timestamp?: string | null
          event_type: string
          id?: never
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          additional_details?: Json | null
          event_timestamp?: string | null
          event_type?: string
          id?: never
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          client_addr: unknown | null
          created_at: string | null
          error_code: string
          error_context: Json | null
          error_message: string
          id: number
          log_level: string
          request_context: Json | null
          severity_score: number | null
          user_id: string | null
        }
        Insert: {
          client_addr?: unknown | null
          created_at?: string | null
          error_code: string
          error_context?: Json | null
          error_message: string
          id?: never
          log_level: string
          request_context?: Json | null
          severity_score?: number | null
          user_id?: string | null
        }
        Update: {
          client_addr?: unknown | null
          created_at?: string | null
          error_code?: string
          error_context?: Json | null
          error_message?: string
          id?: never
          log_level?: string
          request_context?: Json | null
          severity_score?: number | null
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
      table_dependencies: {
        Row: {
          cascade_delete: boolean | null
          created_at: string | null
          dependency_strength: number | null
          description: string | null
          foreign_key_column: string | null
          id: number
          is_active: boolean | null
          relationship_type: string
          source_table_name: string
          target_table_name: string
          updated_at: string | null
        }
        Insert: {
          cascade_delete?: boolean | null
          created_at?: string | null
          dependency_strength?: number | null
          description?: string | null
          foreign_key_column?: string | null
          id?: never
          is_active?: boolean | null
          relationship_type: string
          source_table_name: string
          target_table_name: string
          updated_at?: string | null
        }
        Update: {
          cascade_delete?: boolean | null
          created_at?: string | null
          dependency_strength?: number | null
          description?: string | null
          foreign_key_column?: string | null
          id?: never
          is_active?: boolean | null
          relationship_type?: string
          source_table_name?: string
          target_table_name?: string
          updated_at?: string | null
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
      transaction_types: {
        Row: {
          description: string | null
          id: number
          is_active: boolean | null
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          is_active?: boolean | null
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          external_reference: string | null
          id: number
          metadata: Json | null
          status: string | null
          transaction_type_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency: string
          external_reference?: string | null
          id?: never
          metadata?: Json | null
          status?: string | null
          transaction_type_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          external_reference?: string | null
          id?: never
          metadata?: Json | null
          status?: string | null
          transaction_type_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_transaction_type_id_fkey"
            columns: ["transaction_type_id"]
            isOneToOne: false
            referencedRelation: "transaction_types"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          granted_at: string | null
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
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
      video_likes: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
          video_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id: string
          video_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_likes_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      video_submissions: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          description: string | null
          duration_seconds: number | null
          file_size: number
          filename: string
          id: string
          likes: number | null
          mime_type: string
          original_name: string
          status: string | null
          storage_bucket: string | null
          storage_path: string
          thumbnail_url: string | null
          title: string
          tokens_earned: number | null
          tokens_paid: boolean | null
          updated_at: string | null
          user_id: string
          views: number | null
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          file_size: number
          filename: string
          id?: string
          likes?: number | null
          mime_type: string
          original_name: string
          status?: string | null
          storage_bucket?: string | null
          storage_path: string
          thumbnail_url?: string | null
          title: string
          tokens_earned?: number | null
          tokens_paid?: boolean | null
          updated_at?: string | null
          user_id: string
          views?: number | null
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          file_size?: number
          filename?: string
          id?: string
          likes?: number | null
          mime_type?: string
          original_name?: string
          status?: string | null
          storage_bucket?: string | null
          storage_path?: string
          thumbnail_url?: string | null
          title?: string
          tokens_earned?: number | null
          tokens_paid?: boolean | null
          updated_at?: string | null
          user_id?: string
          views?: number | null
        }
        Relationships: []
      }
      video_views: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          user_id: string | null
          video_id: string | null
          watched_duration_seconds: number | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
          video_id?: string | null
          watched_duration_seconds?: number | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
          video_id?: string | null
          watched_duration_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "video_views_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video_submissions"
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
      order_items_view: {
        Row: {
          created_at: string | null
          id: string | null
          order_id: string | null
          order_status: Database["public"]["Enums"]["order_status"] | null
          product_id: string | null
          quantity: number | null
          total_price: number | null
          unit_price: number | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      security_log_summary: {
        Row: {
          event_count: number | null
          event_type: string | null
          latest_event: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_admin_role: {
        Args:
          | {
              p_role: Database["public"]["Enums"]["admin_role_type"]
              p_user_id?: string
            }
          | { p_user_id?: string }
        Returns: boolean
      }
      add_admin_user: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      analyze_slow_queries: {
        Args: { threshold_ms?: number }
        Returns: {
          query: string
          calls: number
          total_time: number
          mean_time: number
        }[]
      }
      assign_admin_role: {
        Args:
          | { target_user_email: string; admin_user_email: string }
          | { target_user_uuid: string; admin_user_uuid: string }
        Returns: boolean
      }
      check_password_complexity: {
        Args: { password: string }
        Returns: boolean
      }
      configure_function_search_paths: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          function_name: string
          function_arguments: string
          status: string
          error_details: string
        }[]
      }
      create_admin_session: {
        Args: {
          client_ip: unknown
          client_user_agent?: string
          client_fingerprint?: string
        }
        Returns: string
      }
      create_index_if_not_exists: {
        Args:
          | { p_table_name: string; p_column_name: string }
          | {
              schema_name: string
              table_name: string
              index_name: string
              index_definition: string
            }
        Returns: boolean
      }
      create_security_alert: {
        Args: {
          p_alert_type: string
          p_description: string
          p_severity?: string
        }
        Returns: number
      }
      create_user_rls_policy: {
        Args: {
          p_table_name: string
          p_policy_name: string
          p_action?: string
          p_user_id_column?: string
        }
        Returns: undefined
      }
      diagnose_auth_issues: {
        Args: Record<PropertyKey, never>
        Returns: {
          check_name: string
          check_result: string
          additional_info: string
        }[]
      }
      diagnose_function_issues: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          function_name: string
          function_arguments: string
          prokind: string
          prosecdef: boolean
          provolatile: string
        }[]
      }
      enable_admin_two_factor: {
        Args: { admin_email: string }
        Returns: boolean
      }
      enforce_security_policy: {
        Args: { p_user_id: string; p_action: string; p_context?: Json }
        Returns: {
          policy_compliant: boolean
          violation_details: Json
        }[]
      }
      example_login_attempt: {
        Args: { p_username: string; p_success: boolean }
        Returns: boolean
      }
      generate_security_alert: {
        Args: { p_alert_type: string; p_severity: number; p_details: Json }
        Returns: string
      }
      generate_security_report: {
        Args: { p_start_date?: string; p_end_date?: string }
        Returns: {
          total_events: number
          successful_logins: number
          failed_logins: number
          lockouts: number
          high_severity_events: number
        }[]
      }
      generate_user_rls_policies: {
        Args: {
          table_name: string
          user_id_column?: string
          schema_name?: string
        }
        Returns: string
      }
      get_admin_user_id: {
        Args: { role_or_user_id: string }
        Returns: string
      }
      get_current_user_details: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          email: string
          created_at: string
        }[]
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_security_insights: {
        Args: { p_start_date?: string; p_end_date?: string }
        Returns: {
          day: string
          event_type: string
          severity: string
          event_count: number
          unique_users: number
          unique_ips: number
        }[]
      }
      get_user_uuid_by_email: {
        Args: { user_email: string }
        Returns: string
      }
      has_role: {
        Args: { _user_id: string; _role: string }
        Returns: boolean
      }
      initialize_first_admin: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      insert_sample_security_events: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      insert_transaction: {
        Args:
          | { p_amount: number; p_description: string }
          | {
              p_user_id: string
              p_transaction_type: string
              p_amount: number
              p_currency: string
              p_status?: string
              p_external_reference?: string
              p_metadata?: Json
            }
        Returns: number
      }
      is_admin: {
        Args: { check_user_uuid?: string }
        Returns: boolean
      }
      list_active_admins: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          email: string
          created_at: string
        }[]
      }
      list_admin_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_uuid: string
          user_email: string
          user_name: string
          admin_created_at: string
        }[]
      }
      log_comprehensive_security_event: {
        Args:
          | {
              p_event_category: string
              p_event_type: string
              p_user_id?: string
              p_ip_address?: unknown
              p_severity_level?: number
              p_event_details?: Json
            }
          | {
              p_event_type: string
              p_severity?: string
              p_user_id?: string
              p_ip_address?: unknown
              p_request_path?: string
              p_http_method?: string
              p_response_status?: number
              p_event_details?: Json
              p_error_message?: string
              p_source?: string
              p_additional_context?: Json
            }
        Returns: number
      }
      log_error: {
        Args:
          | { p_error_message: string; p_context?: string }
          | {
              p_error_type: string
              p_error_message: string
              p_context?: Json
              p_is_critical?: boolean
            }
        Returns: undefined
      }
      log_security_event: {
        Args:
          | { event_type: string; description: string }
          | {
              event_type: string
              event_category?: string
              user_id?: string
              ip_address?: unknown
              severity?: number
              event_details?: Json
            }
          | {
              p_category: string
              p_type: string
              p_details: Json
              p_risk_score?: number
            }
          | {
              p_category: string
              p_type: string
              p_details?: Json
              p_risk_score?: number
              p_user_id?: string
              p_ip_address?: unknown
              p_user_agent?: string
            }
          | {
              p_event_type: string
              p_severity?: string
              p_user_id?: string
              p_ip_address?: unknown
              p_event_details?: Json
              p_source?: string
              p_additional_context?: Json
            }
          | {
              p_log_level: string
              p_error_code: string
              p_error_message: string
            }
          | {
              p_log_level: string
              p_error_code: string
              p_error_message: string
              p_error_context?: Json
              p_severity_score?: number
            }
          | {
              p_log_level: string
              p_error_code: string
              p_error_message: string
              p_error_context?: string
              p_severity_score?: number
            }
          | {
              p_log_level: string
              p_error_code?: string
              p_error_message?: string
              p_error_context?: Json
              p_user_id?: string
              p_ip_address?: unknown
            }
        Returns: number
      }
      log_security_event_named: {
        Args: {
          category: string
          type: string
          details?: Json
          risk_score?: number
          user_id?: string
          ip_address?: unknown
          user_agent?: string
        }
        Returns: string
      }
      manage_admin_user: {
        Args: { p_user_id: string; p_action?: string }
        Returns: boolean
      }
      manage_role_permissions: {
        Args:
          | {
              p_role: Database["public"]["Enums"]["admin_role_type"]
              p_permissions: Database["public"]["Enums"]["admin_permission"][]
              p_action?: string
            }
          | { p_role: string; p_permissions: string[]; p_action?: string }
        Returns: {
          status: boolean
          message: string
        }[]
      }
      remove_admin_role: {
        Args: { p_user_id?: string }
        Returns: boolean
      }
      revoke_admin_role: {
        Args:
          | { target_user_email: string; admin_user_email: string }
          | { target_user_uuid: string; admin_user_uuid: string }
        Returns: boolean
      }
      safe_uuid_convert: {
        Args: { input_string: string }
        Returns: string
      }
      secure_function_search_paths: {
        Args: Record<PropertyKey, never>
        Returns: {
          function_schema: string
          function_name_result: string
          search_path_status: string
        }[]
      }
      secure_login: {
        Args: {
          p_email: string
          p_password: string
          p_ip_address?: unknown
          p_user_agent?: string
        }
        Returns: {
          login_successful: boolean
          user_id: string
          error_message: string
        }[]
      }
      set_secure_search_paths: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          function_name: string
          status: string
        }[]
      }
      setup_first_admin: {
        Args: { first_admin_email: string }
        Returns: boolean
      }
      unlock_account: {
        Args: { p_email: string; p_admin_user_id: string }
        Returns: boolean
      }
      update_admin_metric: {
        Args:
          | Record<PropertyKey, never>
          | {
              p_metric_name: string
              p_new_value: number
              p_increment?: boolean
            }
        Returns: undefined
      }
      update_function_search_paths: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          function_name: string
          update_status: string
        }[]
      }
      validate_admin_access: {
        Args: { client_ip: unknown }
        Returns: boolean
      }
      validate_admin_session: {
        Args: { token: string; client_ip: unknown }
        Returns: boolean
      }
      validate_json_input: {
        Args: { p_input: unknown }
        Returns: Json
      }
    }
    Enums: {
      admin_permission:
        | "users_read"
        | "users_write"
        | "role_management"
        | "role_permission_management"
        | "content_management"
        | "billing_view"
        | "billing_edit"
        | "system_config"
      admin_role_type:
        | "super_admin"
        | "readonly_admin"
        | "content_admin"
        | "user_management_admin"
        | "billing_admin"
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
      user_role: "user" | "trader" | "admin" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_permission: [
        "users_read",
        "users_write",
        "role_management",
        "role_permission_management",
        "content_management",
        "billing_view",
        "billing_edit",
        "system_config",
      ],
      admin_role_type: [
        "super_admin",
        "readonly_admin",
        "content_admin",
        "user_management_admin",
        "billing_admin",
      ],
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
      user_role: ["user", "trader", "admin", "moderator"],
    },
  },
} as const
