# GlowChat - Implementation Plan

## Scope Summary
GlowChat is a worldwide social chatting application with a dark neon UI. It supports three user types: Regular Users, Operators/Hosts, and Admins. The app features real-time messaging, profile selection for operators, VIP memberships, a coin system, and earning tracking.

**Note:** As per session constraints, this implementation will be frontend-only. Data persistence, authentication, and real-time features will be simulated using client-side state (e.g., `localStorage`) and mock data services. No external databases (Supabase, Firebase) will be integrated.

## UI Style Guide
- **Theme:** Dark mode, Neon Gen Z aesthetic.
- **Colors:**
  - Background: `#0D0D0D` (Black)
  - Primary Accent: `#A855F7` (Neon Purple)
  - Secondary Accent: `#EC4899` (Pink Glow)
  - Surfaces: `#1F1F1F` (Gray Cards)
  - Text: `#FFFFFF`
- **Typography:** Inter/Montserrat (using available sans-serif fonts).
- **Animations:** Smooth transitions, glowing effects.

## Affected Areas
- **Frontend Components:** Layout, Nav, Chat, Profile, Dashboards.
- **State Management:** React state/Context for simulated auth, chat history, and balances.
- **Styling:** Tailwind CSS with custom neon utilities.

## Implementation Phases

### Phase 1: Foundation & Design System (frontend_engineer)
- Configure Tailwind with GlowChat's neon color palette.
- Set up global styles for dark mode and neon glows.
- Create shared UI components (Neon buttons, glowing cards, custom inputs).
- Establish basic routing structure (`react-router-dom`).

### Phase 2: User Authentication & Role Switching (frontend_engineer)
- Implement Splash Screen with animation.
- Build Login Screen (supports simulated login for User, Operator, Admin).
- Create a "Dev Mode" role switcher to test different views easily.
- Use `localStorage` to persist "logged in" state and role.

### Phase 3: Regular User Experience (frontend_engineer)
- **Dashboard:** Chat list, online status, tasks overview.
- **Chat Screen:** Message bubbles, emojis, simulated typing, attachments (private media placeholders).
- **VIP & Coins:** Screen for purchasing coins and viewing VIP benefits.
- **Task Center:** UI for daily tasks and claiming rewards.

### Phase 4: Operator & Admin Dashboards (frontend_engineer)
- **Operator Dashboard:** Model/Profile selection screen, earnings summary.
- **Admin Dashboard:** Operator management, model list, simple analytics cards, chat monitoring view.
- **Earnings View:** Weekly statistics charts (simulated).

### Phase 5: Simulated Real-time & Polish (quick_fix_engineer)
- Add "Auto-reply" simulation to make the chat feel alive.
- Polish animations (Framer Motion) for splash screen and transitions.
- Ensure responsive layout for mobile-first experience.
- Final CSS tweaks for the "Neon Glow" effect.

## Assumptions & Open Questions
- **Real-time Messaging:** Since no backend is allowed, real-time will be simulated by adding messages to local state.
- **Payments:** Payment gateways (Stripe/PayPal) will be UI-only "demo" implementations.
- **Media Unlocks:** Unlocking content will simply check against a local "coin balance".

## Sequencing Constraints
- Phase 1 must be completed before UI development starts.
- Phase 2 is required to navigate to specific role dashboards.
- Phases 3 and 4 can happen in parallel but are assigned sequentially for clarity.
