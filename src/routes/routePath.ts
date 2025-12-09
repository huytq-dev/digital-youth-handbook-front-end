export const ROUTE_PATH = {
    // Public Routes
    ROOT: "/",
    SERVER_ERROR: "/server-error",
    DISCONNECTED: "/disconnected",
    NOT_FOUND: "/not-found",
    UNAUTHORIZED: "/unauthorized",

    // Auth
    AUTH: {
      SIGN_IN: "/auth/sign-in",
      SIGN_UP: "/auth/sign-up",
      FORGOT_PASSWORD: "/auth/forgot-password",
      RESET_PASSWORD: "/auth/reset-password",
      VERIFY_EMAIL: "/auth/verify-email",
    },
  
    // Protected Routes
    HOME: "/home",
    ADMIN: "/admin",
  
    // Learning
    LEARNING: {
      INDEX: "/learning-topics",
      DETAIL: "/learning-topics/:slug",
      detail: (slug: string) => `/learning-topics/${slug}`, 
    },
  
    // Quiz
    QUIZ: {
      INDEX: "/quizzes",
      INTRO: "/quizzes/:id",
      GAME: "/quizzes/:id/game",
      RESULT: "/quizzes/:id/result",
      intro: (id: string) => `/quizzes/${id}`, 
      game: (id: string) => `/quizzes/${id}/game`,
      result: (id: string) => `/quizzes/${id}/result`,
    },
  
    // Profile
    PROFILE: "/profile",

    // Honor (Vinh danh)
    HONOR: "/honor",
  } as const;