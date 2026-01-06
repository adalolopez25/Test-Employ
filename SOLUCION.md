
#  Rick and Morty App – Technical Solution  

**Stack:** TypeScript + Next.js 15 + Tailwind CSS + Styled-Components  
**API:** Rick and Morty (https://rickandmortyapi.com)  
**Modalidad:** Individual  

---

##  Context & Solution

This project started as a partially working Next.js application consuming the Rick and Morty API.  
Our goal was to **analyze, fix, and refactor** it to make it functional, type-safe, and maintainable.

### Main Fixes and Improvements

1. **TypeScript Improvements**
   - All components are fully typed.
   - API responses are typed with interfaces:
     ```ts
     export type Character {
       id: number;
       name: string;
       status: string;
       species: string;
       type: string;
       gender: string;
       origin: { name: string; url: string };
       location: { name: string; url: string };
       image: string;
     }

     export type ApiResponse {
       results: Character[];
       info: {
         count: number;
         pages: number;
         next: string | null;
         prev: string | null;
       };
     }
     ```
   - Removed `any` types and enforced strict type-checking for all props and hooks.

2. **Dashboard**
   - Fetches characters correctly from the API.
   - Handles **loading** and **error states** properly.
   - Filter and search works with state and `useEffect`.
   - Responsive design using Tailwind CSS and styled components for cards.
   - Cards now include **dynamic star ratings** stored in localStorage.
   - Clicking a card navigates to a detailed character view.

3. **Character Cards**
   - Fully typed with props.
   - Hover effect shows scaling and dynamic star ratings.
   - Ratings persist via `localStorage`.
   - Large detailed view available when clicked.

4. **Login Page**
   - Validates fields.
   - Uses a test user (`admin@test.com` / `1234`) to access the dashboard.
   - Redirects logged-in users automatically.
   - Loading spinner appears only when submitting.

5. **About Page**
   - Displays project info clearly.
   - Styled with Tailwind CSS.
   - Fully responsive container.

6. **Styling**
   - Tailwind CSS fully integrated.
   - Cards styled with styled-components.
   - Smooth hover and transitions using `AOS` animations.

7. **Routing**
   - `/dashboard` for main dashboard.
   - `/characters/[id]` for character details.
   - `/login` for authentication.
   - `/about` for project info.

8. **Persistence**
   - Ratings saved in `localStorage`.
   - User session saved in `localStorage`.

---

##  Decisions & Notes

- Used `styled-components` for card-specific styling to combine with Tailwind.
- Ratings are interactive and visually update on hover.
- Created TypeScript interfaces for all API data to avoid runtime errors.
- Centralized API fetching in hooks instead of inline fetches in JSX.
- Navigation handled using `useRouter` from Next.js App Router.
- Added error boundaries and conditional rendering for robustness.
- Loading state for login and dashboard included for UX.

---

##  Remaining Improvements (if more time)

- Pagination for API results.
- Server-side fetching for SEO optimization.
- User authentication with backend (instead of localStorage).
- Modal to show **featured characters**.
- Full test coverage using Jest + React Testing Library.

---

##  Conclusion

The application is now fully functional, maintainable, and type-safe.  
All main requirements are implemented, plus optional improvements like detailed character pages, dynamic ratings, and responsive design.  

> This project demonstrates reading and refactoring existing code professionally, using TypeScript, React, Next.js, and best practices in state management, API consumption, and component design.
