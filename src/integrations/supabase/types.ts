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
      admin_activity_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: number
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: never
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: never
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
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
        Relationships: [
          {
            foreignKeyName: "admin_audit_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "admin_media_library_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
      admin_profiles: {
        Row: {
          created_at: string | null
          id: string
          permissions: string[] | null
          role: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          permissions?: string[] | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          permissions?: string[] | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "admin_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "admin_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "admin_vault_access_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ai_generated_images: {
        Row: {
          created_at: string
          enhanced_prompt: string
          generation_time: number
          id: string
          image_data: string
          metadata: Json | null
          model: string
          prompt: string
          quality: string
          size: string
          style: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          enhanced_prompt: string
          generation_time: number
          id?: string
          image_data: string
          metadata?: Json | null
          model?: string
          prompt: string
          quality?: string
          size?: string
          style: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          enhanced_prompt?: string
          generation_time?: number
          id?: string
          image_data?: string
          metadata?: Json | null
          model?: string
          prompt?: string
          quality?: string
          size?: string
          style?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_learning_database: {
        Row: {
          category: string
          confidence_score: number | null
          created_at: string
          data_source: string
          effectiveness_score: number | null
          id: string
          knowledge_type: string
          last_accessed: string | null
          learning_content: Json
          updated_at: string
          usage_count: number | null
          validation_status: string | null
        }
        Insert: {
          category: string
          confidence_score?: number | null
          created_at?: string
          data_source: string
          effectiveness_score?: number | null
          id?: string
          knowledge_type: string
          last_accessed?: string | null
          learning_content: Json
          updated_at?: string
          usage_count?: number | null
          validation_status?: string | null
        }
        Update: {
          category?: string
          confidence_score?: number | null
          created_at?: string
          data_source?: string
          effectiveness_score?: number | null
          id?: string
          knowledge_type?: string
          last_accessed?: string | null
          learning_content?: Json
          updated_at?: string
          usage_count?: number | null
          validation_status?: string | null
        }
        Relationships: []
      }
      ai_neural_interactions: {
        Row: {
          context: string | null
          created_at: string
          id: string
          metadata: Json | null
          mode: string
          model: string
          processing_time: number
          prompt: string
          response: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          mode: string
          model?: string
          processing_time: number
          prompt: string
          response: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          mode?: string
          model?: string
          processing_time?: number
          prompt?: string
          response?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_system_performance: {
        Row: {
          baseline_value: number | null
          id: string
          improvement_percentage: number | null
          measurement_time: string
          metadata: Json | null
          metric_value: number
          performance_metric: string
          status: string | null
          system_component: string
        }
        Insert: {
          baseline_value?: number | null
          id?: string
          improvement_percentage?: number | null
          measurement_time?: string
          metadata?: Json | null
          metric_value: number
          performance_metric: string
          status?: string | null
          system_component: string
        }
        Update: {
          baseline_value?: number | null
          id?: string
          improvement_percentage?: number | null
          measurement_time?: string
          metadata?: Json | null
          metric_value?: number
          performance_metric?: string
          status?: string | null
          system_component?: string
        }
        Relationships: []
      }
      ai_voice_interactions: {
        Row: {
          audio_duration: number | null
          created_at: string
          id: string
          mode: string
          model_id: string
          text: string
          user_id: string | null
          voice_id: string
          voice_type: string
        }
        Insert: {
          audio_duration?: number | null
          created_at?: string
          id?: string
          mode: string
          model_id: string
          text: string
          user_id?: string | null
          voice_id: string
          voice_type: string
        }
        Update: {
          audio_duration?: number | null
          created_at?: string
          id?: string
          mode?: string
          model_id?: string
          text?: string
          user_id?: string | null
          voice_id?: string
          voice_type?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action_type: string
          changed_fields: string[] | null
          client_ip: unknown | null
          created_at: string | null
          id: number
          new_values: Json | null
          old_values: Json | null
          record_id: number | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          changed_fields?: string[] | null
          client_ip?: unknown | null
          created_at?: string | null
          id?: never
          new_values?: Json | null
          old_values?: Json | null
          record_id?: number | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          changed_fields?: string[] | null
          client_ip?: unknown | null
          created_at?: string | null
          id?: never
          new_values?: Json | null
          old_values?: Json | null
          record_id?: number | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      bad_example: {
        Row: {
          id: number
          logged_at: string | null
        }
        Insert: {
          id?: never
          logged_at?: string | null
        }
        Update: {
          id?: never
          logged_at?: string | null
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
        Relationships: [
          {
            foreignKeyName: "bike_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
      eco_missions: {
        Row: {
          carbon_impact: number | null
          completed_at: string | null
          completion_data: Json | null
          created_at: string | null
          description: string
          difficulty_level: number | null
          id: string
          mission_type: string
          status: string | null
          title: string
          tokens_reward: number | null
          user_id: string | null
        }
        Insert: {
          carbon_impact?: number | null
          completed_at?: string | null
          completion_data?: Json | null
          created_at?: string | null
          description: string
          difficulty_level?: number | null
          id?: string
          mission_type: string
          status?: string | null
          title: string
          tokens_reward?: number | null
          user_id?: string | null
        }
        Update: {
          carbon_impact?: number | null
          completed_at?: string | null
          completion_data?: Json | null
          created_at?: string | null
          description?: string
          difficulty_level?: number | null
          id?: string
          mission_type?: string
          status?: string | null
          title?: string
          tokens_reward?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eco_missions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
            foreignKeyName: "environmental_impact_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      error_log: {
        Row: {
          error_context: string | null
          error_message: string | null
          error_type: string | null
          id: number
          occurred_at: string | null
          resolved: boolean | null
        }
        Insert: {
          error_context?: string | null
          error_message?: string | null
          error_type?: string | null
          id?: never
          occurred_at?: string | null
          resolved?: boolean | null
        }
        Update: {
          error_context?: string | null
          error_message?: string | null
          error_type?: string | null
          id?: never
          occurred_at?: string | null
          resolved?: boolean | null
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
        Relationships: [
          {
            foreignKeyName: "error_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      error_notification_secrets: {
        Row: {
          created_at: string | null
          service_name: string
          updated_at: string | null
          user_id: string | null
          webhook_url: string
        }
        Insert: {
          created_at?: string | null
          service_name: string
          updated_at?: string | null
          user_id?: string | null
          webhook_url: string
        }
        Update: {
          created_at?: string | null
          service_name?: string
          updated_at?: string | null
          user_id?: string | null
          webhook_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "error_notification_secrets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      error_tracking: {
        Row: {
          error_context: Json | null
          error_message: string
          error_type: string
          id: string
          occurred_at: string | null
          resolved: boolean | null
          severity_level: string | null
          stack_trace: string | null
        }
        Insert: {
          error_context?: Json | null
          error_message: string
          error_type: string
          id?: string
          occurred_at?: string | null
          resolved?: boolean | null
          severity_level?: string | null
          stack_trace?: string | null
        }
        Update: {
          error_context?: Json | null
          error_message?: string
          error_type?: string
          id?: string
          occurred_at?: string | null
          resolved?: boolean | null
          severity_level?: string | null
          stack_trace?: string | null
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
        Relationships: [
          {
            foreignKeyName: "feature_toggles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
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
            foreignKeyName: "fee_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
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
        Relationships: [
          {
            foreignKeyName: "food_places_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      function_search_path_audit: {
        Row: {
          error_details: string | null
          function_name: string
          id: number
          modification_status: string | null
          modified_at: string | null
          original_definition: string | null
          remediation_sql: string | null
          risk_level: number | null
          schema_name: string
        }
        Insert: {
          error_details?: string | null
          function_name: string
          id?: never
          modification_status?: string | null
          modified_at?: string | null
          original_definition?: string | null
          remediation_sql?: string | null
          risk_level?: number | null
          schema_name: string
        }
        Update: {
          error_details?: string | null
          function_name?: string
          id?: never
          modification_status?: string | null
          modified_at?: string | null
          original_definition?: string | null
          remediation_sql?: string | null
          risk_level?: number | null
          schema_name?: string
        }
        Relationships: []
      }
      function_search_path_fixes: {
        Row: {
          fixed_at: string | null
          function_name: string | null
          id: number
          schema_name: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          fixed_at?: string | null
          function_name?: string | null
          id?: never
          schema_name?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          fixed_at?: string | null
          function_name?: string | null
          id?: never
          schema_name?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "function_search_path_fixes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "gaia_earning_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
      green_projects: {
        Row: {
          biodiversity_score: number | null
          carbon_impact_target: number | null
          category: string
          created_at: string | null
          created_by: string | null
          description: string
          funding_goal: number
          funding_raised: number
          id: string
          project_data: Json | null
          title: string
          updated_at: string | null
          verification_status: string | null
        }
        Insert: {
          biodiversity_score?: number | null
          carbon_impact_target?: number | null
          category: string
          created_at?: string | null
          created_by?: string | null
          description: string
          funding_goal?: number
          funding_raised?: number
          id?: string
          project_data?: Json | null
          title: string
          updated_at?: string | null
          verification_status?: string | null
        }
        Update: {
          biodiversity_score?: number | null
          carbon_impact_target?: number | null
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          funding_goal?: number
          funding_raised?: number
          id?: string
          project_data?: Json | null
          title?: string
          updated_at?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "green_projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
      main_wallet_config: {
        Row: {
          auto_routing_enabled: boolean | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          routing_threshold: number | null
          updated_at: string | null
          wallet_address: string
          wallet_name: string
          wallet_type: string
        }
        Insert: {
          auto_routing_enabled?: boolean | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          routing_threshold?: number | null
          updated_at?: string | null
          wallet_address: string
          wallet_name: string
          wallet_type?: string
        }
        Update: {
          auto_routing_enabled?: boolean | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          routing_threshold?: number | null
          updated_at?: string | null
          wallet_address?: string
          wallet_name?: string
          wallet_type?: string
        }
        Relationships: []
      }
      monitoring_events: {
        Row: {
          created_at: string
          details: Json | null
          id: number
          message: string
          status: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          id?: never
          message: string
          status: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          id?: never
          message?: string
          status?: string
        }
        Relationships: []
      }
      nft_card_collection: {
        Row: {
          biodiversity_category: string | null
          card_metadata: Json | null
          card_name: string
          card_type: string
          id: string
          is_tradeable: boolean | null
          minted_at: string | null
          power_level: number | null
          rarity: string
          user_id: string | null
        }
        Insert: {
          biodiversity_category?: string | null
          card_metadata?: Json | null
          card_name: string
          card_type: string
          id?: string
          is_tradeable?: boolean | null
          minted_at?: string | null
          power_level?: number | null
          rarity: string
          user_id?: string | null
        }
        Update: {
          biodiversity_category?: string | null
          card_metadata?: Json | null
          card_name?: string
          card_type?: string
          id?: string
          is_tradeable?: boolean | null
          minted_at?: string | null
          power_level?: number | null
          rarity?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nft_card_collection_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      order: {
        Row: {
          id: number
          status: string | null
          timestamp: string | null
          user: string | null
        }
        Insert: {
          id?: never
          status?: string | null
          timestamp?: string | null
          user?: string | null
        }
        Update: {
          id?: never
          status?: string | null
          timestamp?: string | null
          user?: string | null
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
          {
            foreignKeyName: "orders_trading_pair_id_fkey"
            columns: ["trading_pair_id"]
            isOneToOne: false
            referencedRelation: "v_active_trading_pairs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_trading_pair_id_fkey"
            columns: ["trading_pair_id"]
            isOneToOne: false
            referencedRelation: "v_trading_pairs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      planet_cleaning_rewards: {
        Row: {
          activity_type: string
          created_at: string | null
          environmental_impact: Json | null
          id: string
          location_data: Json | null
          tokens_earned: number | null
          user_id: string | null
          verification_method: string
          verified_at: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          environmental_impact?: Json | null
          id?: string
          location_data?: Json | null
          tokens_earned?: number | null
          user_id?: string | null
          verification_method: string
          verified_at?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          environmental_impact?: Json | null
          id?: string
          location_data?: Json | null
          tokens_earned?: number | null
          user_id?: string | null
          verification_method?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "planet_cleaning_rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      project_investment_summaries: {
        Row: {
          average_investment: number | null
          carbon_credits_generated: number | null
          id: string
          investment_goal_percentage: number | null
          last_investment_date: string | null
          project_id: string
          roi_percentage: number | null
          total_invested: number | null
          total_investors: number | null
          updated_at: string | null
        }
        Insert: {
          average_investment?: number | null
          carbon_credits_generated?: number | null
          id?: string
          investment_goal_percentage?: number | null
          last_investment_date?: string | null
          project_id: string
          roi_percentage?: number | null
          total_invested?: number | null
          total_investors?: number | null
          updated_at?: string | null
        }
        Update: {
          average_investment?: number | null
          carbon_credits_generated?: number | null
          id?: string
          investment_goal_percentage?: number | null
          last_investment_date?: string | null
          project_id?: string
          roi_percentage?: number | null
          total_invested?: number | null
          total_investors?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_investment_summaries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "green_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_investment_wallets: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          private_key_encrypted: string | null
          project_id: string
          total_received: number | null
          total_routed: number | null
          updated_at: string | null
          wallet_address: string
          wallet_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          private_key_encrypted?: string | null
          project_id: string
          total_received?: number | null
          total_routed?: number | null
          updated_at?: string | null
          wallet_address: string
          wallet_type?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          private_key_encrypted?: string | null
          project_id?: string
          total_received?: number | null
          total_routed?: number | null
          updated_at?: string | null
          wallet_address?: string
          wallet_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_investment_wallets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "green_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_transactions: {
        Row: {
          amount: number
          block_number: number | null
          confirmed_at: string | null
          created_at: string | null
          currency: string
          from_address: string
          gas_fee: number | null
          id: string
          metadata: Json | null
          project_id: string
          project_wallet_id: string
          routed_at: string | null
          routed_to_main_wallet: boolean | null
          routing_transaction_hash: string | null
          status: string
          to_address: string
          transaction_hash: string
          transaction_type: string
        }
        Insert: {
          amount: number
          block_number?: number | null
          confirmed_at?: string | null
          created_at?: string | null
          currency?: string
          from_address: string
          gas_fee?: number | null
          id?: string
          metadata?: Json | null
          project_id: string
          project_wallet_id: string
          routed_at?: string | null
          routed_to_main_wallet?: boolean | null
          routing_transaction_hash?: string | null
          status?: string
          to_address: string
          transaction_hash: string
          transaction_type?: string
        }
        Update: {
          amount?: number
          block_number?: number | null
          confirmed_at?: string | null
          created_at?: string | null
          currency?: string
          from_address?: string
          gas_fee?: number | null
          id?: string
          metadata?: Json | null
          project_id?: string
          project_wallet_id?: string
          routed_at?: string | null
          routed_to_main_wallet?: boolean | null
          routing_transaction_hash?: string | null
          status?: string
          to_address?: string
          transaction_hash?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "green_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_project_wallet_id_fkey"
            columns: ["project_wallet_id"]
            isOneToOne: false
            referencedRelation: "project_investment_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      quantum_conversation_participants: {
        Row: {
          can_invite: boolean | null
          can_moderate: boolean | null
          conversation_id: string | null
          id: string
          is_active: boolean | null
          joined_at: string | null
          last_read_at: string | null
          participation_score: number | null
          role: string | null
          sustainability_points: number | null
          user_id: string | null
        }
        Insert: {
          can_invite?: boolean | null
          can_moderate?: boolean | null
          conversation_id?: string | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          last_read_at?: string | null
          participation_score?: number | null
          role?: string | null
          sustainability_points?: number | null
          user_id?: string | null
        }
        Update: {
          can_invite?: boolean | null
          can_moderate?: boolean | null
          conversation_id?: string | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          last_read_at?: string | null
          participation_score?: number | null
          role?: string | null
          sustainability_points?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quantum_conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "quantum_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quantum_conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      quantum_conversations: {
        Row: {
          blockchain_verified: boolean | null
          carbon_offset_score: number | null
          created_at: string | null
          created_by: string | null
          id: string
          is_archived: boolean | null
          is_muted: boolean | null
          last_message_at: string | null
          metadata: Json | null
          privacy_rating: number | null
          renewable_energy_contribution: number | null
          title: string | null
          tree_credits: number | null
          type: string
        }
        Insert: {
          blockchain_verified?: boolean | null
          carbon_offset_score?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_archived?: boolean | null
          is_muted?: boolean | null
          last_message_at?: string | null
          metadata?: Json | null
          privacy_rating?: number | null
          renewable_energy_contribution?: number | null
          title?: string | null
          tree_credits?: number | null
          type?: string
        }
        Update: {
          blockchain_verified?: boolean | null
          carbon_offset_score?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_archived?: boolean | null
          is_muted?: boolean | null
          last_message_at?: string | null
          metadata?: Json | null
          privacy_rating?: number | null
          renewable_energy_contribution?: number | null
          title?: string | null
          tree_credits?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "quantum_conversations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      quantum_messages: {
        Row: {
          ai_sentiment_score: number | null
          ai_toxicity_score: number | null
          ai_translation_available: boolean | null
          blockchain_hash: string | null
          carbon_footprint: number | null
          content: string
          content_type: string | null
          conversation_id: string | null
          created_at: string | null
          id: string
          impact_score: number | null
          is_blockchain_verified: boolean | null
          is_deleted: boolean | null
          is_edited: boolean | null
          likes_count: number | null
          metadata: Json | null
          renewable_energy_used: number | null
          reply_to_message_id: string | null
          sender_id: string | null
          updated_at: string | null
        }
        Insert: {
          ai_sentiment_score?: number | null
          ai_toxicity_score?: number | null
          ai_translation_available?: boolean | null
          blockchain_hash?: string | null
          carbon_footprint?: number | null
          content: string
          content_type?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          impact_score?: number | null
          is_blockchain_verified?: boolean | null
          is_deleted?: boolean | null
          is_edited?: boolean | null
          likes_count?: number | null
          metadata?: Json | null
          renewable_energy_used?: number | null
          reply_to_message_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_sentiment_score?: number | null
          ai_toxicity_score?: number | null
          ai_translation_available?: boolean | null
          blockchain_hash?: string | null
          carbon_footprint?: number | null
          content?: string
          content_type?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          impact_score?: number | null
          is_blockchain_verified?: boolean | null
          is_deleted?: boolean | null
          is_edited?: boolean | null
          likes_count?: number | null
          metadata?: Json | null
          renewable_energy_used?: number | null
          reply_to_message_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quantum_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "quantum_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quantum_messages_reply_to_message_id_fkey"
            columns: ["reply_to_message_id"]
            isOneToOne: false
            referencedRelation: "quantum_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quantum_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      robust_data: {
        Row: {
          access_level: number | null
          created_at: string | null
          data: Json
          id: number
          is_active: boolean | null
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          access_level?: number | null
          created_at?: string | null
          data: Json
          id?: never
          is_active?: boolean | null
          owner_id: string
          updated_at?: string | null
        }
        Update: {
          access_level?: number | null
          created_at?: string | null
          data?: Json
          id?: never
          is_active?: boolean | null
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "robust_data_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      search_path_security_log: {
        Row: {
          check_timestamp: string | null
          id: number
          log_error_details: Json | null
          log_function_name: string
          log_language: string
          log_original_definition: string
          log_remediation_action: string | null
          log_remediation_status: string | null
          log_schema_name: string
          log_security_type: string
          log_warning_level: string
        }
        Insert: {
          check_timestamp?: string | null
          id?: never
          log_error_details?: Json | null
          log_function_name: string
          log_language: string
          log_original_definition: string
          log_remediation_action?: string | null
          log_remediation_status?: string | null
          log_schema_name: string
          log_security_type: string
          log_warning_level: string
        }
        Update: {
          check_timestamp?: string | null
          id?: never
          log_error_details?: Json | null
          log_function_name?: string
          log_language?: string
          log_original_definition?: string
          log_remediation_action?: string | null
          log_remediation_status?: string | null
          log_schema_name?: string
          log_security_type?: string
          log_warning_level?: string
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
      security_event_log: {
        Row: {
          created_at: string | null
          error_context: string | null
          event_details: Json | null
          event_type: string
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_context?: string | null
          event_details?: Json | null
          event_type: string
          id?: never
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_context?: string | null
          event_details?: Json | null
          event_type?: string
          id?: never
          user_id?: string | null
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
      security_function_audit: {
        Row: {
          audit_timestamp: string | null
          details: Json | null
          function_name: string
          id: number
          risk_level: string | null
          schema_name: string
        }
        Insert: {
          audit_timestamp?: string | null
          details?: Json | null
          function_name: string
          id?: never
          risk_level?: string | null
          schema_name: string
        }
        Update: {
          audit_timestamp?: string | null
          details?: Json | null
          function_name?: string
          id?: never
          risk_level?: string | null
          schema_name?: string
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
        Relationships: [
          {
            foreignKeyName: "security_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
      security_remediation_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          issue_type: string
          remediation_action: string
          scan_id: string | null
          success: boolean | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          issue_type: string
          remediation_action: string
          scan_id?: string | null
          success?: boolean | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          issue_type?: string
          remediation_action?: string
          scan_id?: string | null
          success?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "security_remediation_logs_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "security_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      security_risk_assessments: {
        Row: {
          anomalies: string[] | null
          assessment_details: Json | null
          created_at: string | null
          id: number
          risk_score: number
          user_id: string | null
        }
        Insert: {
          anomalies?: string[] | null
          assessment_details?: Json | null
          created_at?: string | null
          id?: never
          risk_score: number
          user_id?: string | null
        }
        Update: {
          anomalies?: string[] | null
          assessment_details?: Json | null
          created_at?: string | null
          id?: never
          risk_score?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_risk_assessments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      security_scans: {
        Row: {
          compliance_score: number | null
          created_at: string | null
          created_by: string | null
          critical_issues: number | null
          high_issues: number | null
          id: string
          issues_found: number | null
          low_issues: number | null
          medium_issues: number | null
          scan_duration_ms: number | null
          scan_results: Json
          scan_type: string
        }
        Insert: {
          compliance_score?: number | null
          created_at?: string | null
          created_by?: string | null
          critical_issues?: number | null
          high_issues?: number | null
          id?: string
          issues_found?: number | null
          low_issues?: number | null
          medium_issues?: number | null
          scan_duration_ms?: number | null
          scan_results?: Json
          scan_type: string
        }
        Update: {
          compliance_score?: number | null
          created_at?: string | null
          created_by?: string | null
          critical_issues?: number | null
          high_issues?: number | null
          id?: string
          issues_found?: number | null
          low_issues?: number | null
          medium_issues?: number | null
          scan_duration_ms?: number | null
          scan_results?: Json
          scan_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "security_scans_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "swap_configurations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      system_health_log: {
        Row: {
          detected_at: string | null
          id: number
          issue_description: string | null
          issue_type: string
          resolved: boolean | null
          severity: number
        }
        Insert: {
          detected_at?: string | null
          id?: never
          issue_description?: string | null
          issue_type: string
          resolved?: boolean | null
          severity: number
        }
        Update: {
          detected_at?: string | null
          id?: never
          issue_description?: string | null
          issue_type?: string
          resolved?: boolean | null
          severity?: number
        }
        Relationships: []
      }
      system_health_logs: {
        Row: {
          blocked_queries: number | null
          checked_at: string | null
          detected_at: string
          id: number
          issue_description: string
          issue_type: string
          long_queries: number | null
          resolved: boolean
          severity: number
          tables_without_pk: number | null
          total_connections: number | null
        }
        Insert: {
          blocked_queries?: number | null
          checked_at?: string | null
          detected_at?: string
          id?: number
          issue_description: string
          issue_type: string
          long_queries?: number | null
          resolved?: boolean
          severity?: number
          tables_without_pk?: number | null
          total_connections?: number | null
        }
        Update: {
          blocked_queries?: number | null
          checked_at?: string | null
          detected_at?: string
          id?: number
          issue_description?: string
          issue_type?: string
          long_queries?: number | null
          resolved?: boolean
          severity?: number
          tables_without_pk?: number | null
          total_connections?: number | null
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
      threat_intelligence: {
        Row: {
          detected_at: string | null
          geolocation: Json | null
          id: string
          ip_address: unknown | null
          resolved_at: string | null
          severity_level: string
          status: string | null
          threat_data: Json
          threat_type: string
          user_agent: string | null
        }
        Insert: {
          detected_at?: string | null
          geolocation?: Json | null
          id?: string
          ip_address?: unknown | null
          resolved_at?: string | null
          severity_level?: string
          status?: string | null
          threat_data?: Json
          threat_type: string
          user_agent?: string | null
        }
        Update: {
          detected_at?: string | null
          geolocation?: Json | null
          id?: string
          ip_address?: unknown | null
          resolved_at?: string | null
          severity_level?: string
          status?: string | null
          threat_data?: Json
          threat_type?: string
          user_agent?: string | null
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
      transaction_routing_logs: {
        Row: {
          amount_routed: number
          confirmed_at: string | null
          from_wallet: string
          id: string
          metadata: Json | null
          project_id: string
          routed_at: string | null
          routing_fee: number | null
          routing_status: string
          routing_transaction_hash: string | null
          to_wallet: string
        }
        Insert: {
          amount_routed: number
          confirmed_at?: string | null
          from_wallet: string
          id?: string
          metadata?: Json | null
          project_id: string
          routed_at?: string | null
          routing_fee?: number | null
          routing_status?: string
          routing_transaction_hash?: string | null
          to_wallet: string
        }
        Update: {
          amount_routed?: number
          confirmed_at?: string | null
          from_wallet?: string
          id?: string
          metadata?: Json | null
          project_id?: string
          routed_at?: string | null
          routing_fee?: number | null
          routing_status?: string
          routing_transaction_hash?: string | null
          to_wallet?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_routing_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "green_projects"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_logs: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          updated_at?: string | null
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "user_roles_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
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
          {
            foreignKeyName: "user_stakes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login: string | null
          role: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
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
            foreignKeyName: "video_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
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
        Relationships: [
          {
            foreignKeyName: "video_submissions_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "video_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
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
            foreignKeyName: "video_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
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
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      auth_comprehensive_debug_view: {
        Row: {
          created_at: string | null
          email: string | null
          last_sign_in_at: string | null
          role: string | null
          user_id: string | null
        }
        Relationships: []
      }
      function_security_audit: {
        Row: {
          argument_data_types: string | null
          function_name: string | null
          has_search_path: boolean | null
          recommendation: string | null
          result_data_type: string | null
          schema_name: string | null
          search_path_value: string | null
          security_definer: boolean | null
        }
        Relationships: []
      }
      order_items_view: {
        Row: {
          created_at: string | null
          id: string | null
          order_id: string | null
          product_id: string | null
          quantity: number | null
          total_price: number | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
          total_price?: number | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
          total_price?: number | null
          unit_price?: number | null
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
      performance_status: {
        Row: {
          column_name: unknown | null
          issue_type: string | null
          table_name: string | null
        }
        Relationships: []
      }
      robust_data_view: {
        Row: {
          access_level: number | null
          created_at: string | null
          data: Json | null
          id: number | null
          updated_at: string | null
        }
        Insert: {
          access_level?: number | null
          created_at?: string | null
          data?: Json | null
          id?: number | null
          updated_at?: string | null
        }
        Update: {
          access_level?: number | null
          created_at?: string | null
          data?: Json | null
          id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      security_log_summary: {
        Row: {
          event_count: number | null
          event_type: string | null
          latest_event: string | null
        }
        Relationships: []
      }
      unresolved_errors: {
        Row: {
          context: Json | null
          created_at: string | null
          error_message: string | null
          error_type: string | null
          id: number | null
          is_critical: boolean | null
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          error_message?: string | null
          error_type?: string | null
          id?: number | null
          is_critical?: boolean | null
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          error_message?: string | null
          error_type?: string | null
          id?: number | null
          is_critical?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "error_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_comprehensive_debug_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_uuid_diagnostics: {
        Row: {
          email: string | null
          full_name: string | null
          user_id: string | null
        }
        Relationships: []
      }
      v_active_trading_pairs: {
        Row: {
          base_currency: string | null
          current_price: number | null
          id: string | null
          quote_currency: string | null
          symbol: string | null
        }
        Insert: {
          base_currency?: string | null
          current_price?: number | null
          id?: string | null
          quote_currency?: string | null
          symbol?: string | null
        }
        Update: {
          base_currency?: string | null
          current_price?: number | null
          id?: string | null
          quote_currency?: string | null
          symbol?: string | null
        }
        Relationships: []
      }
      v_function_security_issues: {
        Row: {
          created_at: string | null
          error_type: string | null
          id: number | null
        }
        Insert: {
          created_at?: string | null
          error_type?: string | null
          id?: number | null
        }
        Update: {
          created_at?: string | null
          error_type?: string | null
          id?: number | null
        }
        Relationships: []
      }
      v_trading_pairs: {
        Row: {
          base_currency: string | null
          created_at: string | null
          current_price: number | null
          id: string | null
          market_cap: number | null
          max_trade_amount: number | null
          min_trade_amount: number | null
          price_change_24h: number | null
          quote_currency: string | null
          status: Database["public"]["Enums"]["trading_pair_status"] | null
          symbol: string | null
          trading_fee_percentage: number | null
          updated_at: string | null
          volume_24h: number | null
        }
        Insert: {
          base_currency?: string | null
          created_at?: string | null
          current_price?: number | null
          id?: string | null
          market_cap?: number | null
          max_trade_amount?: number | null
          min_trade_amount?: number | null
          price_change_24h?: number | null
          quote_currency?: string | null
          status?: Database["public"]["Enums"]["trading_pair_status"] | null
          symbol?: string | null
          trading_fee_percentage?: number | null
          updated_at?: string | null
          volume_24h?: number | null
        }
        Update: {
          base_currency?: string | null
          created_at?: string | null
          current_price?: number | null
          id?: string | null
          market_cap?: number | null
          max_trade_amount?: number | null
          min_trade_amount?: number | null
          price_change_24h?: number | null
          quote_currency?: string | null
          status?: Database["public"]["Enums"]["trading_pair_status"] | null
          symbol?: string | null
          trading_fee_percentage?: number | null
          updated_at?: string | null
          volume_24h?: number | null
        }
        Relationships: []
      }
      v_unsafe_functions: {
        Row: {
          routine_name: unknown | null
          routine_schema: unknown | null
          routine_type: string | null
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
        Args:
          | { p_user_id: string }
          | { p_user_id: string; p_role: string }
          | { user_email: string; user_role?: string }
        Returns: string
      }
      add_missing_fk_indexes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      add_missing_indexes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      add_missing_primary_keys: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      admin_insert_robust_data: {
        Args:
          | { p_data: Json; p_owner_id: string; p_access_level?: number }
          | { p_data: Json; p_owner_id: string; p_access_level?: number }
        Returns: number
      }
      advanced_error_handler: {
        Args: {
          p_error_type: string
          p_error_message: string
          p_severity_level?: string
          p_error_context?: Json
          p_notify?: boolean
        }
        Returns: string
      }
      aggregate_errors: {
        Args: { p_time_window?: unknown; p_severity_threshold?: string }
        Returns: {
          error_type: string
          total_count: number
          first_occurrence: string
          last_occurrence: string
          severity_levels: string[]
        }[]
      }
      analyze_dependencies: {
        Args: { target_table: unknown }
        Returns: Record<string, unknown>[]
      }
      analyze_error_trends: {
        Args: { p_days?: number }
        Returns: {
          error_trend: Json
        }[]
      }
      analyze_function_search_paths: {
        Args: { max_risk_level?: number; dry_run?: boolean }
        Returns: {
          schema_name: string
          function_name: string
          remediation_status: string
          error_message: string
          function_risk_level: number
          remediation_sql: string
        }[]
      }
      analyze_function_security: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_high_issues: number
          total_medium_issues: number
          total_issues: number
        }[]
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
      analyze_unused_indexes: {
        Args: { min_size_mb?: number }
        Returns: {
          schema_name: string
          table_name: string
          index_name: string
          index_size_mb: number
          table_size_mb: number
          index_scans: number
          is_primary: boolean
          is_unique: boolean
          is_constraint: boolean
          drop_statement: string
        }[]
      }
      assign_admin_role: {
        Args:
          | { target_user_email: string; admin_user_email: string }
          | { target_user_uuid: string; admin_user_uuid: string }
        Returns: boolean
      }
      audit_function_security: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          function_name: string
          argument_data_types: string
          result_data_type: string
          security_definer: boolean
          has_search_path: boolean
          search_path_value: string
          recommendation: string
        }[]
      }
      audit_logs_cleanup: {
        Args: Record<PropertyKey, never> | { retention_days?: number }
        Returns: number
      }
      auto_resolve_errors: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      bulk_search_path_remediation: {
        Args: { max_risk_level?: number; dry_run?: boolean }
        Returns: Record<string, unknown>[]
      }
      check_password_complexity: {
        Args: { password: string }
        Returns: boolean
      }
      cleanup_audit_logs_by_days: {
        Args: { days_to_retain: number }
        Returns: number
      }
      cleanup_audit_logs_v2: {
        Args: {
          retention_days?: number
          batch_size?: number
          max_runtime_seconds?: number
        }
        Returns: number
      }
      cleanup_indexes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_audit_logs: {
        Args: {
          retention_days?: number
          batch_size?: number
          max_runtime_seconds?: number
        }
        Returns: number
      }
      comprehensive_error_test: {
        Args: Record<PropertyKey, never>
        Returns: {
          test_scenario: string
          error_id: string
          status: boolean
        }[]
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
      configure_secure_search_path: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      consolidate_permissive_policies: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      correlate_errors: {
        Args: { p_time_window?: unknown }
        Returns: {
          correlated_errors: Json
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
      create_monitoring_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_security_alert: {
        Args: {
          p_alert_type: string
          p_description: string
          p_severity?: string
        }
        Returns: number
      }
      create_super_admin: {
        Args: { p_email: string; p_password: string; p_full_name?: string }
        Returns: string
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
      database_health_check: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>
      }
      debug_auth_context: {
        Args: Record<PropertyKey, never>
        Returns: {
          current_user_id: string
          current_user_role: string
          current_user_email: string
          current_app_metadata: Json
          current_user_metadata: Json
          is_authenticated: boolean
        }[]
      }
      demonstrate_robust_data_insertion: {
        Args: Record<PropertyKey, never>
        Returns: {
          method: string
          inserted_id: number
        }[]
      }
      demonstrate_robust_insertion_scenarios: {
        Args: Record<PropertyKey, never>
        Returns: {
          scenario: string
          inserted_id: number
          owner_used: string
        }[]
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
      diagnose_table_dependencies: {
        Args:
          | Record<PropertyKey, never>
          | { schema_name: string; table_name: string }
        Returns: {
          dependent_object: string
          object_type: string
          dependency_type: string
        }[]
      }
      diagnose_table_dependencies_fixed: {
        Args: { table_name: string; schema_name?: string }
        Returns: {
          dependent_table: string
          dependent_schema: string
          dependency_type: string
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
      enhanced_error_correlation: {
        Args: { p_time_window?: unknown; p_min_correlation_threshold?: number }
        Returns: {
          primary_error_type: string
          correlated_errors: Json
          correlation_strength: number
        }[]
      }
      example_func: {
        Args: { user_id: number; username: string; is_active: boolean }
        Returns: string
      }
      example_function: {
        Args: Record<PropertyKey, never> | { param1: string; param2: number }
        Returns: number
      }
      example_login_attempt: {
        Args: { p_username: string; p_success: boolean }
        Returns: boolean
      }
      find_unsafe_functions: {
        Args: { p_secure_path?: string }
        Returns: {
          schema_name: string
          function_name: string
          arguments: string
          return_type: string
          language: string
          security_type: string
          function_body: string
        }[]
      }
      fix_all_function_search_paths: {
        Args: Record<PropertyKey, never> | { target_schema?: string }
        Returns: {
          schema_name: string
          function_name: string
          parameter_types: string
          status: string
        }[]
      }
      fix_backslash_syntax_errors: {
        Args: Record<PropertyKey, never>
        Returns: {
          object_type: string
          object_name: string
          error_type: string
          status: string
        }[]
      }
      fix_common_syntax_errors: {
        Args: Record<PropertyKey, never>
        Returns: {
          object_type: string
          object_name: string
          error_type: string
          status: string
        }[]
      }
      fix_foreign_tables_location: {
        Args: Record<PropertyKey, never>
        Returns: {
          original_schema: string
          table_name: string
          status: string
        }[]
      }
      fix_function_search_path: {
        Args: { function_schema: string; function_name: string }
        Returns: string
      }
      fix_function_search_paths: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          function_name: string
          status: string
        }[]
      }
      fix_incorrect_search_paths: {
        Args: Record<PropertyKey, never>
        Returns: {
          function_name: string
          old_search_path: string
          status: string
        }[]
      }
      fix_materialized_views_location: {
        Args: Record<PropertyKey, never>
        Returns: {
          original_schema: string
          view_name: string
          status: string
        }[]
      }
      fix_missing_rls: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          table_name: string
          status: string
        }[]
      }
      fix_one_function_search_path: {
        Args: { schema_name: string; function_name: string }
        Returns: string
      }
      fix_performance_issues: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      fix_rls_policies: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      fix_routine_search_path: {
        Args: { routine_schema: string; routine_name: string }
        Returns: string
      }
      fix_schema_function_search_paths: {
        Args: { p_schema_name: string }
        Returns: {
          function_name: string
          parameter_types: string
          status: string
        }[]
      }
      fix_schema_functions: {
        Args: { target_schema: string }
        Returns: string[]
      }
      fix_security_framework_search_paths: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      fix_security_issues: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      fix_specific_function_search_path: {
        Args: { p_schema_name: string; p_function_name: string }
        Returns: string
      }
      generate_basic_rls_policies: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_schema: string
          table_name: string
          policy_statements: string[]
        }[]
      }
      generate_function_remediation_scripts: {
        Args: Record<PropertyKey, never>
        Returns: {
          script_schema_name: string
          script_function_name: string
          remediation_script: string
        }[]
      }
      generate_project_wallet_address: {
        Args: { p_project_id: string }
        Returns: string
      }
      generate_search_path_fixes: {
        Args: Record<PropertyKey, never>
        Returns: {
          fix_sql: string
        }[]
      }
      generate_secure_function_wrapper: {
        Args: { p_schema: string; p_function_name: string }
        Returns: {
          original_function: string
          secure_wrapper: string
          security_notes: string
        }[]
      }
      generate_security_alert: {
        Args: { p_alert_type: string; p_severity: number; p_details: Json }
        Returns: string
      }
      generate_security_diagnostic_report: {
        Args: Record<PropertyKey, never>
        Returns: {
          diagnostic_category: string
          diagnostic_name: string
          diagnostic_risk_level: string
          diagnostic_details: Json
        }[]
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
      get_admin_financial_overview: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_admin_user_id: {
        Args: { role_or_user_id: string }
        Returns: string
      }
      get_current_auth_context: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          user_role: string
          is_authenticated: boolean
          email: string
        }[]
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
      get_filtered_records: {
        Args: {
          table_name: string
          filter_column: string
          filter_value: string
        }
        Returns: {
          id: number
          record_data: Json
          tags: string[]
        }[]
      }
      get_rls_policies: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          policy_name: string
          cmd: string
          permissive: string
        }[]
      }
      get_sample_user_uuid: {
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
      get_security_remediation_guidance: {
        Args: { p_diagnostic_risk_level?: string }
        Returns: {
          remediation_risk_level: string
          remediation_steps: string[]
        }[]
      }
      get_system_health: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_connections: number
          long_queries: number
          blocked_queries: number
          tables_without_pk: number
        }[]
      }
      get_table_data: {
        Args: { table_name: string }
        Returns: Record<string, unknown>[]
      }
      get_table_dependencies: {
        Args: { target_table: unknown }
        Returns: {
          dependent_schema: string
          dependent_object: string
          dependency_type: string
          object_type: string
        }[]
      }
      get_user_ids: {
        Args: { department_name: string }
        Returns: number[]
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
      insert_robust_data: {
        Args:
          | { p_data: Json; p_access_level?: number; p_owner_id?: string }
          | { p_input: unknown; p_access_level?: number; p_owner_id?: string }
        Returns: number
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
      inspect_function_details: {
        Args: { p_function_name: string }
        Returns: {
          schema_name: string
          function_name: string
          function_signature: string
          function_definition: string
        }[]
      }
      inspect_function_search_paths: {
        Args: Record<PropertyKey, never>
        Returns: {
          function_schema: string
          function_name: string
          current_search_path: string
          function_definition: string
        }[]
      }
      install_extension: {
        Args: { extension_name: string }
        Returns: boolean
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
      list_available_extensions: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      list_robust_data_function_signatures: {
        Args: Record<PropertyKey, never>
        Returns: {
          function_name: string
          argument_types: string
        }[]
      }
      list_vulnerable_schemas: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      log_audit_event: {
        Args: {
          p_admin_id?: string
          p_action?: string
          p_details?: Json
          p_ip_address?: unknown
          p_user_agent?: string
        }
        Returns: undefined
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
          | { message: string }
          | { p_error_message: string; p_context?: string }
          | {
              p_error_type: string
              p_error_message: string
              p_context?: Json
              p_is_critical?: boolean
            }
        Returns: undefined
      }
      log_security_diagnostics: {
        Args: Record<PropertyKey, never>
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
          | { event_type: string; event_details?: Json }
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
      log_unsafe_functions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
      modify_function_parameters: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      monitor_system_health: {
        Args: Record<PropertyKey, never>
        Returns: {
          issue_type: string
          issue_description: string
          severity: number
        }[]
      }
      my_function: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      my_routine: {
        Args: { param1: string; param2: number }
        Returns: undefined
      }
      optimize_database: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      optimize_database_objects: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      optimize_database_performance: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      optimize_rls_policies: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      prepare_error_prediction_dataset: {
        Args: { p_days?: number }
        Returns: {
          error_type: string
          severity_level: string
          error_count: number
          avg_time_between_errors: unknown
          prediction_features: Json
        }[]
      }
      process_data: {
        Args: { table_name: string }
        Returns: undefined
      }
      purge_audit_logs: {
        Args: { retention_days?: number }
        Returns: number
      }
      purge_old_audit_logs: {
        Args: { retention_days?: number }
        Returns: number
      }
      purge_old_audit_records: {
        Args: { days_to_retain?: number }
        Returns: number
      }
      remediate_search_path_vulnerabilities: {
        Args: Record<PropertyKey, never>
        Returns: {
          function_schema: string
          function_name: string
          remediation_status: string
        }[]
      }
      remove_admin_role: {
        Args: { p_user_id?: string }
        Returns: boolean
      }
      report_search_path_issues: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          function_name: string
          function_args: string
          owner: string
        }[]
      }
      resolve_error: {
        Args: { p_error_id: string }
        Returns: boolean
      }
      resolve_timestamp_error: {
        Args: Record<PropertyKey, never>
        Returns: {
          connection_time: string
          ip_address: unknown
          connection_details: string
        }[]
      }
      retry_query: {
        Args: { p_query: string }
        Returns: Json
      }
      revoke_admin_role: {
        Args:
          | { target_user_email: string; admin_user_email: string }
          | { target_user_uuid: string; admin_user_uuid: string }
        Returns: boolean
      }
      risky_database_operation: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      route_project_funds_to_main_wallet: {
        Args: { p_project_id: string }
        Returns: Json
      }
      run_all_security_fixes: {
        Args: Record<PropertyKey, never>
        Returns: {
          fix_type: string
          object_schema: string
          object_name: string
          status: string
        }[]
      }
      safe_execute: {
        Args: { p_function_name: string; p_params?: Json } | { p_query: string }
        Returns: Record<string, unknown>
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
      secure_function_template: {
        Args:
          | { p_input: number }
          | { p_input: string }
          | { p_input: string }
          | { param1: string; param2: number }
        Returns: Json
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
      security_diagnostic_report: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          name: string
          risk_level: string
          details: Json
        }[]
      }
      security_logging_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      security_monitoring_setup: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      security_remediation_guide: {
        Args: { p_risk_level?: string }
        Returns: {
          risk_level: string
          remediation_steps: string[]
        }[]
      }
      security_test_function: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      send_external_error_notification: {
        Args: { p_error_id: string; p_notification_type?: string }
        Returns: boolean
      }
      send_security_alert: {
        Args: { p_message: string; p_severity?: string }
        Returns: undefined
      }
      set_secure_search_path: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
      setup_table_rls: {
        Args: {
          table_name: string
          schema_name?: string
          is_admin_only?: boolean
        }
        Returns: undefined
      }
      simple_table_dependencies: {
        Args: { target_table: unknown }
        Returns: {
          dependency_type: string
          object_schema: string
          object_name: string
          object_type: string
          details: Json
        }[]
      }
      system_error_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      table_dependencies_diagnose: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          table_name: string
          dependent_object: string
          dependent_type: string
        }[]
      }
      table_dependency_analysis: {
        Args: { table_name: string; schema_name?: string }
        Returns: {
          dependent_table: string
          dependent_schema: string
          dependency_type: string
        }[]
      }
      test_error_management: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      test_function: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      test_search_path: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      track_error: {
        Args:
          | { p_error_type: string; p_error_message: string }
          | {
              p_error_type: string
              p_error_message: string
              p_severity_level: string
            }
          | {
              p_error_type: string
              p_error_message: string
              p_severity_level: string
              p_error_context: Json
            }
        Returns: string
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
      update_project_investment_summary: {
        Args: { p_project_id: string }
        Returns: undefined
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
      validate_robust_view_data: {
        Args: {
          p_column1: string
          p_column2: number
          p_nullable_column: string
        }
        Returns: boolean
      }
      validate_type_parameters: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          object_name: string
          issue_type: string
          details: string
        }[]
      }
      your_function_name: {
        Args: { param1: string; param2: number; param3?: string }
        Returns: {
          result_column1: string
          result_column2: number
        }[]
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
      quantum_security_config_type:
        | "authentication"
        | "authorization"
        | "encryption"
        | "network"
        | "compliance"
        | "mobile_integration"
        | "quantum_layer"
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
      quantum_security_config_type: [
        "authentication",
        "authorization",
        "encryption",
        "network",
        "compliance",
        "mobile_integration",
        "quantum_layer",
      ],
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
