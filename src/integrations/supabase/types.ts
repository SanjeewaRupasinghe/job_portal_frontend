export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          employer_remarks: string | null
          id: string
          job_post_id: string
          resume_id: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          employer_remarks?: string | null
          id?: string
          job_post_id: string
          resume_id?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          employer_remarks?: string | null
          id?: string
          job_post_id?: string
          resume_id?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          content: string
          created_at: string
          id: string
          published_at: string | null
          slug: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          job_post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          certification_at: string
          created_at: string
          expire_on: string | null
          id: string
          is_expiring: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          certification_at: string
          created_at?: string
          expire_on?: string | null
          id?: string
          is_expiring?: boolean | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          certification_at?: string
          created_at?: string
          expire_on?: string | null
          id?: string
          is_expiring?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chats: {
        Row: {
          application_id: string | null
          created_at: string
          deleted_at: string | null
          id: string
          message: string
          read_at: string | null
          receiver_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          message: string
          read_at?: string | null
          receiver_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          application_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          message?: string
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          city: string | null
          country_id: string | null
          created_at: string
          description: string | null
          email: string | null
          facebook: string | null
          founded_at: string | null
          founder: string | null
          id: string
          is_verified: boolean | null
          linkedin: string | null
          logo: string | null
          name: string
          phone: string | null
          size: string | null
          twitter: string | null
          updated_at: string
          user_id: string | null
          website: string | null
          why_chose_us: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country_id?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          facebook?: string | null
          founded_at?: string | null
          founder?: string | null
          id?: string
          is_verified?: boolean | null
          linkedin?: string | null
          logo?: string | null
          name: string
          phone?: string | null
          size?: string | null
          twitter?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
          why_chose_us?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country_id?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          facebook?: string | null
          founded_at?: string | null
          founder?: string | null
          id?: string
          is_verified?: boolean | null
          linkedin?: string | null
          logo?: string | null
          name?: string
          phone?: string | null
          size?: string | null
          twitter?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
          why_chose_us?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          country: string | null
          created_at: string
          description: string | null
          end_at: string | null
          field_of_study: string
          gpa: number | null
          graduated_at: string | null
          id: string
          institution: string
          is_currently_studying: boolean | null
          level_of_education: string
          start_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          description?: string | null
          end_at?: string | null
          field_of_study: string
          gpa?: number | null
          graduated_at?: string | null
          id?: string
          institution: string
          is_currently_studying?: boolean | null
          level_of_education: string
          start_at: string
          updated_at?: string
          user_id: string
        }
        Update: {
          country?: string | null
          created_at?: string
          description?: string | null
          end_at?: string | null
          field_of_study?: string
          gpa?: number | null
          graduated_at?: string | null
          id?: string
          institution?: string
          is_currently_studying?: boolean | null
          level_of_education?: string
          start_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          company: string
          created_at: string
          end_at: string | null
          id: string
          is_currently_working: boolean | null
          job_roles: string | null
          job_title: string
          start_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company: string
          created_at?: string
          end_at?: string | null
          id?: string
          is_currently_working?: boolean | null
          job_roles?: string | null
          job_title: string
          start_at: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string
          created_at?: string
          end_at?: string | null
          id?: string
          is_currently_working?: boolean | null
          job_roles?: string | null
          job_title?: string
          start_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          display_order: number | null
          id: string
          is_published: boolean | null
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_published?: boolean | null
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_published?: boolean | null
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      interviews: {
        Row: {
          address: string | null
          application_id: string
          created_at: string
          description: string | null
          id: string
          is_candidate_will_join: boolean | null
          link: string | null
          notes: string | null
          scheduled_at: string
          status: Database["public"]["Enums"]["interview_status"] | null
          type: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          application_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_candidate_will_join?: boolean | null
          link?: string | null
          notes?: string | null
          scheduled_at: string
          status?: Database["public"]["Enums"]["interview_status"] | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          application_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_candidate_will_join?: boolean | null
          link?: string | null
          notes?: string | null
          scheduled_at?: string
          status?: Database["public"]["Enums"]["interview_status"] | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      job_posts: {
        Row: {
          category_id: string | null
          company_id: string | null
          country_id: string | null
          created_at: string
          currency: string | null
          description: string
          employer_id: string
          end_date: string | null
          filled: number | null
          id: string
          location: string | null
          max_salary: number | null
          min_salary: number | null
          openings: number | null
          salary_type: Database["public"]["Enums"]["salary_type"] | null
          start_date: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          type: string | null
          updated_at: string
          work_setting: Database["public"]["Enums"]["work_setting"] | null
        }
        Insert: {
          category_id?: string | null
          company_id?: string | null
          country_id?: string | null
          created_at?: string
          currency?: string | null
          description: string
          employer_id: string
          end_date?: string | null
          filled?: number | null
          id?: string
          location?: string | null
          max_salary?: number | null
          min_salary?: number | null
          openings?: number | null
          salary_type?: Database["public"]["Enums"]["salary_type"] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          type?: string | null
          updated_at?: string
          work_setting?: Database["public"]["Enums"]["work_setting"] | null
        }
        Update: {
          category_id?: string | null
          company_id?: string | null
          country_id?: string | null
          created_at?: string
          currency?: string | null
          description?: string
          employer_id?: string
          end_date?: string | null
          filled?: number | null
          id?: string
          location?: string | null
          max_salary?: number | null
          min_salary?: number | null
          openings?: number | null
          salary_type?: Database["public"]["Enums"]["salary_type"] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          type?: string | null
          updated_at?: string
          work_setting?: Database["public"]["Enums"]["work_setting"] | null
        }
        Relationships: [
          {
            foreignKeyName: "job_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_posts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_posts_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      licenses: {
        Row: {
          created_at: string
          expire_on: string | null
          id: string
          is_expiring: boolean | null
          license_at: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expire_on?: string | null
          id?: string
          is_expiring?: boolean | null
          license_at: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expire_on?: string | null
          id?: string
          is_expiring?: boolean | null
          license_at?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      preferences: {
        Row: {
          category: string | null
          created_at: string
          desired_work_setting:
            | Database["public"]["Enums"]["work_setting"]
            | null
          email_notify_category: boolean | null
          email_notify_title: boolean | null
          id: string
          minimum_base_pay_amount: number | null
          minimum_base_pay_currency: string | null
          minimum_base_pay_pay_period:
            | Database["public"]["Enums"]["salary_type"]
            | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          desired_work_setting?:
            | Database["public"]["Enums"]["work_setting"]
            | null
          email_notify_category?: boolean | null
          email_notify_title?: boolean | null
          id?: string
          minimum_base_pay_amount?: number | null
          minimum_base_pay_currency?: string | null
          minimum_base_pay_pay_period?:
            | Database["public"]["Enums"]["salary_type"]
            | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          desired_work_setting?:
            | Database["public"]["Enums"]["work_setting"]
            | null
          email_notify_category?: boolean | null
          email_notify_title?: boolean | null
          id?: string
          minimum_base_pay_amount?: number | null
          minimum_base_pay_currency?: string | null
          minimum_base_pay_pay_period?:
            | Database["public"]["Enums"]["salary_type"]
            | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "preferences_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          about_me: string | null
          avatar: string | null
          contact: string | null
          cover_image: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          is_ready_to_work: boolean | null
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          about_me?: string | null
          avatar?: string | null
          contact?: string | null
          cover_image?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_ready_to_work?: boolean | null
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          about_me?: string | null
          avatar?: string | null
          contact?: string | null
          cover_image?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_ready_to_work?: boolean | null
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resumes: {
        Row: {
          created_at: string
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          parsed_content: string | null
          resume: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          parsed_content?: string | null
          resume: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          parsed_content?: string | null
          resume?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          description: string | null
          id: string
          level: Database["public"]["Enums"]["proficiency_level"] | null
          skill: string
          updated_at: string
          user_id: string
          years_of_experience: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          level?: Database["public"]["Enums"]["proficiency_level"] | null
          skill: string
          updated_at?: string
          user_id: string
          years_of_experience?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          level?: Database["public"]["Enums"]["proficiency_level"] | null
          skill?: string
          updated_at?: string
          user_id?: string
          years_of_experience?: number | null
        }
        Relationships: []
      }
      user_languages: {
        Row: {
          created_at: string
          id: string
          language: string
          proficiency: Database["public"]["Enums"]["proficiency_level"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          language: string
          proficiency?: Database["public"]["Enums"]["proficiency_level"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          language?: string
          proficiency?: Database["public"]["Enums"]["proficiency_level"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_unread_message_count: { Args: { user_uuid: string }; Returns: number }
      insert_sample_data: { Args: never; Returns: undefined }
    }
    Enums: {
      application_status:
        | "pending"
        | "reviewed"
        | "interviewed"
        | "rejected"
        | "accepted"
      interview_status: "scheduled" | "completed" | "cancelled" | "rescheduled"
      job_status: "draft" | "active" | "inactive" | "closed"
      proficiency_level: "beginner" | "intermediate" | "advanced" | "expert"
      salary_type: "hourly" | "monthly" | "yearly"
      user_role: "admin" | "employer" | "candidate"
      work_setting: "remote" | "onsite" | "hybrid"
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
      application_status: [
        "pending",
        "reviewed",
        "interviewed",
        "rejected",
        "accepted",
      ],
      interview_status: ["scheduled", "completed", "cancelled", "rescheduled"],
      job_status: ["draft", "active", "inactive", "closed"],
      proficiency_level: ["beginner", "intermediate", "advanced", "expert"],
      salary_type: ["hourly", "monthly", "yearly"],
      user_role: ["admin", "employer", "candidate"],
      work_setting: ["remote", "onsite", "hybrid"],
    },
  },
} as const
